import React, {useState} from 'react';
import './Signup.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import PopupPostCode from "./PopupPostCode";
import PopupDom from './PopupDom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [passwordMatch, setPasswordMatch] = useState(true);

    const navigate = useNavigate();

    //다음 주소 api 관련
    // 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    //주소 필드, 팝업창에서 props 리턴
    const [homeAddress, setHomeAddress] = useState('')
    const [detailHomeAddress, setDetailHomeAddress] = useState('')
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
        setHomeAddress(result);
        // closePostCode(); // 팝업 닫기
    };


    const handleSignup = () => {
        // 정규식 패턴 정의
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const usernamePattern = /^[a-zA-Z0-9_]{5,}$/;
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const namePattern = /^[a-zA-Z가-힣\s]{1,10}$/;
        const birthdatePattern = /^\d{8}$/;
        const phoneNumberPattern = /^\d{11}$/;

        // 입력 필드가 비어 있는지 확인
        if (!email || !password || !confirmPassword || !username || !name || !birthdate || !phoneNumber || !homeAddress || !detailHomeAddress) {
            alert('모든 입력 필드를 채워주세요.');
            return;
        }

        // 각 필드에 대한 정규식 검사
        if (!emailPattern.test(email)) {
            alert('올바른 이메일 형식이 아닙니다.');
            return;
        }

        if (!usernamePattern.test(username)) {
            alert('아이디는 5자 이상이어야 합니다.');
            return;
        }

        if (!passwordPattern.test(password)) {
            alert('비밀번호는 숫자 + 영문 8자 이상이어야 하며, 특수문자가 1개 이상 포함되어야 합니다.');
            return;
        }

        if (!namePattern.test(name)) {
            alert('이름은 10자 이내로 작성해주세요.');
            return;
        }

        if (!birthdatePattern.test(birthdate)) {
            alert('생년월일은 8자의 숫자로 작성되어야 합니다.');
            return;
        }

        if (!phoneNumberPattern.test(phoneNumber)) {
            alert('전화번호는 11자의 숫자로 작성되어야 합니다.');
            return;
        }

        // 비밀번호가 일치하는지 확인
        if (password === confirmPassword) {
            const userData = {
                email,
                password,
                username,
                name,
                birthdate,
                phoneNumber,
                homeAddress,
                detailHomeAddress
            };

            axios.post('/api/signupData', userData)
                .then((response) => {
                    if (response.data === '회원가입이 성공적으로 완료되었습니다.') {
                        alert('회원가입 완료');
                        navigate('/login');
                    } else if (response.data === '이미 존재하는 사용자명입니다.') {
                        alert('이미 존재하는 사용자명입니다.');
                    } else if (response.data === '이미 존재하는 이메일입니다.') {
                        alert('이미 존재하는 이메일입니다.');
                    }
                })
                .catch((error) => {
                    console.error('회원가입 오류:', error);
                });
        } else {
            setPasswordMatch(false);
            alert('비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <div className="signup-container" style={{backgroundColor: '#fff'}}>
            <div className="signup-container">
                <div className="signup-box">
                    <h2>회원가입</h2>
                    <form>
                        <div>
                            <label htmlFor="email">이메일</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ex)ysauction@naver.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="username">아이디</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="사용할 아이디를 입력하세요."
                            />
                        </div>
                        <div>
                            <label htmlFor="password">비밀번호</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요."
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">비밀번호 확인</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="비밀번호를 다시 입력하세요."
                            />
                            {/*{!passwordMatch && <p className="error-message">비밀번호가 일치하지 않습니다.</p>}*/}
                        </div>
                        <div>
                            <label htmlFor="name">이름</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="성함을 입력하세요."

                            />
                        </div>
                        <div>
                            <label htmlFor="birthdate">생년월일</label>
                            <input
                                type="text"
                                id="birthdate"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value.replace(/[^0-9]/g, '').slice(0, 8))}
                                placeholder="ex)19970101"
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber">전화번호</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 11))}
                                placeholder="ex)01012345678"
                            />
                        </div>


                        <div id="homeAddressDiv">
                            <label htmlFor="homeAddress">주소</label>
                            <input
                                type="text"
                                id="homeAddress"
                                disabled
                                value={homeAddress}
                            />
                        </div>
                        <div id="homeAddressBox">
                            <div id="detailHomeAddressDiv">
                                <input
                                    type="text"
                                    id="detailHomeAddress"
                                    placeholder="상세주소를 입력하세요"
                                    value={detailHomeAddress}
                                    onChange={(e) => setDetailHomeAddress(e.target.value)}
                                />
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

                        <button type="button" onClick={handleSignup}>
                            회원가입
                        </button>
                    </form>


                </div>
            </div>
        </div>
    );
}

export default Signup;