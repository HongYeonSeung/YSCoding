// UnsuccessfulBids.js
import React,{useEffect, useState}  from 'react';
import ProductCard from './ProductCard';
import './UnsuccessfulBids.css';

class UnsuccessfulBids extends React.Component {
    render() {
        // 실제 데이터로 교체하세요
        const unsuccessfulBidsProducts = [
            {
                title: '다이슨 청소기',
                description: '이 상품은 유찰된 상품입니다.',
                startingPrice: 335000,
                currentPrice: 470000,
                bids: 7,
                views: 60,
                imageUrl: '/images/product6.png', // 실제 이미지 URL로 교체하세요
            },
            // 필요한 만큼 더 많은 상품을 추가하세요
        ];

        return (
            <div className="unsuccessful-bids-container">
                <hr />
                <div className="product-list-horizontal">
                    {unsuccessfulBidsProducts.map((product, index) => (
                        <ProductCard key={index} product={product} showButton={true} />
                    ))}
                </div>
            </div>
        );
    }
}

export default UnsuccessfulBids;
