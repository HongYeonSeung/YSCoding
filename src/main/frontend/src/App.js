import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ActionBar from './components/ActionBar';
import Layout from './components/Layout';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import Layout2 from './components/Layout2';
import ProductPage from './components/ProductPage';
import ProductCreate from './components/ProductCreate';
import ProfilePage from './components/ProfilePage';
import ProductDetailPage from './components/ProductDetailPage';
import MyPage from './components/Mypage';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import CategoryPage from './components/CategoryPage';

const App = () => {
  const [hello, setHello] = useState('연동 X');

  useEffect(() => {
    console.log("화살표 함수 테스트");
    axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error));
  }, []);


  return (
      <Router>
        <div>
          <ActionBar />

            <Routes>
              <Route path="/" element={<Layout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path='*' element={<div className='error'>에러 페이지</div>} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/" component={Layout2} />
              <Route path="/product-create" element={<ProductCreate />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/ProfilePage" element={<ProfilePage />} />

              <Route path="/search/:keyword" element={<SearchResults />} />
              <Route path="/myPage" element={<MyPage/>} />
            </Routes>

          <hr></hr>
          백엔드 연동 테스트: {hello}
          {/* ProductCreate 컴포넌트 추가 */}
          <hr/>
          <a style={{color:"black"}} href="https://www.flaticon.com/kr/free-icons/-" title="비디오 조회수 아이콘">비디오 조회수 아이콘  제작자: Fahrul Saputra - Flaticon</a>
        </div>
      </Router>
  );
}

export default App;


// 이미지 출처