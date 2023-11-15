package com.example.YSCoding.Dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor      //기본 생성자를 자동으로 만들어줌
@AllArgsConstructor     // 프라이빗으로 선언한 변수를을 매개변수로 하는 생성자를 각각 만들어줌
@ToString               //DTO 객체들을 출력할때 toString 메소드를 안써도 자동으로 써지게끔 하는 효과
public class ProductDTO {
    private String productName;
    private double startingPrice;
    private MultipartFile image;

    // 생성자, getter, setter 등 필요한 메서드 추가
}