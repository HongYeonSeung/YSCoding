package com.example.YSCoding.Service;


import com.example.YSCoding.Entity.Signup;
import com.example.YSCoding.Repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public int getPoint() {
        if (loginResultId != null) {
            Optional<Integer> userPoint = loginRepository.findPointByName(loginResultId);

            // 만약 포인트를 찾을 수 있다면 해당 포인트를 반환, 찾을 수 없다면 기본값(여기서는 0) 반환
            return userPoint.orElse(-1);
        } else {
            // 로그인되지 않은 상태에서는 -1 또는 다른 값을 반환하거나 예외 처리를 수행할 수 있습니다.
            return -1;
        }
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