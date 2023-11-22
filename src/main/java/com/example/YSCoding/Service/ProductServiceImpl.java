package com.example.YSCoding.Service;


import com.example.YSCoding.Dto.ProductDTO;
import com.example.YSCoding.Entity.Product;
import com.example.YSCoding.Repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private FileStorageService fileStorageService;


    @Override
    public Product createProduct(ProductDTO productDTO) {
        // 이미지 저장 로직
        String imageName = fileStorageService.saveImage(productDTO.getImage());

        // 엔티티 생성 및 저장
        Product product = new Product();
        product.setProductName(productDTO.getProductName());
        product.setCategory(productDTO.getCategory());
        product.setStartingPrice(productDTO.getStartingPrice());
        product.setCurrentPrice(productDTO.getStartingPrice());//시작입찰가와 현재입찰가는 시작이 동일하기 떄문에 값을 시작가로 받아옴 
        product.setRegistrationTime(productDTO.getRegistrationTime());
        product.setContent(productDTO.getContent());
        product.setImagePath(imageName);
        product.setBuyId(productDTO.getBuyId());
        product.setLoginId(productDTO.getLoginId());

        // 24시간을 더한 값을 설정
        calculateTimeAfter24Hours(product);



        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }


    @Override
    public Product getProductById(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);
        return productOptional.orElse(null); // 해당 ID에 해당하는 상품이 없을 경우 null 반환
    }

    @Transactional
    private void calculateTimeAfter24Hours(Product product) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime calculatedTime = currentDateTime.plusHours(24);
        product.setTimeAfter24Hours(calculatedTime);
        System.out.println("메소드 호출 현재 시간: " + currentDateTime);
    }


}