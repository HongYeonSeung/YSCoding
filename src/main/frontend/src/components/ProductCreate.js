import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductCreate.css';
import axios from 'axios';

function ProductCreate() {
    const [product, setProduct] = useState({
        sellerId: '',
        buyerId: '',
        image: null,
        productName: '',
        startingPrice: 0,
        desiredBidPrice: 0,
    });

    const [images, setImages] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleImageUpload = (e) => {
        const files = e.target.files;
        const imageArray = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imageArray.push(e.target.result);
                if (imageArray.length === files.length) {
                    setImages(imageArray);
                }
            };
            reader.readAsDataURL(files[i]);
        }
        console.log(imageArray);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 데이터를 JSON 형식으로 변환
        const requestData = {
            sellerId: product.sellerId,
            buyerId: product.buyerId,
            image: product.image, // 이미지 배열
            productName: product.productName,
            startingPrice: product.startingPrice,
            desiredBidPrice: product.desiredBidPrice,
        };

        axios.post('/api/product-create', requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log('데이터를 서버로 보냈습니다.', response);
                // toast.success('제품이 성공적으로 등록되었습니다.');
            })
            .catch((error) => {
                console.error('데이터 전송 중 오류 발생:', error);
                // toast.error('데이터 전송 중 오류 발생');
            });
    };

    return (
        <div className="product-create-container">


            <div className="product-create-form">
                <h2>상품 등록</h2>
                <div className="image-upload">
                    <h2>상품 이미지:</h2>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleImageUpload}
                        multiple
                    />
                    {images.length > 0 && (
                        <div className="image-preview">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Uploaded ${index}`}
                                    className="preview-image"
                                    style={{ width: "400px", height: "450px" }}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="product-details">
                    <h2>판매자 키:</h2>
                    <input
                        type="text"
                        name="sellerId"
                        value={product.sellerId}
                        onChange={handleInputChange}
                    />
                    <h2>구매자 키:</h2>
                    <input
                        type="text"
                        name="buyerId"
                        value={product.buyerId}
                        onChange={handleInputChange}
                    />
                    <h2>상품 이름:</h2>
                    <input
                        type="text"
                        name="productName"
                        value={product.productName}
                        onChange={handleInputChange}
                    />
                    <h2>시작 가격:</h2>
                    <input
                        type="number"
                        name="startingPrice"
                        value={product.startingPrice}
                        onChange={handleInputChange}
                    />
                    <h2>희망 입찰 가격:</h2>
                    <input
                        type="number"
                        name="desiredBidPrice"
                        value={product.desiredBidPrice}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>
                    등록
                </button>
            </div>
        </div>
    );
}

export default ProductCreate;