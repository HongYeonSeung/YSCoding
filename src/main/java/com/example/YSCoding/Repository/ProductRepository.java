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

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>  {

    List<Product> findAllByLoginId(String loginId);

    List<Product> findAllByBuyId(String loginId);


    // 문자가 한 개라도 같으면 검색
    Page<Product> findByProductNameIgnoreCaseContainingOrContentIgnoreCaseContaining(String keyword1, String keyword2, Pageable pageable);

//    Page<Product> findByProductNameEqualsOrContentEquals(String productName, String content, Pageable pageable);


}