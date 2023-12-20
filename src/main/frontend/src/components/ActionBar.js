import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './ActionBar.css';
import axios from "axios";
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function ActionBar() {

    const [time, setTime] = useState(new Date());
    const [loginId, setLoginId] = useState();
    const [point, setPoint] = useState();
    const [admin, setAdmin] = useState(false);

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
            axios.post(`/api/point/${loginId}`)
                .then(response => {
                    setPoint(response.data);
                })
                .catch(error => {
                    console.error('포인트 가져오는 중 오류 발생:', error);
                });


            axios.get(`/api/adminCheck/${loginId}`)
                .then(response => {
                    setAdmin(response.data);
                })
                .catch(error => {
                    console.error('어드민 여부 확인 중 오류 발생:', error);
                });

        }

        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(id);
    }, [loginId, setLoginId]);



    useEffect(() => {
        const token = localStorage.getItem('token');
        const intervalId = setInterval(() => {
            if (loginId !== '') {
                axios.get(`/api/validateToken/${token}`)
                    .then(response => {
                        if (response.data === "Invalid Token") {
                            handleLogoutClick();
                            alert("토큰 만료되었습니다, 다시 로그인해주세요.");
                            window.location.reload();
                        }
                    })
                    .catch(error => console.log("토큰 에러", error));
                // console.log("로그인중");
                // console.log(loginId)
                // console.log(token)
            }
        }, 5000); // 5초마다실행

        return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 메모리 누수 방지
    }, [loginId]); // loginId가 변경될 때마다 useEffect 실행


    return (
        <div className="action-bar-main">
            <div className="action-bar">
                <div className="logo">
                    <Link to="/">
                        <img src="/logo3.png" alt="Logo" style={{margin: '10px 0 0 20px'}}/>
                    </Link>

                </div>
                <div className="right-section">
                    <div className="links">
                        <div>{admin && <Link to="/AdminPage">관리자 페이지</Link>}</div>
                        <div>{!loginId && <Link to="/login">로그인</Link>}</div>
                        <div>{!loginId && <Link to="/signup">회원가입</Link>}</div>
                        <div>{loginId && <Link to="/ProfilePage">내정보</Link>}</div>
                        <div>{loginId && <Link to="/myPage">마이페이지</Link>}</div>
                        <div>
                            {loginId && (
                                <div className="pointClass">
                                    보유 포인트: {point && point.toLocaleString()}
                                </div>
                            )}
                        </div>
                        <div>{loginId &&<a href="/" className="action-bar-a action-bar-b">포인트 충전</a>}</div>
                    </div>
                    {loginId && (
                        <div className="action-bar-div">
                            <p className="logged-in-user">{loginId} 님 연성옥션에 오신걸 환영합니다!</p>
                            <a href="/" onClick={handleLogoutClick} className="action-bar-a">로그아웃</a>
                        </div>
                    )}
                    {/*<div className="time">{time.toLocaleTimeString()}</div>*/}

                </div>
            </div>
        </div>
    );
}

export default ActionBar;
