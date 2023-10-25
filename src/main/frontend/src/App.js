import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ActionBar from './components/ActionBar';
import Layout from './components/Layout';
import Login from './components/Login'; // Login 컴포넌트를 임포트합니다.
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';


const App = () => {
  const [hello, setHello] = useState('연동 X');

  useEffect(() => {
    console.log("화살표 함수 테스트");
    axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error));
  }, []);
  return (
    <Router>
      <div>
        <ActionBar />
        <Routes>
          {/* 다른 라우트 추가 */}
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<Login />} /> {/* /login 경로로 들어오면 Login 컴포넌트를 보여줍니다. */}
          <Route path="/signup" element={<Signup />} /> {/* /signup 경로로 들어오면 Signup 컴포넌트를 보여줍니다. */}        
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* 아이디/비밀번호 찾기 페이지로 이동합니다. */}
          <Route path='*' element={<div className='error'>에러 페이지</div>} />
        </Routes>
        <hr></hr>
        백엔드 연동 테스트: {hello}
      </div>
    </Router>
  );
}

export default App;
