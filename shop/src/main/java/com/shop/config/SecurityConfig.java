package com.shop.config;

import com.shop.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.builders.WebSecurity;

@Configuration
//위 어노테이션이 달린 클래스에 @Bean 어노테이션이 붙은 메서드를
//등록하면 해당 메서드의 반환 값이 스프링 빈으로 등록됨
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private final MemberService memberService;

    public SecurityConfig(MemberService memberService) {
        this.memberService = memberService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http    //로그인 설정
            .formLogin(it -> it
                    .loginPage("/members/login")
                    .defaultSuccessUrl("/")
                    .usernameParameter("email")
                    .failureUrl("/members/login/error"));

        http    //로그아웃 설정
                .logout(it -> it
                        .logoutUrl("/members/logout")
                        .logoutSuccessUrl("/"));
        http    //권한 설정
                .authorizeHttpRequests(req -> {req
                        .requestMatchers("/","/css/**","/images/**","/item/**","/favicon.ico",
                                "/members/**").permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated();
                });

        http.
                exceptionHandling(it ->
                it.authenticationEntryPoint(new CustomAuthenticationEntryPoint()));
//        http.csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    //화면을 정상적으로 그리는데 필요한 정적인 자원들 허용
    //특별히 보안적인 고려사항이 없는 웹 전용 자원들
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Override
//    protected void configure(AuthenticationManagerBuilder auth)throws Exception{
//        auth.userDetailsService(memberService)
//                .passwordEncoder(passwordEncoder());
//    }
}
