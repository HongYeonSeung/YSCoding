package com.example.YSCoding.Controller;

import com.example.YSCoding.Utility.JwtUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api") // "/api"를 엔드포인트 경로의 일부로 사용

public class JwtController {

    @GetMapping("/generateToken/{username}")
    public String generateToken(@PathVariable String username) {
        System.out.println(username);
        System.out.println(JwtUtil.generateToken(username));
        return JwtUtil.generateToken(username);
    }


    @GetMapping("/getUsernameFromToken/{token}")
    public String getUsernameFromToken(@PathVariable String token) {
        System.out.println(token);
        return JwtUtil.getUsernameFromToken(token);
    }

    @GetMapping("/validateToken/{token}")
    public String validateToken(@PathVariable String token) {
        System.out.println(token);
        return JwtUtil.validateToken(token) ? "Valid Token" : "Invalid Token";
    }
}
