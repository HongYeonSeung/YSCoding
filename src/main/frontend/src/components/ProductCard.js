import React from 'react';
import './ProductCard.css';
import {Link} from "react-router-dom";

const ProductCard = ({product, showButton}) => {
    const {productName, startingPrice, currentPrice, biddersCount, views, imagePath, time} = product;

    return (
        <div className="product-card">
            <img className="product-img" src={`/api/images/${imagePath}`} alt={productName}/>
            <div className="views-container">
                <div className="product-views"><img src="/img/visibility_icon.png"/>{views}</div>
                <div className="product-bids"><img src="/img/group_icon.png"/>{biddersCount}</div>
            </div>
            <div className="product-content">
                <h3 className="product-title">{productName}</h3>
                <div className="underline"></div>
                {startingPrice && <p className="product-starting-price">시작가: {startingPrice}원</p>}
                {currentPrice && <p className="product-current-price">현재가: {currentPrice}원</p>}
                {/*{time && <p className="product-time">남은 시간: {time}</p>}*/}
                <Link to={`/product/${product.id}`} className="product_link">
                    상세보기
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
