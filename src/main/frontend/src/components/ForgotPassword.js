import React, { useState } from 'react';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 단계를 관리합니다. 1: 이메일 입력, 2: 아이디 입력, 3: 새 비밀번호 설정

  const handleEmailSubmit = () => {
    // 이메일 제출 로직을 구현하거나 이메일을 확인하는 API 호출을 수행합니다.
    // 이메일이 유효하면 setStep(2)로 변경하여 다음 단계로 진행합니다.
    setStep(2);
  };

  const handleUsernameSubmit = () => {
    // 아이디 제출 로직을 구현하거나 아이디를 확인하는 API 호출을 수행합니다.
    // 아이디가 유효하면 setStep(3)로 변경하여 다음 단계로 진행합니다.
    setStep(3);
  };

  const handleResetPassword = () => {
    // 새 비밀번호 설정 로직을 구현하거나 비밀번호를 재설정하는 API 호출을 수행합니다.
    // 비밀번호가 유효하면 비밀번호가 재설정되었다는 메시지를 표시하거나 다른 조치를 취합니다.
  };

  return (
    <div className="forgot-password-container" style={{ backgroundColor: '#6bff98' }}>
    <div className="forgot-password-container">
    <div className="forgot-password-box">
      <div className="centered-content">
        <h2>비밀번호를 잊으셨나요?</h2>
        {step === 1 && (
          <div>
            <p>이메일을 입력하여 아이디를 찾거나 비밀번호를 재설정하세요.</p>
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleEmailSubmit}>다음</button>
          </div>
        )}
        {step === 2 && (
          <div>
            <p>가입 시 등록한 아이디를 입력하세요.</p>
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleUsernameSubmit}>다음</button>
          </div>
        )}
        {step === 3 && (
          <div>
            <p>새로운 비밀번호를 설정하세요.</p>
            <input
              type="password"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleResetPassword}>비밀번호 재설정</button>
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
}

export default ForgotPassword;
