// MyPage.js
import React, { useEffect, useState } from 'react';
import CurrentlySelling from './CurrentlySelling';
import CurrentlyBidding from './CurrentlyBidding';
import UnsuccessfulBids from './UnsuccessfulBids';
import axios from "axios";
import CurrentlyBiddingFinish from "./CurrentlyBiddingFinish";

const MyPage = () => {
    // 토큰으로 아이디 검증
    const [loginId,setloginId] = useState();
    const [token] = useState(localStorage.getItem('token')); // 로컬 스토리지에서 토큰을 가져옴

    useEffect(() => {
        const tokenToLogin = async () => {
            try {
                if (token) {  // 토큰이 존재하는 경우에만 실행
                    const response = await axios.get(`/api/getUsernameFromToken/${token}`);
                    setloginId(response.data);
                }
            } catch (error) {
                console.error('토큰 아이디 검증 에러:', error);
            }
        };
        tokenToLogin();
    }, []);
    return (
        <div>
            <h2>판매 상품 리스트</h2>
            <CurrentlySelling LoginId={loginId}/>

            <h2>현재 입찰중인 상품</h2>
            <CurrentlyBidding LoginId={loginId}/>
            <h2>입찰 완료 상품</h2>
            <CurrentlyBiddingFinish LoginId={loginId}/>

            <h2>유찰 상품</h2>
            <UnsuccessfulBids LoginId={loginId}/>
        </div>
    );
}

export default MyPage;
