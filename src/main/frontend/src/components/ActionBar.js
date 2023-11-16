// ActionBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ActionBar.css';
import { useState, useEffect } from 'react';
import { useUser } from './UserContext';

function ActionBar() {
    const [time, setTime] = useState(new Date());
    const { loginId } = useUser("");

    const handleLogoutClick = () => {
        // 로그아웃 버튼을 클릭했을 때
        localStorage.setItem('loginId','');
    };

    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="action-bar-main">
            <div className="action-bar">
                <div className="logo">
                    <Link to="/">
                        <img src="/logo3.png" alt="Logo" />
                    </Link>
                </div>
                <div className="right-section">
                    <div className="time">{time.toLocaleTimeString()}</div>
                    <div className="links">
                        {loginId == "" && <Link to="/login">로그인</Link>}
                        {loginId == "" &&  <Link to="/signup">회원가입</Link>}

                        <Link to="/myPage">마이페이지</Link>
                    </div>
                    {loginId && (
                        <div className="action-bar-div">
                        <p className="logged-in-user">{loginId} 님 연성옥션에 오신걸 환영합니다!</p>
                            <a href="/" onClick={handleLogoutClick} className="action-bar-a">로그아웃</a>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default ActionBar;
