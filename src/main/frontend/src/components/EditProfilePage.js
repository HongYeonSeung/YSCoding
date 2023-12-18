// EditProfilePage.js

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './EditProfilePage.css';
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";

const EditProfilePage = () => {
    const [userDto, setUserDto] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    //다음 주소 api 관련
    // 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    // 팝업창 열기
    const openPostCode = (event) => {
        event.preventDefault(); // 기본 동작 막기

        setIsPopupOpen(true)
    }
    // 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }

    const handleSearchResult = (result) => {
        setUserDto((prevUserDto) => ({
            ...prevUserDto,
            homeAddress: result,
        }));
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`api/getUsernameFromToken/${token}`);
                const username = response.data;
                const userInfoResponse = await axios.post(`api/get-user-info`, {username: username});
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
        const {name, value} = event.target;

        // 생년월일과 전화번호는 숫자만 허용하도록 처리
        if (name === 'birthdate' || name === 'phoneNumber') {
            setUserDto((prevUserDto) => ({
                ...prevUserDto,
                [name]: value.replace(/[^0-9]/g, ''), // 숫자만 남기고 나머지 문자 제거
            }));
        } else {
            setUserDto((prevUserDto) => ({
                ...prevUserDto,
                [name]: value,
            }));
        }
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 빈 값이 있는지 확인
        if (
            !userDto.email ||
            !userDto.name ||
            !userDto.birthdate ||
            !userDto.phoneNumber ||
            !userDto.homeAddress
        ) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        if (password && password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const updateData = {
                ...userDto,
                ...(password && {password}),
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
                const response = await axios.post(`api/delete-user`, { username: userDto.username });
                const result = response.data;

                if (result.status === 'HAS_ACTIVE_PRODUCTS') {
                    alert('판매 중인 상품이 있어 탈퇴할 수 없습니다.');
                } else if (result.status === 'SUCCESS') {
                    alert('계정이 성공적으로 삭제되었습니다.');
                    localStorage.removeItem('token');
                    navigate('/', { replace: true });
                    window.location.reload();
                } else {
                    // 사용자를 찾을 수 없는 경우 등 다른 상황에 대한 처리
                    console.error('Unhandled status:', result.status);
                }
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
                    <input type="text" name="username" value={userDto?.username} disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" placeholder="변경 시 입력" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input type="password" placeholder="변경 시 입력" value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" value={userDto?.email} onChange={handleInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">이름</label>
                    <input type="text" name="name" value={userDto?.name} onChange={handleInputChange} disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="birthdate">생년월일</label>
                    <input type="text" name="birthdate" value={userDto?.birthdate} onChange={handleInputChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">전화번호</label>
                    <input type="tel" name="phoneNumber" value={userDto?.phoneNumber} onChange={handleInputChange}/>
                </div>
                <div id="homeAddressDiv">
                    <label htmlFor="phoneNumber">주소</label>
                    <input type="tel" name="homeAddress" value={userDto?.homeAddress} onChange={handleInputChange}
                           disabled/>
                </div>

                <div id="homeAddressBox">
                    <div id="detailHomeAddressDiv">
                        <input type="tel" name="detailHomeAddress" value={userDto?.detailHomeAddress}
                               onChange={handleInputChange}/>
                    </div>
                    <button id="homeAddressBnt" onClick={openPostCode}>주소 입력</button>
                    <div id='popupDom'>
                        {isPopupOpen && (
                            <PopupDom>
                                <PopupPostCode onClose={closePostCode} onSearchResult={handleSearchResult}/>
                            </PopupDom>
                        )}
                    </div>
                </div>

                <button type="submit">수정 완료</button>
                <button type="button" className="delete-button" onClick={handleDeleteAccount}>회원 탈퇴</button>
            </form>
        </div>
    );
}

export default EditProfilePage;