// ProductDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './ProductDetailPage.css';

function ProductDetailPage() {
    const params = useParams();

    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                if (!params.id) {
                    console.log(params.id);
                    return;
                }
                const response = await axios.get(`/api/products/${params.id}`);
                setProduct(response.data);
                console.log(product);
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
                    <p>시작 가격: 10000원</p>
                    <p>현재 입찰가: ￦{product.startingPrice}</p>
                    <p>상품 설명 : {product.content}</p>
                </div>
                <div className="button-container">
                    <button onClick={handleBidClick}>입찰하기</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
