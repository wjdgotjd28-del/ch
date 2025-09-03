// import './App.css'

import { AppBar, Container, CssBaseline, Toolbar, Typography } from "@mui/material"
import CarList from "./pages/CarLists"
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import { type JSX } from "react"
import { useAuthStore } from "./store"


type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps) {//실제컴포넌트를 랜더링할지 말지 감싸서 확인하는것
  const {isAuthenticated} = useAuthStore();

  return isAuthenticated ? children : <Navigate to="/login" replace /> //navigate테그가 랜더링되면 login페이지로 간다
  
}
function App() {

  return (
    <>
      <Container maxWidth='xl'>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              자동차 쇼핑몰
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<PrivateRoute><CarList/></PrivateRoute>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Container>
    </>
  )
}

export default App
