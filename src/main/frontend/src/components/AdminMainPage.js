import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

const AdminMainPage = () => {
    return (
        <div>
            <h2>관리자 페이지</h2>
            <div className="adminMainPage_mainBox">
                <Link to={'/AdminPage'}>
                    판매상품 페이지로 이동
                </Link>
                <div>
                    회원 관리 페이지
                </div>
            </div>
        </div>
    );
};

export default AdminMainPage;