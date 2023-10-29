package com.example.YSCoding.Controller;

import com.example.YSCoding.Entity.Product;
import com.example.YSCoding.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api") // "/api"를 엔드포인트 경로의 일부로 사용
public class ProductController {

    private String receivedData; // 데이터를 저장할 변수

    private final ProductService productService; //회원가입 서비스

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/product-create")
    public ResponseEntity<String> submitData(@RequestBody Product data) {
        // 여기에서 ProductDTO 객체를 사용하여 데이터 처리를 수행하고 데이터베이스에 저장할 수 있습니다.
        // 예: userRepository.save(data);

        System.out.println("물품등록테스트");
        // 데이터 처리 예시 - 로그로 출력
        System.out.println("받은 데이터: " + data.getSellerId());
        System.out.println("받은 데이터: " + data.getBuyerId());
        System.out.println("받은 데이터: " + data.getImage());
        System.out.println("받은 데이터: " + data.getRegistrationTime());
        System.out.println("받은 데이터: " + data.getProductName());
        System.out.println("받은 데이터: " + data.getStartingPrice());
        System.out.println("받은 데이터: " + data.getDesiredBidPrice());

        productService.saveProduct(data); // 데이터베이스에 저장

        // 데이터 처리가 성공하면 성공 응답 반환
        return ResponseEntity.ok("데이터를 성공적으로 받았습니다.");
    }
}