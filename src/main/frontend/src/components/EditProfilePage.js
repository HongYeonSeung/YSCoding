import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext'; // UserContext를 import

const EditProfilePage = () => {
    const { loginId, username } = useUser(); // 로그인된 사용자의 ID와 이름을 불러옴
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/edit-profile', { username: loginId, birthdate, email, password, phoneNumber }); // 수정된 정보를 백엔드로 전송
            if (response.data === 'success') { // 백엔드의 응답이 'success'이면
                alert('프로필이 성공적으로 수정되었습니다.'); // 성공 메시지를 표시
            } else {
                alert('프로필 수정에 실패하였습니다.'); // 실패 메시지를 표시
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>프로필 수정</h2>
            <form onSubmit={handleSubmit}>
                이름:
                <input type="text" value={loginId} disabled /> {/* 이름은 수정 불가능 */}
                사용자 ID:
                <input type="text" value={username} disabled /> {/* 사용자 ID는 수정 불가능 */}
                생년월일:
                <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
                {console.log("dfsdf", birthdate)}
                이메일:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                비밀번호:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                전화번호:
                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                <button type="submit">수정 완료</button>
            </form>
        </div>
    );
};

export default EditProfilePage;
