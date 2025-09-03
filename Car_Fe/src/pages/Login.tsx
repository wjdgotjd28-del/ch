import { Button, Snackbar, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import type { User } from "../type";
import { getAuthToken } from "../api/loginApi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";


export default function Login() {
    const navigate = useNavigate(); //useNavigate페이지 이동 제어 컴포넌트
    const { login } = useAuthStore();
    const [toastOpen, setToastOpen] = useState(false);
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    };
//페이지가 2개 이상이면 라우팅을 무조건 해줘야한다
    const handleLogin = () => {
        getAuthToken(user)
        .then((token) => {
            if(token !== null) {
                sessionStorage.setItem("jwt", token) // sessionStorage는 탭 단위 세션 저장소 인데  탭을 닫으면 사라      
                login(); //로그인 함수를 호출해서 전역으로 관리하는 true여부를 
                navigate("/")
            }
        })
        .catch((err) => {
            console.log(err)
            setToastOpen(true);
        });
    };

    return (
        <>
        <Stack spacing={2} mt={2} alignItems="center">
            <TextField
                label="ID" //label보여만 주는것
                name="username"
                onChange={handleChange}
            />
            <TextField
                label="pw" //보여만 주는것
                name="password"
                onChange={handleChange}
            />
            <Button 
            color="primary"
            onClick={handleLogin}>
                로그인
            </Button>
            <Snackbar 
                open={toastOpen}
                autoHideDuration={3000}
                onClose={() => setToastOpen(false)}
                message='로그인 실패'
            />
        </Stack>
        </>
    )

}