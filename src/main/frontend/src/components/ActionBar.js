// ActionBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ActionBar.css';
import { useState, useEffect } from 'react';
import { useUser } from './UserContext';

function ActionBar() {
    const [time, setTime] = useState(new Date());
    const { loginId } = useUser();

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
                        <Link to="/login">로그인</Link>
                        <Link to="/signup">회원가입</Link>
                        <Link to="/myPage">마이페이지</Link>
                    </div>
                    {loginId && (
                        <p className="logged-in-user">현재 로그인한 아이디: {loginId}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ActionBar;
