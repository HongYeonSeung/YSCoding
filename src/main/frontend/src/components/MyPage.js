import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  './MyPage.css';
import axios from "axios";

const MyPage = () => {
    const [token, setToken] = useState('');
    const [data, setData] = useState('');
    const username = "test";


    // 토큰으로 아이디 검증
    const generateToken = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`api/getUsernameFromToken/${token}`);
            console.log(response.data);
        } catch (error) {
            console.error('토큰 생성 중 오류 발생:', error);
        }
    };


    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('/someProtectedEndpoint', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
    //             setData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //
    //     fetchData();
    // }, [token]);

    return (
        <div>
            <button onClick={generateToken}>Generate Token</button>
            {/*<p>Token: {token}</p>*/}
            {/*<p>Data: {data}</p>*/}

        </div>
    );
}

export default MyPage;
