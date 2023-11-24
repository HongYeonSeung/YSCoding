import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './MyPage.css';
import { useUser } from './UserContext'; // UserContext를 import
import PasswordCheckPage from './PasswordCheckPage'; // PasswordCheckPage를 import
import EditProfilePage from './EditProfilePage'; // EditProfilePage를 import

const MyPage = () => {
    const { username } = useUser(); // 로그인된 사용자의 ID를 불러옴
    const [showEditProfile, setShowEditProfile] = useState(false); // EditProfilePage를 표시할지 결정하는 state

    const handlePasswordCheckSuccess = () => {
        setShowEditProfile(true); // 비밀번호 확인이 성공하면 EditProfilePage를 표시
    };

    return (
        <div className="myPage_main">
            <h1>마이페이지</h1>
            <p>로그인된 사용자 ID: {username}</p> {/* 로그인된 사용자의 ID를 화면에 표시 */}
            {!showEditProfile ? ( // showEditProfile가 false이면 PasswordCheckPage를 표시
                <PasswordCheckPage onSuccess={handlePasswordCheckSuccess} /> // 비밀번호 확인이 성공하면 handlePasswordCheckSuccess 함수를 호출
            ) : (
                <EditProfilePage /> // showEditProfile가 true이면 EditProfilePage를 표시
            )}
        </div>
    );
}

export default MyPage;
