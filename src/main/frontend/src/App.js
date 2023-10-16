//import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState,Component} from 'react';
import axios from 'axios';
import Main from './component/Main';
import Login from "./component/Login";
import Mypage from "./component/Mypage";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


const App = () => {

  const [hello, setHello] = useState('연동 X')

  useEffect(() => {
      console.log("화살표함수 테스트")
    axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
  }, []);

    return (
        <div>
            <hr></hr>
            <Router>
                <header>
                    <div className="header-left"></div>
                    <div className="header-right" >
                        <Link to="/">
                            <Button variant="primary" className="normal-button">Home</Button>
                        </Link>
                        <Link to="/page1">
                            <Button variant="primary" className="normal-button">로그인</Button>
                        </Link>
                        <Link to="/page2">
                            <Button variant="primary" className="normal-button">내 정보</Button>
                        </Link>
                    </div>

                </header>
                <hr />
                <main>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/page1" element={<Login />} />
                        <Route path="/page2" element={<Mypage />} />
                    </Routes>
                </main>
            </Router>
            <hr></hr>
            백엔드 연동 테스트: {hello}
        </div>
    );
}

export default App;
