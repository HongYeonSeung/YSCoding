// UnsuccessfulBids.js
import React, {useEffect, useState} from 'react';
import ProductCard from './ProductCard';
import './UnsuccessfulBids.css';

//유찰당한 상품
const UnsuccessfulBids = ({LoginId}) => {
    const [unsuccessfulBidsProducts, setUnsuccessfulBidsProducts] = useState([]);


    // 실제 데이터로 교체하세요

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
