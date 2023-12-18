package com.example.YSCoding.Controller;

import com.example.YSCoding.Dto.SignupDTO;
import com.example.YSCoding.Entity.Signup;
import com.example.YSCoding.Repository.SignupRepository;
import com.example.YSCoding.Service.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api") // "/api"를 엔드포인트 경로의 일부로 사용
public class SignupController {

    private final SignupService signupService; //회원가입 서비스
    @Autowired
    private SignupRepository signupRepository; // SignupRepository를 주입


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

    @GetMapping("/adminCheck/{loginId}")
    public boolean adminCheck(@PathVariable String loginId) {
        Signup user = signupRepository.findByUsername(loginId);

        if (user != null) {
            // 사용자가 어드민인지 여부를 반환
            return user.isAdminCheck();
        } else {
            // 사용자가 존재하지 않는 경우 예외 처리 또는 기본값 반환 등을 수행
            throw new RuntimeException("User not found with username: " + loginId);
        }
    }


}