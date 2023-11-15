import React, {useEffect, useState} from 'react';
import './Layout3.css';
import axios from "axios";
import { Link } from 'react-router-dom';

function Layout3() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // 서버로부터 상품 목록을 가져오는 함수
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products'); // 백엔드에서 상품 목록을 제공하는 API 엔드포인트
                setProducts(response.data);
            } catch (error) {
                console.error('상품 목록을 불러오는 중 에러 발생:', error);
            }
        };

        fetchProducts(); // 함수 호출

    }, []); // useEffect를 한 번만 실행하도록 빈 배열을 두 번째 인자로 전달

    return (
        <div className="layout3">
            <div className="popular-products">
                <p className="popular-products-text">판매 상품</p>
            </div>
            <div className="rectangle">
                <div className="product_container">
                    {products.map((product) => (
                        <div key={product.id} className="product">
                            <div className="product_box">
                                <div className="product_img_div">
                                    <img src={`/api/images/${product.imagePath}`} className="product_img" alt={product.productName}/>
                                </div>
                                <p className="product_title"> {product.productName}</p>
                                <p className="product_des">{product.content}</p>
                                <div className="product_mon">현재 입찰가 : ￦{product.startingPrice}</div>
                                <div className="product_link_div">
                                    <Link to={`/product/${product.id}`} className="product_link">
                                        상세보기
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Layout3;