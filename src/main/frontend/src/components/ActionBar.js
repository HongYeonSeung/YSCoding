// ActionBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ActionBar.css';
import { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import axios from "axios";

function ActionBar() {
    const [time, setTime] = useState(new Date());
    const { userData, setResponseData } = useUser();

    const [point, setPoint ] = useState();
    const handleLogoutClick = () => {
        localStorage.setItem('loginId', '');
        axios.post('/api/logout')
            .then()
            .catch();
    };

    useEffect(() => {
        axios.post('/api/point', { loginId })
            .then(response => {
                setPoint(response.data);
                console.log(response.data,"리스폰데이터")
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        console.log(point)
        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(id);
    }, [loginId]);

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
                        {userData.memberName === "" && <Link to="/login">로그인</Link>}
                        {userData.memberName === "" && <Link to="/signup">회원가입</Link>}
                        <Link to="/myPage">마이페이지</Link>
                    </div>
                    {userData.memberName && (
                        <div className="action-bar-div">
                            <p className="logged-in-user">{userData.memberName} 님 연성옥션에 오신걸 환영합니다! 포인트: {userData.point}</p>
                            <a href="/" onClick={handleLogoutClick} className="action-bar-a">로그아웃</a>
                            <div>
                                포인트 량 : {point}
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}

export default ActionBar;