package com.example.YSCoding.Repository;

import com.example.YSCoding.Dto.ProductDTO;
import com.example.YSCoding.Entity.Product;
import com.example.YSCoding.Entity.Signup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>  {

    List<Product> findAllByLoginId(String loginId);

    List<Product> findAllByBuyId(String loginId);


    // 문자가 한 개라도 같으면 검색
    Page<Product> findByProductNameIgnoreCaseContainingOrContentIgnoreCaseContaining(String keyword1, String keyword2, Pageable pageable);

//    Page<Product> findByProductNameEqualsOrContentEquals(String productName, String content, Pageable pageable);

    // 카테고리로 상품 목록 조회 (페이징 처리)
    Page<Product> findByCategoryIgnoreCase(String category, Pageable pageable);


    // 현재 시간 이후의 상품만 가져오는 메서드
    Page<Product> findByTimeAfter24HoursGreaterThan(LocalDateTime currentTime, Pageable pageable);
}