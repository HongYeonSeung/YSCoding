package com.example.YSCoding.Service;

import com.example.YSCoding.Dto.ProductDTO;
import com.example.YSCoding.Entity.Product;

public interface ProductService {
    Product createProduct(ProductDTO productDTO);
}