import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './ProductDetailPage.css';

const CountdownTimer = ({ endTime }) => {
    const calculateTimeRemaining = () => {
        const now = new Date();
        const endTimeDate = new Date(endTime);
        const difference = endTimeDate - now;

        if (difference < 0) {
            return { hours: 0, minutes: 0, seconds: 0 };
        }

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
    };

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const id = setInterval(() => {
            const remaining = calculateTimeRemaining();
            setTimeRemaining(remaining);
        }, 1000);

        return () => clearInterval(id);
    }, [endTime]);

    return (
        <span>
      {timeRemaining.hours}시간 {timeRemaining.minutes}분 {timeRemaining.seconds}초
    </span>
    );
};

function ProductDetailPage() {
    const params = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                if (!params.id) {
                    return;
                }
                const response = await axios.get(`/api/products/${params.id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('상품 상세 정보를 불러오는 중 에러 발생:', error);
            }
        };
        fetchProductDetails();
    }, [params]);

    const handleBidClick = () => {
        alert('입찰되었습니다.');
    };

    return (
        <div className="product-detail-container">
            <div className="left-section">
                <div className="large-rectangle">
                    {product.imagePath && <img src={`/api/images/${product.imagePath}`} alt={product.productName} />}
                </div>
            </div>
            <div className="right-section">
                <div className="product-info">
                    <h2>상품 이름: {product.productName}</h2>
                    <div className="list">판매자 ID : {product.loginId}</div>
                    <div className="list">상품 설명 : {product.content}</div>
                    <div className="list">현재 입찰가: {product.startingPrice}원</div>
                    <div className="list">남은 시간 : <CountdownTimer endTime={product.timeAfter24Hours} /></div>
                </div>
                <div className="button-container">
                    <button onClick={handleBidClick}>입찰하기</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
