package com.example.YSCoding.Service;

import com.example.YSCoding.Dto.ProductDTO;
import com.example.YSCoding.Entity.Product;
import com.example.YSCoding.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface ProductService {
    // JpaRepository 또는 유사한 인터페이스의 인스턴스를 가지고 있다고 가정
    Product createProduct(ProductDTO productDTO);
    // 어드민 전체 상품 조회
    Page<Product> getAllProducts(Pageable pageable);

    Product adminProductComplete(Long id,boolean bool);

    void awardPointsIf24HoursPassed();
    Product getProductById(Long id);

    Product getProductView(Long id);

    List<Product> getCurrentlySellingProducts(String username);

    List<Product> getCurrentlyBiddingProducts(String username ,LocalDateTime currentTime);

    List<Product> getCurrentlyBiddingFinishProducts(String username ,LocalDateTime currentTime);


    void placeBid(Long productId, Double bidAmount, String bidderId);

    void deleteProduct(Long id);

    // 시간이 지난 상품을 제외하고 검색하는 메서드
    Page<Product> searchNotExpired(String keyword, LocalDateTime currentTime, Pageable pageable);

    // 특정 카테고리의 상품 목록 조회 API (페이징 처리 추가)
    Page<Product> getProductsByCategoryNotExpired(String category, LocalDateTime currentTime, Pageable pageable);

    // 상품 조회 시 시간 초과 x
    Page<Product> getAllProductsNotExpired(LocalDateTime currentTime, Pageable pageable);



}