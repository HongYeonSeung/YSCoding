import React,{useEffect, useState}  from 'react';
import ProductCard from './ProductCard';
import './CurrentlyBidding.css';
import axios from "axios";

//입찰중인 페이지
const CurrentlyBidding = ({ LoginId }) => {
    const [currentlyBiddingProducts, setCurrentlyBiddingProducts] = useState([]);

    useEffect(() => {
        if (LoginId) {
            axios.get(`/api/currentlyBiddingProducts/${LoginId}`)
                .then(response => {
                    setCurrentlyBiddingProducts(response.data);
                })
                .catch(error => {
                    console.error('데이터 가져오기 에러:', error);
                });
        }
    }, [LoginId]);
        return (
            <div className="currently-bidding-container">
                <hr />
                <div className="product-list-horizontal">
                    {currentlyBiddingProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>
        );
}

export default CurrentlyBidding;
