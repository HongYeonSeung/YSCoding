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

    public void saveSignup(Signup signup) {
        signupRepository.save(signup);
    }
}
