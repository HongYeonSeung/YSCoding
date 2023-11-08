import React from 'react';
import { Link } from 'react-router-dom';
import './ActionBar.css';
import {useState,useEffect } from "react";
import axios from "axios";

function ActionBar() {
    const [time, setTime] = useState(new Date());
    const [name , setName] = useState('비회원 상태입니다');

    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return (() => clearInterval(id))
    }, []);


  return (
      <div className="action-bar-main">
        <div className="action-bar">
          <div className="logo">
            <Link to="/">My Website</Link>
          </div>
          <div className="right-section">
            <div className="time">{time.toLocaleTimeString()}</div>
            <div className="links">
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원가입</Link>
              <Link to="/mypage">마이페이지</Link>
            </div>
          </div>
        </div>
          <div className="login-bar-box">
              <div className="login-box">
                  <div></div>
              </div>

          </div>
      </div>
  );
}

export default ActionBar;