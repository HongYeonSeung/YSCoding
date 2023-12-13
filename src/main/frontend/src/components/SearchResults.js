// 파일명: SearchResults.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';
import SearchBar from './SearchBar';

function SearchResults() {
    const { keyword } = useParams();
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`/api/search-not-expired?keyword=${keyword}&page=${currentPage - 1}`);
                console.log('Response Data:', response.data); // 전체 응답 데이터 확인
                console.log('Content:', response.data.content.length); // content 확인
                setResults(response.data.content);
                setTotalPages(response.data.totalPages);
                setNoResults(response.data.content.length === 0);
            } catch (error) {
                console.error('검색 결과를 불러오는 중 오류 발생:', error);
            }
        };

        fetchSearchResults();
    }, [keyword, currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const renderSearchHeader = () => {
        if (keyword) {
            return (
                <div>
                    <SearchBar style={{ textAlign: 'center' }} />

                    <div className="search-header">
                        <p className="popular-products-text">"{keyword}"에 대한 검색 결과</p>
                    </div>
                </div>
            );
        }
        return null;
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
        <div className="layout3">
            {renderSearchHeader()}
            <div className="rectangle">
                {noResults ? (
                    <p className="no-results-message">검색 결과가 없습니다.</p>
                ) : (
                    <div className="product_container">
                        {results && results.map((product) => (
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
                {[...Array(totalPages).keys()].map((page, index) => (
                    <button key={index} onClick={() => handlePageChange(page + 1)}>
                        {page + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;
