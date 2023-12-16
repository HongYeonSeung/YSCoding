import React, {useEffect, useState} from 'react';
import ProductCard from './ProductCard';
import './CurrentlyBiddingFinish.css';
import axios from "axios";

//입찰중인 페이지
const CurrentlyBiddingFinish = ({LoginId}) => {
    const [currentlyBiddingFinishProducts, setCurrentlyBiddingFinishProducts] = useState();

    useEffect(() => {
        if (LoginId) {
            axios.get(`/api/currentlyBiddingFinishProducts/${LoginId}`)
                .then(response => {
                    setCurrentlyBiddingFinishProducts(response.data);
                })
                .catch(error => {
                    console.error('데이터 가져오기 에러:', error);
                });
        }
    }, [LoginId]);
    return (
        <div className="currently-bidding-container">
            <hr/>
            {!currentlyBiddingFinishProducts && <div className="myPage_notProduct">입찰 완료한 상품이 없습니다</div>}
            {currentlyBiddingFinishProducts && <div className="product-list-horizontal">
                {currentlyBiddingFinishProducts.map((product, index) => (
                    <ProductCard key={index} product={product}/>
                ))}
            </div>}
            <hr/>
        </div>
    );
}

export default CurrentlyBiddingFinish;
