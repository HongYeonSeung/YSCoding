import React, { useState,useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './ProductCreate.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom"; // 로그인 스타일 파일을 임포트합니다.


function ProductCreate() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        productName: '', // 추가: productName 초기화
        startingPrice: '', // 추가: startingPrice 초기화
        image:'',
        category:'',
        content:'',
    });

    // 토큰으로 아이디 검증
    const [loginId,setloginId] = useState();
    const [token] = useState(localStorage.getItem('token')); // 로컬 스토리지에서 토큰을 가져옴
    useEffect(() => {
        const tokenToLogin = async () => {
            try {
                if (token) {  // 토큰이 존재하는 경우에만 실행
                    const response = await axios.get(`api/getUsernameFromToken/${token}`);
                    setloginId(response.data);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        tokenToLogin();
    }, [token]);


    const handleInputChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageUpload = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 필수 필드에 대한 유효성 검사 추가
        if (!product.productName || !product.startingPrice || !product.image || !product.category) {
            // 에러 메시지 또는 토스트 표시
            alert("모든 필드를 작성하세요!");
            return;
        }

        // 확인 메시지 표시
        const confirmResult = window.confirm("상품을 등록하시겠습니까?");
        if (!confirmResult) {
            // 사용자가 취소한 경우
            return;
        }

        const formDataToSend = new FormData();

        for (const key in product) {
            formDataToSend.append(key, product[key]);
        }

        formDataToSend.append('loginId', loginId);
        console.log('아이디:',loginId);

        try {
            // axios를 사용하여 서버로 데이터 전송
            const response = await axios.post('/api/product-create', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // 성공 시 수행할 작업
            console.log('서버 응답:', response);
            alert("상품등록에 성공하였습니다");
            navigate('/');

        } catch (error) {
            // 실패 시 수행할 작업
            console.error('에러 발생:', error);
        }
    };


    return (
        <div className="product-create-container">
            <form onSubmit={handleSubmit}>
                <div className="product-create-form">
                    <h2>상품 등록</h2>
                    <div className="image-upload">
                        <h2>상품 이미지</h2>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
                    <div className="product-details">
                        <h2>상품 카테고리</h2>
                        <select name="category" className="box" id="domain-list" onChange={handleInputChange}>
                            <option value="">카테고리를 선택해주세요</option>
                            <option value="의류">의류</option>
                            <option value="뷰티">화장품/뷰티</option>
                            <option value="유아">유아용품</option>
                            <option value="주방">주방용품</option>
                            <option value="가전디지털">가전디지털 용품</option>
                            <option value="스포츠">스포츠 용품</option>
                            <option value="자동차용품">자동차 용품</option>
                            <option value="완구취미">완구/취미</option>
                            <option value="도서">도서</option>
                            <option value="기타">기타</option>

                        </select>
                        <h2>상품 이름</h2>
                        <input
                            type="text"
                            name="productName"
                            onChange={handleInputChange}
                        />
                        <h2>시작 가격</h2>
                        <input
                            type="number"
                            name="startingPrice"
                            onChange={handleInputChange}
                        />
                        <h2>상품 설명</h2>
                        <textarea
                            name="content"
                            onChange={handleInputChange}
                        />

                    </div>
                    <button type="submit">
                        등록
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductCreate;