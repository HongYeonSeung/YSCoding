package com.example.YSCoding.Service;

import com.example.YSCoding.Dto.ProductDTO;
import com.example.YSCoding.Entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    Product createProduct(ProductDTO productDTO);
//    List<Product> getAllProducts();

    Page<Product> getAllProducts(Pageable pageable);

    Product getProductById(Long id);

}