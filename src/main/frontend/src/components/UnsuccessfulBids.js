// UnsuccessfulBids.js
import React, {useEffect, useState} from 'react';
import ProductCard from './ProductCard';
import './UnsuccessfulBids.css';
import axios from "axios";

//유찰당한 상품
const UnsuccessfulBids = ({LoginId}) => {
    const [unsuccessfulBidsProducts, setUnsuccessfulBidsProducts] = useState([]);


    // 실제 데이터로 교체하세요
    useEffect(() => {
        if (LoginId) {
            axios.get(`/api/unsuccessfulBidsProducts/${LoginId}`)
                .then(response => {
                    setUnsuccessfulBidsProducts(response.data);
                })
                .catch(error => {
                    console.error('데이터 가져오기 에러:', error);
                });
        }
    }, [LoginId]);

    return (
        <div className="unsuccessful-bids-container">
            <hr/>
            <div className="product-list-horizontal">
                {unsuccessfulBidsProducts.map((product, index) => (
                    <ProductCard key={index} product={product} showButton={true}/>
                ))}
            </div>
        </div>
    );
}

export default UnsuccessfulBids;
