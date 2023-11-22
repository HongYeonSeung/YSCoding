package com.example.YSCoding.Service;

import com.example.YSCoding.Entity.Signup;
import com.example.YSCoding.Exception.InsufficientPointsException;
import com.example.YSCoding.Repository.SignupRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// 포인트 차감 서비스 클래스 생성
@Service
public class PointDeductionService {
    @Autowired
    private SignupRepository signupRepository;

    @Transactional
    public void deductPoints(String username, double amount) {
        Signup user = signupRepository.findByUsername(username);

        if (user != null) {
            user.deductPoints(amount);
            signupRepository.save(user);
        } else {
            throw new InsufficientPointsException("사용자를 찾을 수 없습니다/이거 뜨면 안됨 로그인 허점 나온거임.");
        }
    }
}
