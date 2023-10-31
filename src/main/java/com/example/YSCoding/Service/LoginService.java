package com.example.YSCoding.Service;


import com.example.YSCoding.Entity.Signup;
import com.example.YSCoding.Repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {
    private final LoginRepository loginRepository;

    @Autowired
    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public String LoginFind(String username, String password) {
        List<Signup> usersWithSameUsername = loginRepository.findAllByUsername(username);

        if (usersWithSameUsername.isEmpty()) {
            return "아이디가 존재하지 않습니다."; // 해당 아이디를 찾을 수 없음
        } else {
            for (Signup user : usersWithSameUsername) {
                if (user.getPassword().equals(password)) {
                    return "로그인 성공"; // 패스워드가 일치함
                }
            }
            return "패스워드가 일치하지 않습니다."; // 패스워드가 일치하지 않음

        }
    }
}