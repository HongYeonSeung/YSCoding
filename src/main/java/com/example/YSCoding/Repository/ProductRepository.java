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

    Page<Product> findAll(Pageable pageable);


    // 현재 시간 이후의 상품만 검색하는 메서드
    @Query("SELECT p FROM Product p WHERE p.timeAfter24Hours > :currentTime AND (LOWER(p.productName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.content) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Product> searchNotExpired(@Param("keyword") String keyword, @Param("currentTime") LocalDateTime currentTime, Pageable pageable);

    // 특정 카테고리의 상품 목록 조회 API (페이징 처리 추가, 시간 초과 x)
    Page<Product> findByCategoryIgnoreCaseAndTimeAfter24HoursGreaterThan(String category, LocalDateTime currentTime, Pageable pageable);

    // 현재 시간 이후의 상품만 가져오는 메서드
    Page<Product> findByTimeAfter24HoursGreaterThan(LocalDateTime currentTime, Pageable pageable);



    //마이페이지 입찰중인
    List<Product> findAllByBuyIdAndTimeAfter24HoursGreaterThan(String username, LocalDateTime currentTime);

    //마이페이지 입찰완료
    List<Product> findAllByBuyIdAndTimeAfter24HoursLessThanEqual(String username, LocalDateTime currentTime);


}