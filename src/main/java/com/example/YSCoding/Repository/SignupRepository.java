package com.example.YSCoding.Repository;

import com.example.YSCoding.Entity.Signup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SignupRepository extends JpaRepository<Signup, Long> {
}