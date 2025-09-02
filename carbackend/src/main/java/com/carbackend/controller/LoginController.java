package com.carbackend.controller;

import com.carbackend.dto.AccountCredentials;
import com.carbackend.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController
{
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AccountCredentials credentials) {   //아이디 패스워드 묶어놓은 DTO
        //1. 유저의 ID/PW 정보를 기반으로 UsernamePasswordAuthenticationToken 생성
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(
                        credentials.getUsername(), credentials.getPassword());
        //2. 생성된 UsernamePasswordAuthenticationToken 을 authenticationManager 전달
        //3. authenticationManager는 궁극적으로 UserDetailsService의 loadUserByUsername을 호출
        //4. 조회된 유저정보(UserDetail)와 UsernamePasswordAuthenticationToken을 비교해 인증 처리
        Authentication authentication = authenticationManager.authenticate(token);
        //5. 최종 반환된 Authentication(인증된 유저 정보)를 기반으로 JWT TOKEN 발급
        String jwtToken = jwtService.generateToken(authentication.getName());
        //6. 컨트롤러는 응답 헤더(Authorization)에 Bearer <JWT TOKEN VALUE> 형태로 응답
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwtToken)
                .build();
    }
}
