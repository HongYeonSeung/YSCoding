package com.example.YSCoding.Entity;

import jakarta.persistence.*;
import org.springframework.lang.NonNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "person_table1")
@Getter
@Setter
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(unique = true, length = 10)
    private String password;

    @Column(unique = true)
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;
}
