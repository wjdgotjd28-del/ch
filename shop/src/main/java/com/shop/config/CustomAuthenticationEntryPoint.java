package com.shop.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        if ("XMLHttpRequest".equalsIgnoreCase(request.getHeader("x-requested-with"))) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        }else {
            response.sendRedirect("/members/login");
        }
    }
}
// 강 쌤 예전 코드
//public class CustomAuthenticationEntryPoint extends LoginUrlAuthenticationEntryPoint {
//    public CustomAuthenticationEntryPoint(String loginUrl) {
//        super(loginUrl);
//    }
//
//    @Override
//    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
//        String ajaxHeader = request.getHeader("X-Requested-With");
////        boolean isAjax = (ajaxHeader == null)? false : ajaxHeader.equals("XMLHttpRequest");
//        boolean isAjax = ajaxHeader != null && ajaxHeader.equals("XMLHttpRequest");
//        if(isAjax){
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Ajax Request Denied");
//        }else {
//            super.commence(request, response, authException);
//        }
//    }
//}

// -수업시간에  작성한 코드-
//AccessDeniedHandler?
//기본적인 인증된(Authenticated) 유저가 권한이 없는(Forbidden) 자원을 요청했을 때 동작
//*/
//public class CustomAccessDeniedHandler implements AccessDeniedHandler {
//    @Override
//    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
//        //응답 객체에 상태코드 403 설정
//        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//        response.setCharacterEncoding("UTF-8");
//        response.setContentType("text/html;charset=UTF-8");
//        PrintWriter writer = response.getWriter();
//        writer.println("<!DOCTYPE html>");
//        writer.println("<html>");
//        writer.println("<body>");
//        writer.println("<h1>페이지 접근 권한이 없습니다.</h1>");
//        writer.println("</body>");
//        writer.println("</html>");
//    }
//}
//AuthenticationEntryPoint?
//인증되지 않은 유저가 인증이 필요한 자원을 요청했을 때
//처리할 응답을 커스텀 ==> 작성 ==> 필터 체인에 등록
//*/
//public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
//    @Override
//    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
//        //응답 객체에 상태코드 401 설정
//        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//        response.setCharacterEncoding("UTF-8");
//        response.setContentType("text/html;charset=UTF-8");
//        PrintWriter writer = response.getWriter();
//        writer.println("<!DOCTYPE html>");
//        writer.println("<html>");
//        writer.println("<body>");
//        writer.println("<h1>로그인이 필요한 페이지 입니다.</h1>");
//        writer.println("</body>");
//        writer.println("</html>");
//    }
//    //인증이 되지 않은 유저가 인증이 필요한 자원을 요청한 경우
//    //AS-IS(Default) : 302 반환 후 Location 헤더에 로그인 페이지 응답 => 브라우저가 자동으로 로그인 페이지로 이동
//    //TO-BE : 401(UnAuthorized) 상태 코드에 적당한 메시지 반환
//}
//