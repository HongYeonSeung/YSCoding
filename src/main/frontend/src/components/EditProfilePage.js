import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
    const [userDto, setUserDto] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
    }, [token]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserDto({ ...userDto, [name]: value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password && password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            const updateData = {
                ...userDto,
                ...(password && { password }) // 비밀번호가 입력되었다면 업데이트 데이터에 포함
            };
            await axios.post(`api/update-user-info`, updateData);
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
                사용자 ID:
                <input type="text" name="username" value={userDto.username} disabled />
                비밀번호:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                비밀번호 확인:
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                이메일:
                <input type="email" name="email" value={userDto.email} onChange={handleInputChange} />
                이름:
                <input type="text" name="name" value={userDto.name} onChange={handleInputChange} />
                생년월일:
                <input type="text" name="birthdate" value={userDto.birthdate} onChange={handleInputChange} />
                전화번호:
                <input type="tel" name="phoneNumber" value={userDto.phoneNumber} onChange={handleInputChange} />
                <button type="submit">수정 완료</button>
            </form>
        </div>
    );
}

export default EditProfilePage;
