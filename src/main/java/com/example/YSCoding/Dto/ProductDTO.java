package com.example.YSCoding.Dto;

import lombok.*;

import java.sql.Blob;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor      //기본 생성자를 자동으로 만들어줌
@AllArgsConstructor     // 프라이빗으로 선언한 변수를을 매개변수로 하는 생성자를 각각 만들어줌
@ToString               //DTO 객체들을 출력할때 toString 메소드를 안써도 자동으로 써지게끔 하는 효과
public class ProductDTO {

    private String sellerId;       // 판매자 키
    private String buyerId;        // 구매자 키
    private byte[] image;        // 이미지 경로 또는 URL
    private LocalDateTime registrationTime; // 등록 시간
    private String productName;  // 물품명
    private int startingPrice;   // 시작 가격
    private int desiredBidPrice; // 희망 입찰 가격
}
