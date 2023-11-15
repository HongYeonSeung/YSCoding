package com.example.YSCoding.Service;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    private String uploadDir = "C:\\Users\\fover\\Desktop\\YSCoding\\src\\main\\java\\com\\example\\YSCoding\\img"; // 실제 파일을 저장할 경로

    public String saveImage(MultipartFile file) {
        try {
            // 파일명 중복 방지를 위해 UUID 또는 timestamp 등을 활용하여 새로운 파일명 생성
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());

            // 저장할 경로와 파일명 결합
            Path targetLocation = Path.of(uploadDir, fileName);

            // 파일 복사
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException e) {
            e.printStackTrace(); // 필요에 따라 예외 처리를 진행할 수 있습니다.
            return null; // 실패한 경우 null을 리턴하거나 예외를 throw 할 수 있습니다.
        }
    }
}
