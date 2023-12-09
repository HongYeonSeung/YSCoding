import React, {useState,useEffect} from 'react';
import Logo1 from './logo1';
import SearchBar from './SearchBar';
import Layout1 from './Layout1';
import Layout2 from './Layout2';
import Layout3 from './Layout3';
import './Layout.css'; // 스타일 파일을 임포트합니다.
import { Link } from 'react-router-dom';
import axios from "axios"; // Link 컴포넌트를 임포트합니다

const Layout = () => {
    const [loginId,setloginId] = useState();
    // 토큰으로 아이디 검증
    const [token, setToken] = useState(localStorage.getItem('token')); // 로컬 스토리지에서 토큰을 가져옴
    useEffect(() => {
        const tokenToLogin = async () => {
            try {
                if (token) {  // 토큰이 존재하는 경우에만 실행
                    const response = await axios.get(`api/getUsernameFromToken/${token}`);
                    setloginId(response.data);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        tokenToLogin();
    }, [token]);



  return (
    <div className="layout">
      <div className="logo-search-container">
        {/*<Logo1 className="logo1" /> /!* 로고 이미지에 "logo1" 클래스 추가 *!/*/}
          <SearchBar /> {/* 검색창 컴포넌트 추가 */}
          <Link to="/product-create"> {/* 물품 등록 페이지로 이동하는 링크 */}
              {loginId && <button className="register-button">물품등록</button>} {/* 물품등록 버튼 추가 */}
          </Link>
      </div>

       {/* 물품등록 버튼을 원하는 위치에 스타일로 배치 가능 */}
      <Layout1 /> {/* Layout1 컴포넌트를 추가합니다. */}
      <Layout2 /> {/* Layout2 컴포넌트도 추가합니다. */}
      <Layout3 /> {/* Layout3 컴포넌트도 추가합니다. */}
      {/* 다른 내용을 이어서 추가할 수 있습니다. */}
    </div>
  );
}

export default Layout;