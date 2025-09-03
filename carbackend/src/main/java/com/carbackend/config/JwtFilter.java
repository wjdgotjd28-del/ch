package com.carbackend.config;

import com.carbackend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter  //한요청당 한번만
{

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 필터 ==> 요청, 응답을 중간에서 가로챈 다음 ==> 필요한 동작을 수행
        // 1. 요청 헤더(Authorization)에서 JWT 토큰을 꺼냄
        String jwtToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (jwtToken != null) {
            // 2. 꺼낸 토큰에서 유저 정보 추출
            String username = jwtService.parseToken(request);
            // 3. 추출된 유저 정보로 Authentication을 만들어 SecurityContext에 set
            if(username != null) {
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                        username,
                        null, //password는 null
                        Collections.emptyList());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        // 마지막에 다음 필터를 호출
        filterChain.doFilter(request,response);
    }
}
