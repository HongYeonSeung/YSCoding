//package com.example.YSCoding.Config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
//
//@Configuration//스프링의 환경설정 파일임을 의미, 여기선 스프링 시큐리티의 설정을 위해  사용됨
//@EnableWebSecurity//모든 요청 URL이 스프링 시큐리티의 제어를 받도록 함
//// 내부적으로 SpringSecurityFilterChain이 동작하여 URL 필더가 적용됨
//public class SecurityConfig {
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//        http
//                .authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
//                        .requestMatchers(new AntPathRequestMatcher("/**")).permitAll())
//                .formLogin((formLogin)-> formLogin
//                        .loginPage("/login")
//                        .defaultSuccessUrl("/"))
//                .logout((logout) -> logout
//                        .logoutRequestMatcher(new AntPathRequestMatcher("/api/logout"))
//                        .logoutSuccessUrl("/")
//                        .invalidateHttpSession(true))
//        ;
//        return http.build();
//    }
//
////    @Bean
////    PasswordEncoder passwordEncoder() {//PasswordEncoder는 BCryptPasswordEncoder 의 인터페이스임
////        return new BCryptPasswordEncoder();
////    }
////
////    @Bean
////        //스프링 시큐리티의 인증을 담당, 사용자 인증시 앞에서 작성한 UserSecurityService 와 PasswordEncoder 를 사용
////    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
////        return authenticationConfiguration.getAuthenticationManager();
////    }
//}