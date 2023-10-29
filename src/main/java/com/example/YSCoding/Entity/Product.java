package com.example.YSCoding.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "seller_id")
    private String sellerId; // 판매자 아이디 또는 키를 저장하는 필드

    @Column(name = "buyer_id")
    private String buyerId; // 구매자 아이디 또는 키를 저장하는 필드

    @Lob  // BLOB 타입 필드를 나타냅니다.
    @Column(name = "image", columnDefinition = "BLOB")
    private byte[] image;  // 이미지를 바이트 배열로 저장하는 필드

//    @Column(name = "registration_time")
//    private LocalDateTime registrationTime; // 물품 등록 시간을 저장하는 필드

    @CreationTimestamp
    @Column
    private LocalDateTime registrationTime = LocalDateTime.now();

    @Column(name = "product_name")
    private String productName; // 물품명을 저장하는 필드

    @Column(name = "starting_price")
    private int startingPrice; // 시작 가격을 저장하는 필드

    @Column(name = "desired_bid_price")
    private int desiredBidPrice; // 희망 입찰 가격을 저장하는 필드

}