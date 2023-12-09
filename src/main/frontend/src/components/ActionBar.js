import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ActionBar.css';
import axios from "axios";

function ActionBar() {
    const [time, setTime] = useState(new Date());
    const [loginId, setLoginId]= useState();
    const [point, setPoint] = useState();

    const handleLogoutClick = () => {
        localStorage.setItem('token', ''); // 토큰 삭제
        setLoginId(''); // 로그인 상태 해제

        axios.post('/api/logout')
            .then()
            .catch();
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchUsernameFromToken = async () => {
            try {
                const response = await axios.get(`/api/getUsernameFromToken/${token}`);
                const username = response.data;
                console.log("임시",username)
                setLoginId(username);
            } catch (error) {
                alert("토큰이 만료되었습니다, 다시 로그인 해주세요")
                handleLogoutClick();
                console.error('토큰에서 사용자 이름 가져오는 중 오류 발생:', error);
            }
        };
        if (token) {
            // 토큰이 있으면 아이디 추출하여 로그인 상태로 설정
            fetchUsernameFromToken();
        }
        if (!token) {
            handleLogoutClick();
        }

        if (loginId) {
            // 로그인 상태일 때 포인트 가져오기
            axios.post('/api/point', loginId)
                .then(response => {
                    setPoint(response.data);
                    console.log(response.data, "리스폰데이터",loginId);
                })
                .catch(error => {
                    console.error('포인트 가져오는 중 오류 발생:', error);
                });
        }

        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(id);
    }, [loginId, setLoginId]);


    return (
        <div className="action-bar-main">
            <div className="action-bar">
                <div className="logo">
                    <Link to="/">
                        <img src="/logo3.png" alt="Logo" style={{ margin: '10px 0 0 20px' }} />
                    </Link>
                </div>
                <div className="right-section">
                    <div className="time">{time.toLocaleTimeString()}</div>
                    <div className="links">
                        {!loginId && <Link to="/login">로그인</Link>}
                        {!loginId && <Link to="/signup">회원가입</Link>}
                        {loginId && <Link to="/ProfilePage">내정보</Link>}
                        {loginId && <Link to="/myPage">마이페이지</Link>}
                        {loginId && <div className="pointClass">보유 포인트 : {point}</div>}
                        <a href="/" className="action-bar-a">포인트 충전</a>
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
