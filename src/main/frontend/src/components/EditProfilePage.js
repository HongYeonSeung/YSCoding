<<<<<<< HEAD
import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext'; // UserContext를 import

const EditProfilePage = () => {
    const { loginId, username } = useUser(); // 로그인된 사용자의 ID와 이름을 불러옴
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
    const [userDto, setUserDto] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token')); // 로컬 스토리지에서 토큰을 가져옴

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`api/getUsernameFromToken/${token}`);
                const username = response.data;
                const userInfoResponse = await axios.post(`api/get-user-info`, { username: username });
                setUserDto(userInfoResponse.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        fetchUserInfo();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserDto({ ...userDto, [name]: value });
    };

    const navigate = useNavigate();
>>>>>>> c4c0d55 (내정보 업데이트까지 완료. 비밀번호 변경 만들기 전)

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
<<<<<<< HEAD
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
=======
            await axios.post(`api/update-user-info`, userDto);
            alert('사용자 정보가 성공적으로 업데이트되었습니다.');
            navigate('/');
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    if (!userDto) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>정보 수정 페이지</h1>
            <form onSubmit={handleSubmit}>
                사용자 이름:
                <input type="text" name="username" value={userDto.username} disabled />
                이메일:
                <input type="email" name="email" value={userDto.email} onChange={handleInputChange} />
                이름:
                <input type="text" name="name" value={userDto.name} onChange={handleInputChange} />
                생년월일:
                <input type="text" name="birthdate" value={userDto.birthdate} onChange={handleInputChange} />
                전화번호:
                <input type="tel" name="phoneNumber" value={userDto.phoneNumber} onChange={handleInputChange} />
>>>>>>> c4c0d55 (내정보 업데이트까지 완료. 비밀번호 변경 만들기 전)
                <button type="submit">수정 완료</button>
            </form>
        </div>
    );
<<<<<<< HEAD
};
=======
}
>>>>>>> c4c0d55 (내정보 업데이트까지 완료. 비밀번호 변경 만들기 전)

export default EditProfilePage;
