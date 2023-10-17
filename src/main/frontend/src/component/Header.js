import React from 'react';
import {Link, Router} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Header.css'

const Header= () =>{
    return(
        <div className='header'>
            <div className='header-left'>
            </div>
            <div className='header-right'>
                <Link to="/">
                    <Button variant="primary" className="normal-button">
                        Home
                    </Button>
                </Link>
                <Link to="/Login">
                    <Button variant="primary" className="normal-button">
                        로그인
                    </Button>
                </Link>
                <Link to="/Profile">
                    <Button variant="primary" className="normal-button">
                        내 정보
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Header