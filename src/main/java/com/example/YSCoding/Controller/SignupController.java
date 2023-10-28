package com.example.YSCoding.Controller;

import com.example.YSCoding.Dto.SignupDTO;
import com.example.YSCoding.Entity.Signup;
import com.example.YSCoding.Repository.SignupRepository;
import com.example.YSCoding.Service.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api") // "/api"를 엔드포인트 경로의 일부로 사용
public class SignupController {

    private String receivedData; // 데이터를 저장할 변수

    private final SignupService signupService; //회원가입 서비스

    @Autowired
    public SignupController(SignupService signupService) {
        this.signupService = signupService;
    }

    @PostMapping("/signupData")
    public ResponseEntity<String> submitData(@RequestBody Signup data) {
        // 여기에서 SignupData 객체를 사용하여 데이터 처리를 수행하고 데이터베이스에 저장할 수 있습니다.
        // 예: userRepository.save(data);

        // 데이터 처리 예시 - 로그로 출력
        System.out.println("받은 데이터: " + data);

        signupService.saveSignup(data); // 데이터베이스에 저장

        // 데이터 처리가 성공하면 성공 응답 반환
        return ResponseEntity.ok("데이터를 성공적으로 받았습니다.");
    }
}
