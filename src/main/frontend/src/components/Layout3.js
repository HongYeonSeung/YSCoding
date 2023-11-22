import React, {useEffect, useState} from 'react';
import './Layout3.css';
import axios from "axios";
import { Link } from 'react-router-dom';

function Layout3() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수를 저장하기 위한 상태 추가

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/products?page=${currentPage - 1}`);
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages); // 총 페이지 수를 상태에 저장
            } catch (error) {
                console.error('상품 목록을 불러오는 중 에러 발생:', error);
            }
        };

        fetchProducts();
    }, [currentPage]); // currentPage가 변경될 때마다 useEffect를 실행

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


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
                                        입찰하기
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {[...Array(totalPages).keys()].map((page, index) => ( // totalPages 상태 사용
                    <button key={index} onClick={() => handlePageChange(page + 1)}>
                        {page + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Layout3;