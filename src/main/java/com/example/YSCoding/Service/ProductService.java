package com.example.YSCoding.Service;

import com.example.YSCoding.Dto.ProductDTO;
import com.example.YSCoding.Entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    Product createProduct(ProductDTO productDTO);
    Page<Product> getAllProducts(Pageable pageable);

    Product getProductById(Long id);

    void placeBid(Long productId, Double bidAmount, String bidderId);

    // 검색 기능
    Page<Product> search(String keyword, Pageable pageable);
}