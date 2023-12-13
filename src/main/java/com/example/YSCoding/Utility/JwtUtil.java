package com.example.YSCoding.Utility;

import io.jsonwebtoken.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtUtil {
    private static final String SECRET_KEY = "yourSecretKey";
    private static final long EXPIRATION_TIME = 1800000 ; //30분 (단위: 밀리초)

    public static String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", username);
        claims.put("created", new Date());

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    public static String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    //토큰 유효성 검사
    public static boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            // JWT 서명이 유효하지 않음
            // Log or handle the exception
        } catch (ExpiredJwtException ex) {
            // JWT가 만료됨
            // Log or handle the exception
        } catch (Exception ex) {
            // 다른 예외 처리
            // Log or handle the exception
        }
        return false;
    }
}
