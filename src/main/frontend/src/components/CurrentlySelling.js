// CurrentlySelling.js
import React from 'react';
import ProductCard from './ProductCard'; // ProductCard 컴포넌트가 있다고 가정합니다.
import './CurrentlySelling.css';

class CurrentlySelling extends React.Component {
    render() {
        // 실제 데이터로 교체하세요
        const currentlySellingProducts = [
            {
                title: '닌텐도 스위치',
                description: '이 상품은 판매 중인 상품입니다.',
                startingPrice: 30000,
                currentPrice: 50000,
                bids: 10,
                views: 50,
                imageUrl: '/images/product1.png', // 실제 이미지 URL로 교체하세요
            },
            {
                title: '롤렉스',
                description: '이 상품은 판매 중인 상품입니다.',
                startingPrice: 2550000,
                currentPrice: 3300000,
                bids: 5,
                views: 30,
                imageUrl: '/images/product2.png', // 실제 이미지 URL로 교체하세요
            },
            // 필요한 만큼 더 많은 상품을 추가하세요
        ];

        return (
            <div className="currently-selling-container">
                <hr />
                <div className="product-list-horizontal">
                    {currentlySellingProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>
        );
    }
}

export default CurrentlySelling;
