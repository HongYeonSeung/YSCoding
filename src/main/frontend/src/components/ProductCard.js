import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, showButton }) => {
    const { productName, startingPrice, currentPrice, biddersCount, views, imagePath, time } = product;

    return (
        <div className="product-card">
            <img className="product-img" src={`/api/images/${imagePath}`}  alt={productName} />
            <div className="product-content">
                <h3 className="product-title">{productName}</h3>
                <div className="underline"></div>
                {startingPrice && <p className="product-starting-price">시작가: {startingPrice}원</p>}
                {currentPrice && <p className="product-current-price">현재가: {currentPrice}원</p>}
                {biddersCount && <p className="product-bids">입찰 횟수: {biddersCount}</p>}
                {views && <p className="product-views">조회 수: {views}</p>}
                {/*{time && <p className="product-time">남은 시간: {time}</p>}*/}
                {showButton && <button className="rebid-button">재입찰 하러 가기</button>}
            </div>
        </div>
    );
};

export default ProductCard;
