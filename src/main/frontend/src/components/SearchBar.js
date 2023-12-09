// 파일명: SearchBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

function SearchBar() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchKeyword.trim() !== '') {
            navigate(`/search/${searchKeyword}`);
        } else {
            alert('검색어를 입력하세요.');
        }
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-bar-input"
                placeholder="검색어를 입력하세요"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button className="search-bar-button" onClick={handleSearch}>
                검색
            </button>
        </div>
    );
}

export default SearchBar;
