package com.example.YSCoding.Controller;

import com.example.YSCoding.Dto.LoginDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api") // "/api"를 엔드포인트 경로의 일부로 사용
public class LoginController {

    private String receivedData; // 데이터를 저장할 변수

    @PostMapping("/login") // "/api/submitData"로 매핑
    public ResponseEntity<String> login(@RequestBody LoginDTO data) {
        // 컨트롤러의 로직을 작성
        System.out.println("받은 데이터: " + data); // 데이터를 로그로 출력

        return ResponseEntity.ok("데이터를 성공적으로 받았습니다.");
    }
}
