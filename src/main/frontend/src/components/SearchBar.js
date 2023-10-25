// src/components/SearchBar.js
import React from 'react';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="검색어를 입력하세요" />
      <button>검색</button>
    </div>
  );
}

export default SearchBar;
