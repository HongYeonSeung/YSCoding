package com.example.YSCoding.Service;


import com.example.YSCoding.Dto.ProductDTO;
import com.example.YSCoding.Entity.Product;
import com.example.YSCoding.Entity.Signup;
import com.example.YSCoding.Exception.InsufficientPointsException;
import com.example.YSCoding.Repository.ProductRepository;
import com.example.YSCoding.Repository.SignupRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
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

        // 24시간을 더한 값을 설정
        calculateTimeAfter24Hours(product);

        return productRepository.save(product);
    }

    @Override
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }


    @Override
    public Product getProductById(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);
        return productOptional.orElse(null); // 해당 ID에 해당하는 상품이 없을 경우 null 반환
    }

    @Transactional
    private void calculateTimeAfter24Hours(Product product) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime calculatedTime = currentDateTime.plusHours(24);
        product.setTimeAfter24Hours(calculatedTime);
        System.out.println("메소드 호출 현재 시간: " + currentDateTime);
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

    // 문자가 한 개라도 같으면 검색
//    @Override
//    public Page<Product> search(String keyword, Pageable pageable) {
//        return productRepository.findByProductNameIgnoreCaseContainingOrContentIgnoreCaseContaining(keyword, keyword, pageable);
//    }

    // 검색 기능
    @Override
    public Page<Product> search(String keyword, Pageable pageable) {
        return productRepository.findByProductNameEqualsOrContentEquals(keyword, keyword, pageable);
    }

}