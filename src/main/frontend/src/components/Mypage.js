// MyPage.js

import React from 'react';
import CurrentlySelling from './CurrentlySelling';
import CurrentlyBidding from './CurrentlyBidding';
import UnsuccessfulBids from './UnsuccessfulBids';

const MyPage = () => {
    return (
        <div>
            <h2>현재 판매중인 상품</h2>
            <CurrentlySelling />

            <h2>현재 입찰중인 상품</h2>
            <CurrentlyBidding />

            <h2>유찰당한 상품</h2>
            <UnsuccessfulBids />
        </div>
    );
}

export default MyPage;
