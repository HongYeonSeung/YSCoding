/* eslint-disable */
import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  const handleSignup = () => {
    // 입력 필드가 비어 있는지 확인
    if (!email || !password || !confirmPassword || !username || !name || !birthdate || !phoneNumber) {
      alert('모든 입력 필드를 채워주세요.');
      return;
    }

    // 비밀번호가 일치하는지 확인
    if (password === confirmPassword) {
      const userData = {
        email,
        password,
        username,
        name,
        birthdate,
        phoneNumber,
      };

      axios.post('/api/signupData', userData)
          .then((response) => {
            if (response.data === '회원가입이 성공적으로 완료되었습니다.') {
              alert('회원가입 완료');
              navigate('/login');
            } else if (response.data === '이미 존재하는 사용자명입니다.') {
              alert('이미 존재하는 사용자명입니다.');
            } else if (response.data === '이미 존재하는 이메일입니다.') {
              alert('이미 존재하는 이메일입니다.');
            }
          })
          .catch((error) => {
            console.error('회원가입 오류:', error);
          });
    } else {
      setPasswordMatch(false);
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
      <div className="signup-container" style={{ backgroundColor: '#fff' }}>
        <div className="signup-container">
          <div className="signup-box">
            <h2>회원가입</h2>
            <form>
              <div>
                <label htmlFor="email">이메일</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="username">아이디</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">비밀번호 확인</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {/*{!passwordMatch && <p className="error-message">비밀번호가 일치하지 않습니다.</p>}*/}
              </div>
              <div>
                <label htmlFor="name">이름</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="birthdate">생년월일</label>
                <input
                    type="text"
                    id="birthdate"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>
              <div>
                <label htmlFor="phoneNumber">전화번호</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>
              <div>
              </div>
              <button type="button" onClick={handleSignup}>
                회원가입
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Signup;
