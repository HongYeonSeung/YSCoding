import React from 'react';
import ProductCard from './ProductCard';
import './CurrentlyBidding.css';

class CurrentlyBidding extends React.Component {
    render() {
        // 실제 데이터로 교체하세요
        const currentlyBiddingProducts = [
            {
                title: '삼성냉장고',
                description: '이 상품은 현재 입찰 중인 상품입니다.',
                startingPrice: 6300000,
                currentPrice: 8500000,
                bids: 5,
                views: 120,
                imageUrl: '/images/product3.png', // 실제 이미지 URL로 교체하세요
            },
            {
                title: 'LG 그램',
                description: '이 상품은 현재 입찰 중인 상품입니다.',
                startingPrice: 1300000,
                currentPrice: 1650000,
                bids: 8,
                views: 90,
                imageUrl: '/images/product4.png', // 실제 이미지 URL로 교체하세요
            },
            {
                title: 'LG TV',
                description: '이 상품은 유찰된 상품입니다.',
                startingPrice: 4570000,
                currentPrice: 5230000, // 유찰된 경우 현재가는 0으로 표시
                bids: 3,
                views: 80,
                imageUrl: '/images/product5.png', // 실제 이미지 URL로 교체하세요
            }
            // 필요한 만큼 더 많은 상품을 추가하세요
        ];

        return (
            <div className="currently-bidding-container">
                <hr />
                <div className="product-list-horizontal">
                    {currentlyBiddingProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>
        );
    }
}

export default CurrentlyBidding;
