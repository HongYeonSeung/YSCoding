import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailPage.css';
import ConfirmationModal from './ConfirmationModal';

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
        }, 100);

        return () => clearInterval(id);
    }, [endTime]); // endTime이 변경될 때마다 useEffect가 다시 실행됨

    return (
        <span>
      {timeRemaining.hours}시간 {timeRemaining.minutes}분 {timeRemaining.seconds}초
    </span>
    );
};

function ProductDetailPage() {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState({});
    const [bidAmount, setBidAmount] = useState('');
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [endTime, setEndTime] = useState(null);

    // 토큰으로 아이디 검증
    const [loginId, setLoginId] = useState();
    const [token] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const tokenToLogin = async () => {
            try {
                if (token) {
                    const response = await axios.get(`/api/getUsernameFromToken/${token}`);
                    setLoginId(response.data);
                }
            } catch (error) {
                console.error('토큰 아이디 검증 에러:', error);
            }
        };
        tokenToLogin();
    }, [token]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                if (!params.id) {
                    return;
                }

                const response = await axios.get(`/api/products/${params.id}`);
                await axios.get(`/api/productsView/${params.id}`);
                setProduct(response.data);

                // endTime 설정
                setEndTime(response.data.timeAfter24Hours);
            } catch (error) {
                console.error('상품 상세 정보를 불러오는 중 에러 발생:', error);
            }
        };

        fetchProductDetails();
    }, [params.id]);

    const handleBidClick = (event) => {
        event.preventDefault();

        if (loginId == null) {
            alert('로그인 후 입찰해 주세요.');
        } else {
            // 모달 열기
            setConfirmationModalOpen(true);
        }
    };

    const handleConfirmation = () => {
        // 모달 닫기
        setConfirmationModalOpen(false);

        // 여기서 진짜로 보내야 할 로직을 수행
        console.log('입찰 금액:', bidAmount, loginId, params.id);
        const data = {
            bidAmount: bidAmount,
            loginId: loginId,
        };

        axios
            .post(`/api/ProductBuy/${params.id}`, data)
            .then((response) => {
                // 성공적으로 처리된 경우에 할 일
                console.log('응답 데이터:', response.data);
            })
            .catch((error) => {
                // 에러가 발생한 경우에 할 일
                alert(error.response.data);
            })
            .finally(() => {
                // 새로고침
                window.location.reload();
            });
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

    const formatCurrency = (amount) => {
        if (amount != null) {
            return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return '';
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
                    <div className="category_text_list">카테고리 > {product.category}</div>
                    <h2>상품 이름: {product.productName}</h2>
                    <div className="list">판매자 ID : {product.loginId}</div>
                    <div className="list">상품 설명 : {product.content}</div>
                    <div className="list">조회수 : {product.views}</div>
                    <div className="list">입찰 된 횟수 : {product.biddersCount}</div>
                    <div className="list">시작 입찰가: {formatCurrency(product.startingPrice)}원</div>
                    <div className="list">현재 입찰가: {formatCurrency(product.currentPrice)}원</div>
                    <div className="list">{product.buyId && `최고 입찰자: ${product.buyId}`}</div>
                    <div className="list">남은 시간 : <CountdownTimer endTime={endTime} /></div>
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
