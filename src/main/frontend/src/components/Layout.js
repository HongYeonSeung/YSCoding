import React from 'react';
import Logo1 from './logo1';
import SearchBar from './SearchBar';
import Layout1 from './Layout1';
import Layout2 from './Layout2';
import Layout3 from './Layout3';
import './Layout.css'; // 스타일 파일을 임포트합니다.

function Layout() {
  return (
    <div className="layout">
      <div className="logo-search-container">
        <Logo1 className="logo1" /> {/* 로고 이미지에 "logo1" 클래스 추가 */}
        <SearchBar /> {/* 검색창 컴포넌트 추가 */}
        <button className="register-button">물품등록</button> {/* 물품등록 버튼 추가 */}
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