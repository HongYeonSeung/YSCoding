package com.example.YSCoding.Service;


import com.example.YSCoding.Entity.Signup;
import com.example.YSCoding.Repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {
    private final LoginRepository loginRepository;
    private String loginResultId; // 필드를 private으로 변경

    @Autowired
    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public String getLoginResultId() {
        return loginResultId;
    }

    public void getLogoutResultId() {
        loginResultId = null;
    }

    public void setLoginResultId(String loginResultId) {
        this.loginResultId = loginResultId;
    }


    public String LoginFind(String username, String password) {
        List<Signup> usersWithSameUsername = loginRepository.findAllByUsername(username);

        for (Signup user : usersWithSameUsername) {
            if (user.getPassword().equals(password)) {
                setLoginResultId(user.getName());
                System.out.println(getLoginResultId());
                return user.getName(); // 로그인 성공시 아이디 리턴

            }
        }


        return "-1"; // 해당 아이디를 찾을 수 없거나 패스워드가 일치하지 않음
    }
}