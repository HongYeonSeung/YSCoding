package com.example.YSCoding.Service;
import com.example.YSCoding.Entity.Signup;
import com.example.YSCoding.Repository.SignupRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignupService {
    private final SignupRepository signupRepository;

    @Autowired
    public SignupService(SignupRepository signupRepository) {
        this.signupRepository = signupRepository;
    }
    public String saveSignup(Signup signup) {
        if (!isUsernameAvailable(signup.getUsername())) {
            System.out.println("이미 존재하는 사용자명입니다 에러");

            return "이미 존재하는 사용자명입니다.";
        } else if (!isEmailAvailable(signup.getEmail())) {
            System.out.println("이미 존재하는 이메일입니다 에러");

            return "이미 존재하는 이메일입니다.";
        } else {
            signupRepository.save(signup);
            return "회원가입이 성공적으로 완료되었습니다.";
        }
    }

//    public Signup adminLoginDateAll(){
//
//    }

    private boolean isUsernameAvailable(String username) {
        return signupRepository.findByUsername(username) == null;
    }

    private boolean isEmailAvailable(String email) {
        return signupRepository.findByEmail(email) == null;
    }
}
