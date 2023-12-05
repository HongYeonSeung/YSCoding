import React, { useState } from 'react';
import './Login.css';
import axios from "axios";
import { UserProvider, useUser } from './UserContext'; // UserProvider를 import
import {useNavigate} from "react-router-dom"; // 로그인 스타일 파일을 임포트합니다.

const Login = () => {
  const { loginId } = useUser();

  const [token, setToken] = useState('');
  const navigate = useNavigate();

    const [memberId, setMemberId] = useState();
    const [memberName, setMemberName] = useState();

    const { setResponseData } = useUser();
  const [data, setData] = useState({
    memberName: '',
    memberPassword: '',
  });





    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/login', data);
            const message = response.data;

            if (message === null || message === '') {
                alert('로그인에 실패하였습니다');
            } else {
                setMemberId(response.data.username);
                setMemberName(response.data.name);
                console.log("로그인 결과", response.data.username, response.data.name);
                await handleLogin(); // 로그인 후의 작업을 수행
            }
        } catch (error) {
            console.error('데이터 전송 중 오류 발생:', error);
        }
    };

    // 로그인 후 작업을 수행 and 토큰 생성 요청
    const handleLogin = async () => {
        try {
            const response = await axios.get(`/api/generateToken/${data.memberName}`);
            localStorage.setItem('token', response.data);
            console.log(localStorage.getItem('token'));
            navigate('/');
            window.location.reload();

        } catch (error) {
            console.error('Error generating token:', error);
        }
    };
  return (
      <UserProvider>
        <div className='login_box' style={{ backgroundColor: '#fff' }}>
          <div className='login_box_main'>
            <div className='login-box-white'>
              <form onSubmit={handleSubmit}>
                <div className='input-box'>
                  <input className='login_input'
                      type="text"
                      name="memberName"
                      value={data.memberName}
                      onChange={handleInputChange}
                      placeholder="이름"
                  />
                  <label htmlFor="name">아이디</label>
                </div>


                <div className='input-box'>
                  <input className='login_input'
                      type="password"
                      name="memberPassword"
                      value={data.memberPassword}
                      onChange={handleInputChange}
                      placeholder="비밀번호"
                  />
                  <label htmlFor="password">비밀번호</label>
                </div>

                {/* 다른 폼 필드를 추가하세요 */}

                <button className='button-submit' type="submit">로그인</button>
                <a href='/password-find' id="password-link">비밀번호 찾기</a>
                <a href='/signup' id="sign_in-link">회원가입</a>
              </form>
            </div>
          </div>
        </div>
      </UserProvider>
  );
}

export default Login;
