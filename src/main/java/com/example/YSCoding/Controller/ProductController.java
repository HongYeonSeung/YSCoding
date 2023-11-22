package com.example.YSCoding.Controller;

import com.example.YSCoding.Dto.ProductDTO;
import com.example.YSCoding.Entity.Product;
import com.example.YSCoding.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api") // "/api"를 엔드포인트 경로의 일부로 사용
public class ProductController {
    @Autowired
    private ProductService productService;

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

    // 상품 목록 조회 API
    @GetMapping("/products")
    public ResponseEntity<Page<Product>> getAllProducts(@PageableDefault(size = 8, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            Page<Product> products = productService.getAllProducts(pageable);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    //상품 페이지
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
