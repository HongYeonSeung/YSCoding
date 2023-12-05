package com.example.YSCoding.Repository;

import com.example.YSCoding.Entity.Signup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LoginRepository extends JpaRepository<Signup, Long> {
    List<Signup> findAllByUsername(String username);

    // 예시: 사용자 아이디로 포인트를 찾는 메서드
    @Query("SELECT u.point FROM Signup u WHERE u.username = :username")
    Optional<Integer> findPointByUsername(@Param("username") String username);
}
