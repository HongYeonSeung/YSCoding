package com.example.YSCoding.Controller;

import com.example.YSCoding.Dto.SignupDTO;
import com.example.YSCoding.Entity.Signup;
import com.example.YSCoding.Service.LoginService;
import com.example.YSCoding.Service.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api") // "/api"를 엔드포인트 경로의 일부로 사용
public class LoginController {

    private final LoginService loginService;


    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login") // "/api/submitData"로 매핑
    public ResponseEntity<SignupDTO> login(@RequestBody Map<String, String> requestData) {
        String memberName = requestData.get("memberName"); // 이름 추출
        String memberPassword = requestData.get("memberPassword");

        System.out.println("받은 이름 데이터: " + memberName); // 이름을 로그로 출력
        System.out.println("받은 패스워드 데이터: " + memberPassword); // 이름을 로그로 출력

        // 로그인 서비스에서 SignupDTO로 정보 받아오기
        SignupDTO resultDTO = loginService.LoginFind(memberName, memberPassword);
        System.out.println("로그인 결과: " + resultDTO);

//        loginBox(result);
        return ResponseEntity.ok(resultDTO);
    }

    @PostMapping("/logout") // "/api/submitData"로 매핑
    public void logout(){
        loginService.getLogoutResultId();
    }

    @PostMapping("/point")
    public ResponseEntity<Integer> point() {
        int userPoint = loginService.getPoint();
        return ResponseEntity.ok(userPoint);
    }



}
