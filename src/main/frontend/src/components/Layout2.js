import React from 'react';
import { Link } from 'react-router-dom';
import './Layout2.css';

const imagePaths = [
    './img/cate1.png',
    './img/cate2.png',
    './img/cate3.png',
    './img/cate4.png',
    './img/cate5.png',
    './img/cate6.png',
    './img/cate7.png',
    './img/cate8.png',
    './img/cate9.png',
    './img/cate10.png'
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
                <div className="category-text">카테고리</div>
            </div>
            <div className="button-container">
                {buttonData.map((button, index) => (
                    <div key={button.id} className="button-container-item">
                        <Link to={`/category/${button.label}`}>
                            <button className="round-button">
                                <img className="category_img"
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
