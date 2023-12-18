package com.example.YSCoding.Entity;


import com.example.YSCoding.Exception.InsufficientPointsException;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Signup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "birthdate")
    private String birthdate;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "point")
    private int point=1000;

    @Column(name = "homeaddress")
    private String homeAddress;

    @Column(name = "detailhomeaddress")
    private String detailHomeAddress;

    @Column(name = "adminCheck")
    private boolean adminCheck=false;


    public void deductPoints(double amount) {
        if (this.point >= amount) {
            this.point -= amount;
        } else {
            throw new InsufficientPointsException("포인트가 부족합니다.");
        }
    }
}
