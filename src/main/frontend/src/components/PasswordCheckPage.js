import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProfilePage from './EditProfilePage'; // EditProfilePage를 import
import './PasswordCheckPage.css'; // PasswordCheckPage의 CSS 파일 import

const PasswordCheckPage = () => {

    const [username, setUsername] = useState(''); // 사용자 이름을 state로 관리
    const [password, setPassword] = useState(''); // 비밀번호를 state로 관리
    const [showEditProfile, setShowEditProfile] = useState(false); // EditProfilePage를 표시할지 결정하는 state

    // 토큰으로 아이디 검증
    const [token, setToken] = useState(localStorage.getItem('token')); // 로컬 스토리지에서 토큰을 가져옴
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await axios.get(`api/getUsernameFromToken/${token}`);
                setUsername(response.data);
            } catch (error) {
                console.error('토큰 생성 중 오류 발생:', error);
            }
        };

        fetchUsername();
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/check-password', { username: username, password }); // 로그인된 사용자의 ID와 비밀번호를 백엔드로 전송
            if (response.data === 'success') { // 백엔드의 응답이 'success'이면
                setShowEditProfile(true); // EditProfilePage를 표시
            } else {
                alert('비밀번호가 일치하지 않습니다.'); // 비밀번호가 일치하지 않으면 알림 표시
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="password-check-container">
            {!showEditProfile ? (
                <form className="password-check-form" onSubmit={handleSubmit}>
                    <h2>비밀번호 확인</h2>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">확인</button>
                </form>
            ) : (
                <EditProfilePage />
            )}
        </div>
    );
};

export default PasswordCheckPage;
