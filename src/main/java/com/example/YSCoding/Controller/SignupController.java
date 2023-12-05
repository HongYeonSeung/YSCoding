package com.example.YSCoding.Controller;

import com.example.YSCoding.Dto.SignupDTO;
import com.example.YSCoding.Entity.Signup;
import com.example.YSCoding.Repository.SignupRepository;
import com.example.YSCoding.Service.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api") // "/api"를 엔드포인트 경로의 일부로 사용
public class SignupController {

    private final SignupService signupService; //회원가입 서비스

    @Autowired
    public SignupController(SignupService signupService) {
        this.signupService = signupService;
    }

    @PostMapping("/signupData")
    public ResponseEntity<String> submitData(@RequestBody Signup data) {
        try {
            String resultMessage = signupService.saveSignup(data);
            return ResponseEntity.ok(resultMessage);
        } catch (Exception e) {
            // 예외가 발생한 경우 에러 응답 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
}