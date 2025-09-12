package com.carbackend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig
{
    private final JwtFilter jwtFilter;
    private final AuthEntryPoint authEntryPoint;

    //로그인이라도 돼있는 설정은 필터없이 통과시켜줘야 한다
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf((csrf) ->
                        csrf.disable())//disable은 비활성화 한다는것
                .sessionManagement((session) ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // JWT는 세션을 사용하지 않기 때문에, 서버가 세션을 만들지 않도록 설정
                // ,REST API에서는 이게 필수

                .authorizeHttpRequests((request) -> request
                        .requestMatchers(HttpMethod.POST, "/login").permitAll()// 로그인 요청은 인증 없이 누구나 접근 가능하게 설정
                        .anyRequest().authenticated()) // 로그인 외의 모든 요청은 JWT 인증을 거쳐야만 접근 가능
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling((ex) ->
                        ex.authenticationEntryPoint(authEntryPoint)); //- 인증 실패 시 AuthEntryPoint를 통해 사용자에게 401 응답과 메시지를 반환



        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return NoOpPasswordEncoder.getInstance();
    }
//- 비밀번호를 암호화하지 않고 그대로 사용, 실제 서비스에서는 암호화 해서 사용해한다.

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception
    { //로그인 시 사용자 인증을 처리하는 핵심 컴포넌트
        return authConfig.getAuthenticationManager();
    }

}


// Spring Security에서 전체 보안 정책을 설정하는 핵심 구성 파일이에요. 쉽게 말하면, 이건 웹 애플리케이션의 보안 문지기를 어떻게 배치할지 정하는 설계도라고 보면 됩니다.