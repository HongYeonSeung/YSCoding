package com.example.YSCoding.Repository;

import com.example.YSCoding.Dto.ProductDTO;
import com.example.YSCoding.Entity.Product;
import com.example.YSCoding.Entity.Signup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>  {

    Product findAllByLoginId(String username);
}