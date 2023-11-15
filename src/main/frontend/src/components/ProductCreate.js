import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductCreate.css';
import axios from 'axios';

function ProductCreate() {
    const [product, setProduct] = useState({
        productName: '', // 추가: productName 초기화
        startingPrice: '', // 추가: startingPrice 초기화
        image:'',
    });


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

        //필수 필드에 대한 유효성 검사 추가
        if (!product.productName || !product.startingPrice || !product.image) {
            // 에러 메시지 또는 토스트 표시
            // toast.error('모든 필드를 작성하세요.');
            alert("모든 필드를 작성하세요!")
            return;
        }

        const formDataToSend = new FormData();

        for (const key in product) {
            formDataToSend.append(key, product[key]);
        }
        // console.log('상품 이미지:', product.image);
        // console.log('상품 이름:', product.productName);
        // console.log('시작 가격:', product.startingPrice);

        try {
            // axios를 사용하여 서버로 데이터 전송
            const response = await axios.post('/api/product-create', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // 성공 시 수행할 작업
            console.log('서버 응답:', response);
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
                        <h2>상품 이미지:</h2>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageUpload}

                        />
                    </div>
                    <div className="product-details">
                        <h2>상품 이름:</h2>
                        <input
                            type="text"
                            name="productName"
                            onChange={handleInputChange}
                        />
                        <h2>시작 가격:</h2>
                        <input
                            type="number"
                            name="startingPrice"
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