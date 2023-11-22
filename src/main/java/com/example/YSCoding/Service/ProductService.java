package com.example.YSCoding.Service;

import com.example.YSCoding.Dto.ProductDTO;
import com.example.YSCoding.Entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    Product createProduct(ProductDTO productDTO);
    Page<Product> getAllProducts(Pageable pageable);

    Product getProductById(Long id);

    void placeBid(Long productId, Double bidAmount, String bidderId);


}