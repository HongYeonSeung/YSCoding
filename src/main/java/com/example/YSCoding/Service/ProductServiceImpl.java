package com.example.YSCoding.Service;


import com.example.YSCoding.Dto.ProductDTO;
import com.example.YSCoding.Entity.Bid;
import com.example.YSCoding.Entity.Product;
import com.example.YSCoding.Entity.Signup;
import com.example.YSCoding.Exception.InsufficientPointsException;
import com.example.YSCoding.Repository.ProductRepository;
import com.example.YSCoding.Repository.SignupRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private FileStorageService fileStorageService;
    @Autowired
    private SignupService signupService;

    @Autowired
    private SignupRepository signupRepository;  // SignupRepository 주입

    @Autowired
    private PointDeductionService pointDeductionService;


    @Override
    public Product createProduct(ProductDTO productDTO) {
        // 이미지 저장 로직
        String imageName = fileStorageService.saveImage(productDTO.getImage());

        // 엔티티 생성 및 저장
        Product product = new Product();
        product.setProductName(productDTO.getProductName());
        product.setCategory(productDTO.getCategory());
        product.setStartingPrice(productDTO.getStartingPrice());
        product.setCurrentPrice(productDTO.getStartingPrice());//시작입찰가와 현재입찰가는 시작이 동일하기 떄문에 값을 시작가로 받아옴 
        product.setRegistrationTime(productDTO.getRegistrationTime());
        product.setContent(productDTO.getContent());
        product.setImagePath(imageName);
        product.setBuyId(productDTO.getBuyId());
        product.setLoginId(productDTO.getLoginId());
        product.setPointsAwarded(productDTO.isPointsAwarded());

        // 24시간을 더한 값을 설정
        calculateTimeAfter24Hours(product);
        product.setBiddersCount(0);
        product.setViews(0);

        return productRepository.save(product);
    }

    @Override
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }


    @Override
    public Product getProductById(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);
//        Product product = productOptional.get();
//        product.setViews(product.getViews() + 1); // 조회수 1 증가
//        productRepository.save(product); // 업데이트된 상품 저장

        return productOptional.orElse(null); // 해당 ID에 해당하는 상품이 없을 경우 null 반환
    }

    @Override
    public Product getProductView(Long id){
        Optional<Product> productOptional = productRepository.findById(id);
        Product product = productOptional.get();
        product.setViews(product.getViews() + 1); // 조회수 1 증가
        productRepository.save(product); // 업데이트된 상품 저장
        return productOptional.orElse(null); // 해당 ID에 해당하는 상품이 없을 경우 null 반환
    }

    //판매중인 상품
    @Override
    public List<Product> getCurrentlySellingProducts(String username) {
        return productRepository.findAllByLoginId(username);
    }

    //입찰중인 상품 현재시간
    @Override
    public List<Product> getCurrentlyBiddingProducts(String username,LocalDateTime currentTime) {
        return productRepository.findAllByBuyIdAndTimeAfter24HoursGreaterThan(username,currentTime);
    }

    //입찰 완료 상품
    @Override
    public List<Product> getCurrentlyBiddingFinishProducts(String username,LocalDateTime currentTime) {
        return productRepository.findAllByBuyIdAndTimeAfter24HoursLessThanEqual(username,currentTime);
    }




    @Transactional
    private void calculateTimeAfter24Hours(Product product) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime calculatedTime = currentDateTime.plusHours(24);
        product.setTimeAfter24Hours(calculatedTime);
//        System.out.println("메소드 호출 현재 시간: " + currentDateTime);
    }


    //상품 삭제
    @Override
    public void deleteProduct(Long id){
        Product product = getProductById(id);

        //포인트 롤백
        //어워드는 포인트 정산이 끝났기때문에 따로 롤백하지 않음(참이면 = 포인트 지급안함)
        if(product.isPointsAwarded() == false && product.getBuyId() != null){
            //구매자 buyId에게 포인트 지급
            Signup signup = signupRepository.findByUsername(product.getBuyId());
            int currentPoints = signup.getPoint();
            int newPoints = currentPoints + (int)product.getCurrentPrice();
            signup.setPoint(newPoints);
            signupRepository.save(signup);

            productRepository.deleteById(id);
        }
        else {
            productRepository.deleteById(id);
        }
    }



    @Override
    public void placeBid(Long productId, Double bidAmount, String bidderId) {
        // 여기에 입찰과 관련된 비즈니스 로직을 구현
        Product product = getProductById(productId);

        // 예를 들어, 현재 입찰가를 업데이트하고 입찰자 아이디를 설정하는 등의 로직을 수행
        double previousBidAmount = product.getCurrentPrice(); // 현재 입찰가를 저장
        String previousBidderId = product.getBuyId(); // 현재 입찰자를 저장

        product.setCurrentPrice(bidAmount);
        product.setBuyId(bidderId);

        // 구매자의 포인트 확인
        boolean hasEnoughPoints = checkBuyerPoints(bidderId, bidAmount);
        if (hasEnoughPoints) {
            //구매자 포인트 차감
            pointDeductionService.deductPoints(bidderId, bidAmount);

            // 이전 입찰자 포인트 롤백
            Signup previousBidder = signupRepository.findByUsername(previousBidderId);
            if (previousBidder != null) {
                int previousBidAmountInt = (int) previousBidAmount; // double을 int로 변환
                previousBidder.setPoint(previousBidder.getPoint() + previousBidAmountInt);
                signupRepository.save(previousBidder);
            }

            // Bid 엔터티 생성
            Bid bid = new Bid();
            bid.setBidderId(bidderId);
            bid.setBidAmount(bidAmount);

            // 입찰자 추가
            product.addBid(bid);
            // 엔티티 저장
            productRepository.save(product);
        } else {
            throw new InsufficientPointsException("구매자의 포인트가 부족합니다.");
        }
    }

    // 구매자의 포인트를 확인하는 메서드
    private boolean checkBuyerPoints(String buyerId, Double bidAmount) {
        Signup buyer = signupRepository.findByUsername(buyerId);

        // 구매자의 포인트가 입찰 금액보다 크거나 같은지 확인
        return buyer != null && buyer.getPoint() >= bidAmount;
    }

    // 검색 결과(시간 지난 상품 제외)
    @Override
    public Page<Product> searchNotExpired(String keyword, LocalDateTime currentTime, Pageable pageable) {
        // 현재 시간 이후의 상품만 검색
        Page<Product> products = productRepository.searchNotExpired(keyword, currentTime, pageable);
        return products;
    }

    // 카테고리 기능 (시간 초과 x)
    @Override
    public Page<Product> getProductsByCategoryNotExpired(String category, LocalDateTime currentTime, Pageable pageable) {
        // 현재 시간 이전의 상품만 가져오도록 쿼리 조건 추가
        return productRepository.findByCategoryIgnoreCaseAndTimeAfter24HoursGreaterThan(category, currentTime, pageable);
    }

    // 남은 시간 초과 시 조회 x
    public Page<Product> getAllProductsNotExpired(LocalDateTime currentTime, Pageable pageable) {
        // 현재 시간 이전의 상품만 가져오도록 쿼리 조건 추가
        return productRepository.findByTimeAfter24HoursGreaterThan(currentTime, pageable);
    }

    @Scheduled(fixedDelay = 10000) // 10초단위로 실행
    @Override
    public void awardPointsIf24HoursPassed() {
//        System.out.println("매분 테스트");
        List<Product> products = productRepository.findAll();
        for (Product product : products) {
            if (!product.isPointsAwarded() && product.getRegistrationTime() != null) {
                LocalDateTime currentTime = LocalDateTime.now();
                LocalDateTime time24HoursAfterRegistration = product.getRegistrationTime().plusHours(24);
                if (currentTime.isAfter(time24HoursAfterRegistration)) {
                    awardPointsToBuyer(product);
//                    이때 알람도 보내도 될듯
                    product.setPointsAwarded(true);
                    productRepository.save(product);
                }
            }
        }
    }

    private void awardPointsToBuyer(Product product) {
        String seller = product.getLoginId();

        if (seller != null && product.getCurrentPrice() > 0) {
            Signup signup = signupRepository.findByUsername(seller);
//            System.out.println("10초 테스트 현재가"+(int) product.getCurrentPrice());
//            System.out.println("10초 테스트 판매자 보유포인트"+signup.getPoint());
//            System.out.println("총 포인트"+((int)product.getCurrentPrice()+signup.getPoint()));
            signup.setPoint((int)product.getCurrentPrice()+signup.getPoint());
            signupRepository.save(signup); // 변경된 엔터티를 저장
        }
    }

}