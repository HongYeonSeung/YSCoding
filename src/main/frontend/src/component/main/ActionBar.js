import React from 'react';
import { Link } from 'react-router-dom';
import './ActionBar.css'; // 스타일 파일을 가져옵니다.

function ActionBar() {
  
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="action-bar">
      <div className="logo">
        <Link to="/">My Website</Link>
      </div>
      <div className="right-section">
        <div className="time">{currentTime}</div>
        <div className="links">
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
          <Link to="/mypage">마이페이지</Link>
          
        </div>
      </div>
    </div>
  );
}

export default ActionBar;