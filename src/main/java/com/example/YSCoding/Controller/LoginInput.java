package com.example.YSCoding.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api") // "/api"를 엔드포인트 경로의 일부로 사용
public class LoginInput {

    private String receivedData; // 데이터를 저장할 변수

    @PostMapping("/submitData") // "/api/submitData"로 매핑
    public ResponseEntity<String> submitData(@RequestBody String data) {
        // 컨트롤러의 로직을 작성
        receivedData = data; // 전달된 데이터를 변수에 저장
        System.out.println("받은 데이터: " + receivedData); // 데이터를 로그로 출력
        return ResponseEntity.ok("데이터가 성공적으로 저장되었습니다.");
    }
}
