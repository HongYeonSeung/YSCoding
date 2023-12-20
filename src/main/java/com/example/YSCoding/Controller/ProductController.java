package com.example.YSCoding.Controller;

import com.example.YSCoding.Dto.ProductDTO;
import com.example.YSCoding.Entity.Bid;
import com.example.YSCoding.Entity.Product;
import com.example.YSCoding.Exception.InsufficientPointsException;
import com.example.YSCoding.Service.BidService;
import com.example.YSCoding.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api") // "/api"를 엔드포인트 경로의 일부로 사용
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private BidService bidService;

    @PostMapping("/product-create")
    public ResponseEntity<?> createProduct(@ModelAttribute ProductDTO productDTO) {
        try {
            Product createdProduct = productService.createProduct(productDTO);
            return ResponseEntity.ok(createdProduct);
        } catch (Exception e) {
            // 예외 처리
            e.printStackTrace(); // 또는 로그에 기록
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("상품 생성에 실패했습니다.");
        }
    }

    // 상품 목록 조회 시 시간 초과 x API
    @GetMapping("/products")
    public ResponseEntity<Page<Product>> getAllProducts(@PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            // 현재 시간을 가져오기
            LocalDateTime currentTime = LocalDateTime.now();
            Page<Product> products = productService.getAllProductsNotExpired(currentTime, pageable);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 어드민 전체 상품 조회
    @GetMapping("/productsAdmin")
    public ResponseEntity<Page<Product>> getAllProductAll(@PageableDefault(size = 5, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            Page<Product> products = productService.getAllProducts(pageable);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    //상품 상세 페이지
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //조회수 늘리기
    @GetMapping("/productsView/{id}")
    public ResponseEntity<Product> getProductView(@PathVariable Long id) {
        Product product = productService.getProductView(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 상품 구매 API
    @PostMapping("/ProductBuy/{id}")
    public ResponseEntity<String> buyProduct(@PathVariable Long id, @RequestBody Map<String, String> bidData) {
        try {
            String bidAmount = bidData.get("bidAmount");
            String loginId = bidData.get("loginId");
            double bidAmountValue = Double.valueOf(bidAmount);

            // 해당 상품의 정보 조회
            Product product = productService.getProductById(id);

            // 판매자와 입찰자의 아이디가 동일한 경우
            if (product.getLoginId().equals(loginId)) {
                return ResponseEntity.badRequest().body("자신이 등록한 상품에는 입찰할 수 없습니다.");
            }

            // 현재 입찰가보다 입찰금액이 적을 경우
            if (bidAmountValue <= product.getCurrentPrice()) {
                return ResponseEntity.badRequest().body("현재 입찰가보다 입찰할려는 금액이 작습니다");
            }

            // 상품 정보를 활용하여 필요한 처리 수행
//            System.out.println("상품 ID: " + product.getId());
//            System.out.println("상품 판매자 ID: " + product.getLoginId());
//            System.out.println("입찰 가격: " + bidAmount);
//            System.out.println("입찰자 ID: " + loginId);

            productService.placeBid(id, bidAmountValue, loginId);

            return ResponseEntity.ok("상품 구매가 성공적으로 완료되었습니다.");
        } catch (InsufficientPointsException e) {
            // 구매자의 포인트가 부족한 경우
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("상품 구매에 실패했습니다.");
        }
    }


    //상품 삭제
    @PostMapping("/ProductDelete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        try {
            // 해당 상품의 정보 조회
            productService.deleteProduct(id);

            // 성공적으로 삭제되었을 때의 응답
            return ResponseEntity.ok("Product deleted successfully");
        } catch (Exception e) {
            // 삭제 중에 예외가 발생했을 때의 응답
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting product");
        }
    }

    // 검색기능(시간 지난 상품 제외)
    @GetMapping("/search-not-expired")
    public ResponseEntity<Page<Product>> searchNotExpired(@RequestParam String keyword,
                                                          @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        LocalDateTime currentTime = LocalDateTime.now();
        Page<Product> products = productService.searchNotExpired(keyword, currentTime, pageable);

        return ResponseEntity.ok(products);
    }

    //마이페이지 상품조회쪽
    //본인이 판매중인 상품
    @GetMapping("/currentlySellingProducts/{username}")
    public ResponseEntity<List<Product>> getCurrentlySellingProducts(@PathVariable String username) {
        List<Product> products = productService.getCurrentlySellingProducts(username);
        if (!products.isEmpty()) {
            return ResponseEntity.ok(products);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/currentlyBiddingProducts/{username}")
    public ResponseEntity<List<Product>> getCurrentlyBiddingProducts(@PathVariable String username) {
        LocalDateTime currentTime = LocalDateTime.now();
        List<Product> products = productService.getCurrentlyBiddingProducts(username, currentTime);
        if (!products.isEmpty()) {
            return ResponseEntity.ok(products);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/currentlyBiddingFinishProducts/{username}")
    public ResponseEntity<List<Product>> getCurrentlyBiddingFinishProducts(@PathVariable String username) {
        LocalDateTime currentTime = LocalDateTime.now();
        List<Product> products = productService.getCurrentlyBiddingFinishProducts(username, currentTime);
        if (!products.isEmpty()) {
            return ResponseEntity.ok(products);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    //유찰
    @GetMapping("/unsuccessfulBidsProducts/{username}")
    public ResponseEntity<List<Product>> getUnsuccessfulBidsProducts(@PathVariable String username) {
        List<Bid> bids = bidService.getUnsuccessfulBidsProducts(username);

        List<Product> unsuccessfulProducts = bids.stream()
                .map(Bid::getProduct)
                .filter(product -> !username.equals(product.getBuyId()))
                .distinct() // 중복 제거
                .collect(Collectors.toList());

//        System.out.println("테스트 - Unsuccessful Products: " + unsuccessfulProducts);

        return ResponseEntity.ok(unsuccessfulProducts);
    }


    // 특정 카테고리의 상품 목록 조회 API (시간이 지난 상품 제외)
    @GetMapping("/category/{category}")
    public ResponseEntity<Page<Product>> getProductsByCategory(
            @PathVariable String category,
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            LocalDateTime currentTime = LocalDateTime.now();
            Page<Product> products = productService.getProductsByCategoryNotExpired(category, currentTime, pageable);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}