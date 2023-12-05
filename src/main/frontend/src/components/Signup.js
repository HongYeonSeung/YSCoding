import React, { useState } from 'react';
import './Signup.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode"; //추가
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState(''); // 아이디 필드 추가
  const [name, setName] = useState('');
  const [daumMap, setDaumMap] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState('');


  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true)
  }

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false)
  }


  const navigate = useNavigate();

  const completeHandler = (data:any) =>{
    console.log(data);
  }
  const handleSignup = () => {
    if (password === confirmPassword) {
      // 비밀번호가 일치할 때 회원가입 로직을 구현하거나 API 호출을 수행합니다.
      const userData = {
        email,
        password,
        username,
        name,
        birthdate,
        phoneNumber,
      };


      axios.post('/api/signupData', userData)
          .then((response) => {
            // 회원가입 성공 처리
            // console.log('회원가입이 성공적으로 완료되었습니다.');
            if(response.data === "회원가입이 성공적으로 완료되었습니다."){
              alert("회원가입 완료")
              navigate('/login');
            }else if(response.data === "이미 존재하는 사용자명입니다."){
              alert("이미 존재하는 사용자명입니다.")

            }else if(response.data === "이미 존재하는 이메일입니다."){
              alert("이미 존재하는 이메일입니다.")
            }

          })
          .catch((error) => {
            // 에러 처리
            console.error('회원가입 오류:', error);
          });

    } else {
      // 비밀번호가 일치하지 않을 때 처리 (예: 오류 메시지 표시)
      setPasswordMatch(false);
      setError('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="signup-container" style={{ backgroundColor: '#fff' }}>
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
            />
          </div>
          <div>
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!passwordMatch && <p className="error-message">{error}</p>}
          </div>
          <div>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="birthdate">생년월일</label>
            <input
              type="text"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">전화번호</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          {/*<div>*/}
          {/*  <label htmlFor="daumMap">주소</label>*/}
          {/*  <input*/}
          {/*      type="text"  // 타입을 text로 설정*/}
          {/*      id="daumMap"*/}
          {/*      value={daumMap}*/}
          {/*      onChange={(e) => setDaumMap(e.target.value)}*/}
          {/*      disabled  // 비활성화 속성 추가*/}
          {/*  />*/}
          {/*</div>*/}
          {/*<button type='button' onClick={openPostCode}>우편번호 검색</button>*/}
          {/*<div id='popupDom'>*/}
          {/*  {isPopupOpen && (*/}
          {/*      <PopupDom>*/}
          {/*        <PopupPostCode onClose={closePostCode} />*/}
          {/*      </PopupDom>*/}
          {/*  )}*/}
          {/*</div>*/}
          <div>
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
