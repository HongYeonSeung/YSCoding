import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import './ProductDetailPage.css';
import ConfirmationModal from './ConfirmationModal';
import CountdownTimer from "./CountdownTimer";
import DeleteModal from "./DeleteModal";


function ProductDetailPage() {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState({});
    const [bidAmount, setBidAmount] = useState('');
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [endTime, setEndTime] = useState(null);
    const currentDate_log = new Date();
    const backendTimeDate = new Date(product.timeAfter24Hours);
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);


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
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [params.id]);


    //어드민 체킹
    if (loginId) {
        axios.get(`/api/adminCheck/${loginId}`)
            .then(response => {
                setAdmin(response.data);
                console.log(response.data)
                if (response.data) {
                    //어드민이 권한 있음 
                }
            })
            .catch(error => {
                console.error('어드민 여부 확인 중 오류 발생:', error);
            });
    }

    const handleBidClick = (event) => {
        event.preventDefault();

        if (loginId == null) {
            alert('로그인 후 입찰해 주세요.');
        } else if (loginId === product.loginId) {
            // 상품 등록자와 로그인한 ID가 같은 경우 입찰 불가 메시지 표시
            alert('본인이 등록한 상품은 입찰할 수 없습니다.');
        } else {
            // 값이 공백이거나 현재 입찰가보다 낮은 경우 확인 메시지 표시
            if (!bidAmount.trim()) {
                alert('입찰 금액을 입력하세요.');
            } else {
                // 모달 열기
                setConfirmationModalOpen(true);
            }
        }
    };

    const handleDeleteConfirm=()=>{
        setDeleteModalOpen(false);
        console.log("모달 메소드 전송")
        axios.post(`/api/ProductDelete/${params.id}`)
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

    }

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


    //입찰 모달 취소
    const handleCancelConfirmation = () => {
        // 모달 닫기
        alert("입찰을 취소하였습니다")
        setConfirmationModalOpen(false);
        window.location.reload();
    };

    //삭제 모달 취소
    const handleCancelDeleteModal = () => {
        alert("삭제를 취소하였습니다")
        setDeleteModalOpen(false);
        window.location.reload();
    }

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

    const formatDescriptionWithLineBreaks = (description) => {
        if (!description) {
            return '';
        }

        // 개행 문자를 HTML 줄 바꿈 태그로 대체
        const formattedDescription = description.replace(/\n/g, '<br/>');

        return (
            <div>
                <p>{/* 빈 줄을 만들기 위한 p 태그 */}
                    <br/>
                    {/* 상품 설명 */}
                    <span dangerouslySetInnerHTML={{__html: formattedDescription}}/>
                </p>
            </div>
        );
    };

    const adminDeleteClick = () => {
        setDeleteModalOpen(true);
        console.log("삭제")
    }

    if (loading) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className="product-detail-container">
            <div className={`left-section ${!(backendTimeDate > currentDate_log) ? 'disabled' : ''}`}>
                <div className="large-rectangle">
                    {product.imagePath && <img src={`/api/images/${product.imagePath}`} alt={product.productName}/>}
                </div>
            </div>
            <div className={`right-section ${!(backendTimeDate > currentDate_log) ? 'disabled' : ''}`}>
                <div className="product-info">
                    <div className="category_text_list">카테고리 > {product.category}</div>
                    <h2>상품 이름: {product.productName}</h2>
                    <div className="list">판매자 ID : {product.loginId}</div>
                    <div className="list" style={{backgroundColor: '#F7F7F7'}}>
                        상품 설명 : {formatDescriptionWithLineBreaks(product.content)}
                    </div>
                    <div className="list">조회수 : {product.views}</div>
                    {}
                    <div className="list">입찰 횟수 : {product.biddersCount}</div>
                    <div className="list">시작 입찰가: {formatCurrency(product.startingPrice)}원</div>
                    <div className="list">현재 입찰가: {formatCurrency(product.currentPrice)}원</div>
                    <div className="list">{product.buyId && `최고 입찰자: ${product.buyId}`}</div>
                    <div className="list">남은 시간 : <CountdownTimer endTime={endTime}/></div>
                </div>
                <div id={`product-detail-container-button-container`}>
                    <form className='bidding_form'>
                        <input
                            className='bidding_form_input'
                            type='text'
                            value={bidAmount}
                            onChange={handleInputChange}
                            placeholder='입찰 금액을 입력하세요'
                        />
                        <button type='submit' onClick={handleBidClick} disabled={!(backendTimeDate > currentDate_log)}>
                            입찰하기
                        </button>
                    </form>
                </div>
            </div>

            {!(backendTimeDate > currentDate_log) && <div className="sold-out-text">판 매 완 료</div>}
            {admin && <div className="product-detail-admin"><img src="/img/delete.png" onClick={adminDeleteClick}/></div>}
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={handleCancelConfirmation}
                onConfirm={handleConfirmation}
                bidAmount={`${bidAmount}`}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleCancelDeleteModal}
                onConfirm={handleDeleteConfirm}
                productName={product.productName}
            />
        </div>

    );
}

export default ProductDetailPage;
