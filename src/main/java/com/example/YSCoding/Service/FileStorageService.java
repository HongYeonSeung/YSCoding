package com.example.YSCoding.Service;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    //홍연승 C:\Users\fover\Desktop\YSCoding\src\main\java\com\example\YSCoding\img
    // 최영 C:\Users\choiy\Desktop\YSCoding\src\main\java\com\example\YSCoding\img
    private String uploadDir = "C:\\Users\\choiy\\Desktop\\YSCoding\\src\\main\\java\\com\\example\\YSCoding\\img"; // 실제 파일을 저장할 경로

    public String saveImage(MultipartFile file) {
        try {
            String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());

            // UUID 생성
            String uuid = UUID.randomUUID().toString();

            // 파일 확장자 추출
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));

            // 새로운 파일명 생성 (원본 파일명 + UUID + 확장자)
            String fileNameFinal = originalFileName.replace(fileExtension, "") + "-" + uuid + fileExtension;

            // 저장할 경로와 파일명 결합
            Path targetLocation = Path.of(uploadDir, fileNameFinal);

            // 파일 복사
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileNameFinal;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
