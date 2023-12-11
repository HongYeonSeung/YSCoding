import React from 'react';
import { Link } from 'react-router-dom';
import './Layout2.css';

const imagePaths = [
    'cate1.png',
    'cate2.png',
    'cate3.png',
    'cate10.png',
    'cate5.png',
    'cate6.png',
    'cate7.png',
    'cate8.png',
    'cate9.png',
    'cate4.png'
];

const categories = [
    '의류', '뷰티', '유아', '주방', '가전디지털',
    '스포츠', '자동차용품', '완구취미', '도서', '기타'
];

function Layout2() {
    const buttonData = categories.map((category, index) => ({
        id: index + 1,
        label: category,
    }));

    return (
        <div className="layout2">
            <div className="category-header">
                <span className="category-text">카테고리</span>
            </div>
            <div className="button-container">
                {buttonData.map((button, index) => (
                    <div key={button.id} className="button-container-item">
                        <Link to={`/category/${button.label}`}>
                            <button className="round-button">
                                <img
                                    src={`/${imagePaths[index]}`}
                                    alt={`Category ${button.label}`}
                                />
                                <p className="button-label">{button.label}</p>
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Layout2;
