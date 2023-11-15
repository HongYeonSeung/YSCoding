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

    //물품명
    @Column(nullable = false)
    private String productName;

    //시작가
    @Column(nullable = false)
    private double startingPrice;

    //이미지 파일이름 
    @Column(nullable = false)
    private String imagePath;

    //카테고리
    @Column(nullable = false)
    private String category;

    //등록자
    @Column(nullable = false)
    private String loginId;

    //물건 설명
    @Column(nullable = false)
    private String content;

    //물품올린시간
    @CreationTimestamp
    @Column
    private LocalDateTime registrationTime = LocalDateTime.now();

    @Column
    private LocalDateTime timeAfter24Hours;

}