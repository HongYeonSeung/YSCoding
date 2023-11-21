package com.example.YSCoding.Service;


import com.example.YSCoding.Dto.LoginDTO;
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

    public LoginDTO loginFind(String username, String password) {
        List<Signup> usersWithSameUsername = loginRepository.findAllByUsername(username);

        for (Signup user : usersWithSameUsername) {
            if (user.getPassword().equals(password)) {
                LoginDTO loginDTO = new LoginDTO();
                loginDTO.setMemberName(user.getName());
                loginDTO.setPoint(Integer.parseInt(user.getPoint()));
                setLoginResultId(user.getName());
                return loginDTO;
            }
        }

        return null;
    }
}