package com.example.YSCoding.Service;

import com.example.YSCoding.Dto.ProductDTO;
import com.example.YSCoding.Entity.Product;
import com.example.YSCoding.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
        product.setRegistrationTime(productDTO.getRegistrationTime());
        product.setContent(productDTO.getContent());
        product.setImagePath(imageName);

        return productRepository.save(product);
    }

}