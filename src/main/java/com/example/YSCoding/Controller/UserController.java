package com.example.YSCoding.Controller;

import com.example.YSCoding.Entity.Signup;
import com.example.YSCoding.Repository.SignupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private SignupRepository signupRepository; // SignupRepository를 주입

    @PostMapping("/api/check-password")
    public String checkPassword(@RequestBody Map<String, String> request) {
        String username = request.get("username"); // 로그인된 사용자의 ID를 가져옴
        String password = request.get("password"); // 사용자가 입력한 비밀번호를 가져옴

        System.out.println("로그인한 id" + username);
        System.out.println("사용자가 입력한 비밀번호" + password);

        Signup user = signupRepository.findByUsername(username); // 데이터베이스에서 사용자를 찾음

        if (user != null && user.getPassword().equals(password)) { // 사용자가 존재하고 비밀번호가 일치하면
            return "success";
        } else {
            return "error";
        }
    }

    @GetMapping("/api/user/{username}")
    public Signup getUser(@PathVariable String username) {
        return signupRepository.findByUsername(username); // 데이터베이스에서 사용자를 찾아 반환
    }
}