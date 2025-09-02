import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Library from './ch03/Library'
import Button from './ch04/Button';
import ConfirmDialog from './ch04/Button';
import Clock from './ch04/Clock';
import CommentList from './ch05/CommemtList';
import AttdanceBook from './ch10/AttendanceBook';
import SignUp from './ch11/SignUp';
import Calculator from './ch12/Calculator';
import ProfileCard from './ch13/ProfileCard';
import App from './ch14/App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals