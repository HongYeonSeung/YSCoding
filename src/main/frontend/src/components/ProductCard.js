// ProductCard.js
import React from 'react';
import './ProductCard.css';

class ProductCard extends React.Component {
    render() {
        const { title, description, startingPrice, currentPrice, bids, views, imageUrl,time } = this.props.product;

        return (
            <div className="product-card">
                <img className="product-img" src={imageUrl} alt={title} />
                <div className="product-content">
                    <h3 className="product-title">{title}</h3>
                    <div className="underline"></div>
                    {startingPrice && <p className="product-starting-price">시작가: {startingPrice}원</p>}
                    {currentPrice && <p className="product-current-price">현재가: {currentPrice}원</p>}
                    {bids && <p className="product-bids">입찰 횟수: {bids}</p>}
                    {views && <p className="product-views">조회 수: {views}</p>}
                    {time && <p className="product-views">남은 시간: {time}</p>}
                    {this.props.showButton && <button className="rebid-button">재입찰 하러 가기</button>}
                </div>
            </div>
        );
    }
}

export default ProductCard;
