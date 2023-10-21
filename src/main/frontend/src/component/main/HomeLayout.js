// src/components/HomeLayout.js
import React from 'react';
import ActionBar from './ActionBar';
import LogoSearch from './LogoSearch';

function HomeLayout() {
  return (
    <div>
      <ActionBar />
      <LogoSearch />
      {/* 이어서 다른 내용 추가 */}
    </div>
  );
}

export default HomeLayout;
