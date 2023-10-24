import React from 'react';
import Header from "./Header";
import './Login.css';
import Login_box from './login/login_box';

const Login = () => {
    return (
        <div className='login'>
            <div className='login_box'>
                <Login_box></Login_box>
            </div>
        </div>
    );
}
export default Login;