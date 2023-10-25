import React from 'react';
import './Layout2.css';

function Layout2() {
  const buttonData = [
    { id: 1, color: '#6bff98', label: '카테고리 1' },
    { id: 2, color: '#6bff98', label: '카테고리 2' },
    { id: 3, color: '#6bff98', label: '카테고리 3' },
    { id: 4, color: '#6bff98', label: '카테고리 4' },
    { id: 5, color: '#6bff98', label: '카테고리 5' },
    { id: 6, color: '#6bff98', label: '카테고리 6' },
    { id: 7, color: '#6bff98', label: '카테고리 7' },
    { id: 8, color: '#6bff98', label: '카테고리 8' },
    { id: 9, color: '#6bff98', label: '카테고리 9' },
    { id: 10, color: '#6bff98', label: '카테고리 10' },
];

  // 클릭 이벤트 핸들러 함수 정의
  const handleButtonClick = (buttonId) => {
    alert(`버튼 ${buttonId}가 클릭되었습니다.`);
  };

  return (
    <div className="layout2">
      <div className="category-header">
        <span className="category-text">카테고리</span>
      </div>
      <div className="button-container">
        {buttonData.map((button) => (
          <div key={button.id} className="button-container-item">
            <div
              className="button"
              style={{ backgroundColor: button.color }}
              onClick={() => handleButtonClick(button.id)} // 클릭 이벤트 핸들러 추가
            >
              {button.id}
            </div>
            <div className="label">{button.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Layout2;