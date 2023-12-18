import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

const AdminPage = () => {
    const [time, setTime] = useState(new Date());
    const [loginId, setLoginId] = useState();
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
    }, [loginId, setLoginId,admin,setAdmin]);

    return (
        <div>

        </div>
    );
};

export default AdminPage;