import React, { useState } from 'react';
import './Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState(''); // 아이디 필드 추가
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState('');

  const handleSignup = () => {
    if (password === confirmPassword) {
      // 비밀번호가 일치할 때 회원가입 로직을 구현하거나 API 호출을 수행합니다.
    } else {
      // 비밀번호가 일치하지 않을 때 처리 (예: 오류 메시지 표시)
      setPasswordMatch(false);
      setError('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="signup-container" style={{ backgroundColor: '#6bff98' }}>
      <div className="signup-container">
      <div className="signup-box">
        <h2>회원가입</h2>
        <form>
          <div>
            <label htmlFor="email">이메일:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="username">아이디:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">비밀번호:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">비밀번호 확인:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!passwordMatch && <p className="error-message">{error}</p>}
          </div>
          <div>
            <label htmlFor="name">이름:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="birthdate">생년월일:</label>
            <input
              type="text"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">전화번호:</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
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
