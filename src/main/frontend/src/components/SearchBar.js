import React from 'react';
import './SearchBar.css';

function SearchBar() {
    return (
        <div className="search-bar-container">
            <input type="text" className="search-bar-input" placeholder="검색어를 입력하세요" />
            <button className="search-bar-button">검색</button>
        </div>
    );
}

export default SearchBar;
