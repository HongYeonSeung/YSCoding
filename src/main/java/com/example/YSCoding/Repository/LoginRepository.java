package com.example.YSCoding.Repository;

import com.example.YSCoding.Entity.Signup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoginRepository extends JpaRepository<Signup, Long> {
    List<Signup> findAllByUsername(String username);
}
