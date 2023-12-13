// categoryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './CategoryPage.css';
import SearchBar from "./SearchBar";

const CategoryPage = () => {
    const [categoryResults, setCategoryResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const { category } = useParams();

    const fetchCategoryResults = async () => {
        try {
            const response = await axios.get(`/api/category/${category}?page=${currentPage - 1}`);
            setCategoryResults(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('카테고리 결과를 불러오는 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        fetchCategoryResults();
    }, [category, currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return `${description.substring(0, maxLength)}...`;
        }
        return description;
    };

    const formatCurrency = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <div>
            <SearchBar />
            <h2>카테고리 > {category}</h2>
            {categoryResults.length === 0 ? (
                <p>카테고리 결과가 없습니다.</p>
            ) : (
                <div className="product_container">
                    {categoryResults.map((product) => (
                        <div key={product.id} className="product">
                            <div className="product_box">
                                <div className="product_img_div">
                                    <img src={`/api/images/${product.imagePath}`} className="product_img" alt={product.productName} />
                                </div>
                                <p className="product_title"> {product.productName}</p>
                                <p className="product_des">{truncateDescription(product.content, 30)}</p>
                                <div className="product_mon">시작 입찰가 : {formatCurrency(product.startingPrice)}원</div>
                                <div className="product_mon2">현재 입찰가 : {formatCurrency(product.currentPrice)}원</div>
                                <div className="product_link_div">
                                    <Link to={`/product/${product.id}`} className="product_link">
                                        입찰하기
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="pagination-container">
                {[...Array(totalPages).keys()].map((page, index) => (
                    <button key={index} onClick={() => handlePageChange(page + 1)}>
                        {page + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
