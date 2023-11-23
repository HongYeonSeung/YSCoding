import React from 'react';
import { Link } from 'react-router-dom';
import './Layout2.css';

// 이미지 파일 경로
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
];

function Layout2() {
    const buttonData = [
        { id: 1, label: '카테고리 1' },
        { id: 2, label: '카테고리 2' },
        { id: 3, label: '카테고리 3' },
        { id: 4, label: '카테고리 4' },
        { id: 5, label: '카테고리 5' },
        { id: 6, label: '카테고리 6' },
        { id: 7, label: '카테고리 7' },
        { id: 8, label: '카테고리 8' },
        { id: 9, label: '카테고리 9' },
    ];

    return (
        <div className="layout2">
            <div className="category-header">
                <span className="category-text">카테고리</span>
            </div>
            <div className="button-container">
                {buttonData.map((button, index) => (
                    <div key={button.id} className="button-container-item">
                        <Link to={`/category${button.id}`}>
                            <button className="round-button">
                                {/* 이미지 파일 경로를 사용하여 이미지를 추가 */}
                                <img
                                    src={`/${imagePaths[index]}`}
                                    alt={`Category ${button.label}`}
                                />
                                {/*{button.label}*/}
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Layout2;
