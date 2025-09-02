package com.carbackend.service;

import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.sql.Date;

@Service
public class JwtService
{
    //서버와 클라이언트가 주고받는 토큰 ==> HTTP Header 내 Authorization 헤더 값에 저장
    //예) Authorization Bearer <토큰값>  //받을떄도 이렇게 받고 줄때도 이렇게 준다
    static final String PREFIX = "Bearer ";
    static final long EXPIRATION_TIME = 24*60*60*1000;
    static final Key SIGNING_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // username(ID)를 받아서 JWT생성
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username) // 서브잭트에 유저네임 넣기
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SIGNING_KEY)
                .compact();
    }

    //JWT를 받아서 username(ID)를 반환
    public String parseToken(HttpServletRequest request) {
        //요청 헤더에서 Authorization 헤더값을 가져옴
        // 예) token = Bearer <토큰값>
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(header != null && header.startsWith(PREFIX)) {
            JwtParser parser = Jwts.parserBuilder()        //비밀키로만 파싱을 할 수 있는데 이렇게 파싱을 하는것이다.
                    .setSigningKey(SIGNING_KEY)
                    .build();
            String username = parser.parseClaimsJws(header.replace(PREFIX, ""))
                    .getBody()
                    .getSubject();
            if (username != null) {
                return username; //서브잭트에 유저네임 넣었으니까 빼주기
            }
        }
        return null;
    }
}
