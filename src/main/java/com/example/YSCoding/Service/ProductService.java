package com.example.YSCoding.Service;

import com.example.YSCoding.Dto.ProductDTO;
import com.example.YSCoding.Entity.Product;

import java.util.List;

public interface ProductService {
    Product createProduct(ProductDTO productDTO);
    List<Product> getAllProducts();
}