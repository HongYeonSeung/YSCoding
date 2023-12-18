import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './CurrentlySelling.css';
import axios from 'axios';


//판매중인 상품 페이지
const CurrentlySelling = ({ LoginId }) => {


    const [currentlySellingProducts, setCurrentlySellingProducts] = useState();


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
            {!currentlySellingProducts && <div className="myPage_notProduct">판매 상품이 없습니다</div>}
            {currentlySellingProducts && (
                <div className="product-list-horizontal">
                    {currentlySellingProducts
                        .slice() // 배열을 복사하여 원본 배열을 변경하지 않음
                        .reverse() // 배열을 역순으로 정렬
                        .map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                </div>
            )}
            <hr/>
        </div>
    );
};


export default CurrentlySelling;
