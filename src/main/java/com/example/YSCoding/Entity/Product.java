package com.example.YSCoding.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Formula;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

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

    //현재가격
    @Column(nullable = false)
    private double currentPrice;

    //이미지 파일이름 
    @Column(nullable = false)
    private String imagePath;

    //카테고리
    @Column(nullable = false)
    private String category;

    //등록자
    @Column(nullable = false)
    private String loginId;

    //구매자
    @Column
    private String buyId;
    
    //물건 설명
    @Column(nullable = false)
    private String content;

    //물품올린시간
    @CreationTimestamp
    @Column
    private LocalDateTime registrationTime = LocalDateTime.now();

    //물품 올리고 24시간후의 시간
    @Column
    private LocalDateTime timeAfter24Hours;

    //조회수
    @Column
    private int views;

    //입찰했던 사람의 수
    @Column
    private int biddersCount;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Bid> bids = new HashSet<>();


    public void addBid(Bid bid) {
        bids.add(bid);
        bid.setProduct(this);
        updateCurrentPrice(bid.getBidAmount());
        incrementBiddersCount();
        // 기타 입찰 관련 속성을 여기에서 업데이트할 수 있습니다.
    }

    private void updateCurrentPrice(double bidAmount) {
        this.currentPrice = bidAmount;
    }

    private void incrementBiddersCount() {
        this.biddersCount++;
    }
}