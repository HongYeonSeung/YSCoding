package com.example.YSCoding.Controller;

import com.example.YSCoding.Dto.ProductDTO;
import com.example.YSCoding.Dto.SignupDTO;
import com.example.YSCoding.Entity.Product;
import com.example.YSCoding.Entity.Signup;
import com.example.YSCoding.Repository.ProductRepository;
import com.example.YSCoding.Repository.SignupRepository;
import jakarta.persistence.Column;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private SignupRepository signupRepository; // SignupRepository를 주입
    
    @Autowired
    private ProductRepository productRepository; // ProductRepository를 주입

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
            userDto.setHomeAddress(user.getHomeAddress());
            userDto.setDetailHomeAddress(user.getDetailHomeAddress());
            return userDto; // 사용자 정보 DTO 반환
        } else {
            return null; // 해당 아이디를 찾을 수 없음
        }
    }

    // 회원정보 수정
    @PostMapping("/api/update-user-info")
    public ResponseEntity<?> updateUserInfo(@RequestBody SignupDTO requestDto) {
        String username = requestDto.getUsername(); // 로그인된 사용자의 ID를 가져옴

        Signup user = signupRepository.findByUsername(username); // 데이터베이스에서 사용자를 찾음

        if (user != null) { // 사용자가 존재하면
            user.setEmail(requestDto.getEmail());
            user.setName(requestDto.getName());
            user.setBirthdate(requestDto.getBirthdate());
            user.setPhoneNumber(requestDto.getPhoneNumber());
            user.setHomeAddress(requestDto.getHomeAddress());
            user.setDetailHomeAddress(requestDto.getDetailHomeAddress());
            if (requestDto.getPassword() != null && !requestDto.getPassword().isEmpty()) {
                user.setPassword(requestDto.getPassword()); // 새로운 비밀번호가 제공되면 업데이트
            }

            signupRepository.save(user); // 변경된 사용자 정보를 데이터베이스에 저장

            return ResponseEntity.ok().body("사용자 정보가 성공적으로 업데이트되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("해당 아이디를 찾을 수 없습니다.");
        }
    }

    // 회원탈퇴
    @PostMapping("/api/delete-user")
    public ResponseEntity<?> deleteUser(@RequestBody Map<String, String> request) {
        String username = request.get("username"); // 로그인된 사용자의 ID를 가져옴

        Signup user = signupRepository.findByUsername(username); // 데이터베이스에서 사용자를 찾음

        if (user != null) { // 사용자가 존재하면
            List<Product> userProducts = productRepository.findAllByLoginId(username); // 사용자의 모든 상품을 찾음
            // 각 상품을 삭제
            productRepository.deleteAll(userProducts);
            signupRepository.delete(user); // 사용자를 데이터베이스에서 삭제

            return ResponseEntity.ok().body("계정이 성공적으로 삭제되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("해당 아이디를 찾을 수 없습니다.");
        }
    }

}