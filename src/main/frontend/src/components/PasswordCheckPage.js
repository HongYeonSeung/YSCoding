import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext'; // UserContext를 import
import EditProfilePage from './EditProfilePage'; // EditProfilePage를 import

const PasswordCheckPage = () => {
    const { username } = useUser(); // 로그인된 사용자의 ID를 불러옴
    const [password, setPassword] = useState(''); // 비밀번호를 state로 관리
    const [showEditProfile, setShowEditProfile] = useState(false); // EditProfilePage를 표시할지 결정하는 state

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
        <div>
            <h2>비밀번호 확인</h2>
            {!showEditProfile ? ( // showEditProfile가 false이면 비밀번호 확인 폼을 표시
                <form onSubmit={handleSubmit}>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">확인</button>
                </form>
            ) : (
                <EditProfilePage /> // showEditProfile가 true이면 EditProfilePage를 표시
            )}
        </div>
    );
};

export default PasswordCheckPage;
