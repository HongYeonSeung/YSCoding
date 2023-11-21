package com.example.YSCoding.Controller;

import com.example.YSCoding.Dto.LoginDTO;
import com.example.YSCoding.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@RequestMapping("/api")
public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDTO> login(@RequestBody Map<String, String> requestData) {
        String memberName = requestData.get("memberName");
        String memberPassword = requestData.get("memberPassword");

        LoginDTO loginDTO = loginService.loginFind(memberName, memberPassword);
        return ResponseEntity.ok(loginDTO);
    }

    @PostMapping("/logout")
    public void logout() {
        loginService.getLogoutResultId();
    }
}