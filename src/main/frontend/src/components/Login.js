import React, { useState } from 'react';
import './Login.css';
import axios from "axios"; // 로그인 스타일 파일을 임포트합니다.

const Login = () => {
  const [data, setData] = useState({
    name: '',
    password: '',
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
    axios.post('/api/submitData', data)
        .then((response) => {
          // 성공적으로 데이터를 보낸 후 실행할 코드를 여기에 추가하세요.
          console.log('데이터가 성공적으로 전송되었습니다.');
        })
        .catch((error) => {
          // 에러 처리 코드를 여기에 추가하세요.
          console.error('데이터 전송 중 오류 발생:', error);
        });
  };

  const handleLogin = () => {
    // 로그인 로직을 구현합니다. 예를 들어, API 호출 또는 상태 관리와 같은 작업을 수행합니다.
  };

  return (
      <div className='login_box' style={{ backgroundColor: '#6bff98' }}>
        <div className='login_box_main'>
          <div className='login-box-white'>
            <form onSubmit={handleSubmit}>
              <div className='input-box'>
                <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleInputChange}
                    placeholder="이름"
                />
                <label htlFor="name">아이디</label>
              </div>


              <div className='input-box'>
                <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleInputChange}
                    placeholder="비밀번호"
                />
                <label htmlFor="password">비밀번호</label>
              </div>

              {/* 다른 폼 필드를 추가하세요 */}

              <button className='button-submit' type="submit">전송</button>
              <a href='/password-find' id="password-link">비밀번호 찾기</a>
              <a href='/password-find' id="sign_in-link">회원가입</a>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Login;
