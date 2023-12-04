import React, { useState } from 'react';
import './Login.css';
import axios from "axios";
import { UserProvider, useUser } from './UserContext'; // UserProvider를 import
import {useNavigate} from "react-router-dom"; // 로그인 스타일 파일을 임포트합니다.

const Login = () => {
  const { loginId } = useUser();

  const [token, setToken] = useState('');
  const navigate = useNavigate();
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Axios를 사용하여 데이터를 서버로 보냅니다.
    axios.post('/api/login', data)
        .then((response) => {
          // 백엔드에서 반환한 메시지 확인
          const message = response.data; // 백엔드에서의 메시지는 여기서 받습니다.

          if (message === -1) {
            // 로그인 실패 시 처리
            // console.error('로그인 실패:', message);
            alert('로그인에 실패하였습니다'); // 백엔드에서의 실패 메시지를 사용하여 알림창을 띄웁니다.
          }
          else if (message == ''){
            // 로그인 실패 시 처리
            // console.error('로그인 실패:', message);
            alert('로그인에 실패하였습니다'); // 백엔드에서의 실패
          }
          else {
            // 로그인 성공 시 처리
            // console.log('로그인 성공');
              setResponseData({ loginId: response.data.name, username: response.data.username });
            console.log("로그인 결과",response.data)
            handleLogin(); // 로그인 후의 작업을 수행

          }
        })
        .catch((error) => {
          // 에러 처리 코드를 여기에 추가하세요.
          console.error('데이터 전송 중 오류 발생:', error);
        });
  };

    // 로그인 후 작업을 수행 and 토큰 생성 요청
  const handleLogin = async () => {
      console.log(data.memberName); //id임 이름아님
      try {
          const response = await axios.get(`/api/generateToken/${data.memberName}`);

          // 토큰 저장 (예: localStorage에 저장)
          localStorage.setItem('token', response.data);
          console.log(localStorage.getItem('token'))
      } catch (error) {
          console.error('Error generating token:', error);
      }
    navigate('/');
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
                <a href='/password-find' id="sign_in-link">회원가입</a>
              </form>
            </div>
          </div>
        </div>
      </UserProvider>
  );
}

export default Login;
