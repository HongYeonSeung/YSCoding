package com.example.YSCoding.Controller;

<<<<<<< HEAD
=======
import com.example.YSCoding.Dto.SignupDTO;
>>>>>>> c4c0d55 (내정보 업데이트까지 완료. 비밀번호 변경 만들기 전)
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

<<<<<<< HEAD
    @GetMapping("/api/user/{username}")
    public Signup getUser(@PathVariable String username) {
        return signupRepository.findByUsername(username); // 데이터베이스에서 사용자를 찾아 반환
    }
=======
    @PostMapping("/api/get-user-info")
    public SignupDTO getUserInfo(@RequestBody Map<String, String> request) {
        String username = request.get("username"); // 로그인된 사용자의 ID를 가져옴

        Signup user = signupRepository.findByUsername(username); // 데이터베이스에서 사용자를 찾음

        if (user != null) { // 사용자가 존재하면
            SignupDTO userDto = new SignupDTO();
            userDto.setUsername(user.getUsername());
            userDto.setEmail(user.getEmail());
            userDto.setName(user.getName());
            userDto.setBirthdate(user.getBirthdate());
            userDto.setPhoneNumber(user.getPhoneNumber());
            userDto.setPoint(user.getPoint());

            return userDto; // 사용자 정보 DTO 반환
        } else {
            return null; // 해당 아이디를 찾을 수 없음
        }
    }

    @PostMapping("/api/update-user-info")
    public SignupDTO updateUserInfo(@RequestBody SignupDTO requestDto) {
        String username = requestDto.getUsername(); // 로그인된 사용자의 ID를 가져옴

        Signup user = signupRepository.findByUsername(username); // 데이터베이스에서 사용자를 찾음

        if (user != null) { // 사용자가 존재하면
            user.setEmail(requestDto.getEmail());
            user.setName(requestDto.getName());
            user.setBirthdate(requestDto.getBirthdate());
            user.setPhoneNumber(requestDto.getPhoneNumber());

            signupRepository.save(user); // 변경된 사용자 정보를 데이터베이스에 저장

            return requestDto; // 업데이트된 사용자 정보 DTO 반환
        } else {
            return null; // 해당 아이디를 찾을 수 없음
        }
    }



//    @GetMapping("/api/user/{username}")
//    public Signup getUser(@PathVariable String username) {
//        return signupRepository.findByUsername(username); // 데이터베이스에서 사용자를 찾아 반환
//    }
>>>>>>> c4c0d55 (내정보 업데이트까지 완료. 비밀번호 변경 만들기 전)
}