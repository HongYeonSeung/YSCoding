// EditProfilePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './EditProfilePage.css';

const EditProfilePage = () => {
    const [userDto, setUserDto] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`api/getUsernameFromToken/${token}`);
                const username = response.data;
                const userInfoResponse = await axios.post(`api/get-user-info`, { username: username });
                setUserDto(userInfoResponse.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            } finally {
                setLoading(false);
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
                ...(password && { password }),
            };
            await axios.post(`api/update-user-info`, updateData);
            alert('사용자 정보가 성공적으로 업데이트되었습니다.');
            navigate('/');
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('정말로 계정을 삭제하시겠습니까?')) {
            try {
                await axios.post(`api/delete-user`, { username: userDto.username });
                alert('계정이 성공적으로 삭제되었습니다.');
                localStorage.removeItem('token');
                navigate('/', { replace: true });
                window.location.reload();
            } catch (error) {
                console.error('Error deleting account:', error);
            }
        }
    };

    if (loading) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className="edit-profile-container">
            <h1>정보 수정 페이지</h1>
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">사용자 ID</label>
                    <input type="text" name="username" value={userDto?.username} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" value={userDto?.email} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">이름</label>
                    <input type="text" name="name" value={userDto?.name} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="birthdate">생년월일</label>
                    <input type="text" name="birthdate" value={userDto?.birthdate} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">전화번호</label>
                    <input type="tel" name="phoneNumber" value={userDto?.phoneNumber} onChange={handleInputChange} />
                </div>
                <button type="submit">수정 완료</button>
                <button type="button" className="delete-button" onClick={handleDeleteAccount}>회원 탈퇴</button>
            </form>
        </div>
    );
}

export default EditProfilePage;