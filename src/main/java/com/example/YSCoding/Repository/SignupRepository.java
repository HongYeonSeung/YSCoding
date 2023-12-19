package com.example.YSCoding.Repository;

import com.example.YSCoding.Entity.Signup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SignupRepository extends JpaRepository<Signup, Long> {

    Signup findByUsername(String username);
    Signup findByEmail(String email);




    // 중복된 사용자명이 있는지 확인하는 쿼리
    @Query("SELECT COUNT(u) FROM Signup u WHERE u.username = :username")
    int countByUsername(@Param("username") String username);

    // 중복된 이메일이 있는지 확인하는 쿼리
    @Query("SELECT COUNT(u) FROM Signup u WHERE u.email = :email")
    int countByEmail(@Param("email") String email);
}
