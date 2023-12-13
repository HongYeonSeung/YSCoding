package com.example.YSCoding.Service;

import com.example.YSCoding.Dto.ProductDTO;
import com.example.YSCoding.Entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface ProductService {
    Product createProduct(ProductDTO productDTO);
    Page<Product> getAllProducts(Pageable pageable);

    Product getProductById(Long id);

    Product getProductView(Long id);

    List<Product> getCurrentlySellingProducts(String username);

    List<Product> getCurrentlyBiddingProducts(String username ,LocalDateTime currentTime);

    List<Product> getCurrentlyBiddingFinishProducts(String username ,LocalDateTime currentTime);


    void placeBid(Long productId, Double bidAmount, String bidderId);

    // 시간이 지난 상품을 제외하고 검색하는 메서드
    Page<Product> searchNotExpired(String keyword, LocalDateTime currentTime, Pageable pageable);

    // 카테고리 기능
    Page<Product> getProductsByCategory(String category, Pageable pageable);

    // 상품 조회 시 시간 초과 x
    Page<Product> getAllProductsNotExpired(LocalDateTime currentTime, Pageable pageable);
}