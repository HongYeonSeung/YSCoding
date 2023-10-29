import React from 'react';
import { Link } from 'react-router-dom';
import './Layout2.css';

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
    { id: 10, label: '카테고리 10' },
  ];

  return (
      <div className="layout2">
        <div className="category-header">
          <span className="category-text">카테고리</span>
        </div>
        <div className="button-container">
          {buttonData.map((button) => (
              <div key={button.id} className="button-container-item">
                <Link to={`/category${button.id}`}>
                  <button className="round-button">
                    {button.label}
                  </button>
                </Link>
              </div>
          ))}
        </div>
      </div>
  );
}

export default Layout2;
