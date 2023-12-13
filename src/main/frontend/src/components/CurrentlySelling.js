import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './CurrentlySelling.css';
import axios from 'axios';

//판매중인 상품 페이지
const CurrentlySelling = ({ LoginId }) => {
    const [currentlySellingProducts, setCurrentlySellingProducts] = useState([]);


    useEffect(() => {
        if (LoginId) {
            axios.get(`/api/currentlySellingProducts/${LoginId}`)
                .then(response => {
                    setCurrentlySellingProducts(response.data);
                })
                .catch(error => {
                    console.error('데이터 가져오기 에러:', error);
                });
        }
    }, [LoginId]);


    return (
        <div className="currently-selling-container">
            <hr />
            <div className="product-list-horizontal">
                {currentlySellingProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
            <div></div>
        </div>
    );
};

export default CurrentlySelling;
