import React from 'react';
import {Link, Router} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import './Header.css'

const Header= () =>{
    return(
        <div className='header'>
            <div className='header-left'>
            </div>
            <div className='header-right'>
                <ListGroup horizontal>
                    <ListGroup.Item>
                        <Link to="/" style={{ textDecoration: "none"}}>
                            <div className='Header-list'>메인 화면</div>
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Link to="/Login" style={{ textDecoration: "none"}}>
                            <div className='Header-list'> 로그인</div>
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Link to="/Profile" style={{ textDecoration: "none"}}>
                            <div className='Header-list'>내 정보</div>
                        </Link>
                    </ListGroup.Item>
                </ListGroup>



            </div>
        </div>
    )
}

export default Header