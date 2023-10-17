import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Main from './component/Main';
import Login from './component/Login';
import Profile from './component/Profile';
import {Routes, Route, Router, BrowserRouter} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Header from './component/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
    const [hello, setHello] = useState('연동 X');

    useEffect(() => {
        console.log("화살표 함수 테스트");
        axios.get('/api/hello')
            .then(response => setHello(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <BrowserRouter>
                <Header></Header>
                <hr></hr>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/Profile' element={<Profile />} />
                    <Route path='*' element={<div className='error'>에러 페이지</div>} />
                </Routes>
            </BrowserRouter>
            <hr></hr>
            백엔드 연동 테스트: {hello}
        </div>
    );
}

export default App;
