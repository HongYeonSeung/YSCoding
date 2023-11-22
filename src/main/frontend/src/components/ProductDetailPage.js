import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

import './ProductDetailPage.css';
import {useUser} from "./UserContext";
import ConfirmationModal from './ConfirmationModal'; // 모달 컴포넌트 import


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
    const navigate = useNavigate();
    const { loginId } = useUser("");
    const params = useParams();
    const [product, setProduct] = useState({});
    const [bidAmount, setBidAmount] = useState('');
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);



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

    const handleBidClick = (event) => {
        event.preventDefault();


        // 여기서 bidAmount 변수에 입력된 값이 있습니다.


        // 모달 열기
        setConfirmationModalOpen(true);

        // 추가로 할 일을 여기에 작성하십시오.



    };

    const handleConfirmation = () => {
        // 여기서 진짜로 보내야 할 로직을 수행
        console.log('입찰 금액:', bidAmount,loginId);

        axios.post('/api/ProductBuy', { bidAmount, loginId })
            .then(response => {
                // 성공적으로 처리된 경우에 할 일
                console.log('응답 데이터:', response.data);
            })
            .catch(error => {
                // 에러가 발생한 경우에 할 일
                console.error('에러 발생:', error);
            });
        
        // 모달 닫기
        setConfirmationModalOpen(false);
    };

    const handleCancelConfirmation = () => {
        // 모달 닫기
        setConfirmationModalOpen(false);
        window.location.reload();
    };


    const handleInputChange = (event) => {
        // 입력값이 숫자인지 확인하는 정규표현식
        const regex = /^[0-9\b]+$/;

        // 입력값이 숫자이거나 빈 문자열인 경우에만 상태 업데이트
        if (event.target.value === '' || regex.test(event.target.value)) {
            setBidAmount(event.target.value);
        }
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
                    <div className="list">시작 입찰가: {product.startingPrice}원</div>
                    <div className="list">현재 입찰가: {product.currentPrice}원</div>
                    <div className="list">남은 시간 : <CountdownTimer endTime={product.timeAfter24Hours} /></div>
                </div>
                <div className="product-detail-container-button-container">
                    <form className='bidding_form'>
                        <input
                            className='bidding_form_input'
                            type='text'
                            value={bidAmount}
                            onChange={handleInputChange}
                            placeholder='입찰 금액을 입력하세요'
                        />
                        <button type='submit' onClick={handleBidClick}>입찰하기</button>
                    </form>
                </div>
            </div>
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={handleCancelConfirmation}
                onConfirm={handleConfirmation}
                bidAmount={`${bidAmount}`}
            />
        </div>
    );
}

export default ProductDetailPage;
