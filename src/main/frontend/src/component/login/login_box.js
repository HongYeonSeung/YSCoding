import React, { useState } from 'react';
import './login_box.css';
import axios from "axios";

const LoginBox = () => {
    const [data, setData] = useState({
        name: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Axios를 사용하여 데이터를 서버로 보냅니다.
        axios.post('/api/submitData', data)
            .then((response) => {
                // 성공적으로 데이터를 보낸 후 실행할 코드를 여기에 추가하세요.
                console.log('데이터가 성공적으로 전송되었습니다.');
            })
            .catch((error) => {
                // 에러 처리 코드를 여기에 추가하세요.
                console.error('데이터 전송 중 오류 발생:', error);
            });
    };

    return (
        <div className='login_box_main'>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleInputChange}
                    placeholder="이름"
                />
                <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleInputChange}
                    placeholder="비밀번호"
                />
                {/* 다른 폼 필드를 추가하세요 */}
                <button type="submit">전송</button>
            </form>
        </div>
    );
}

export default LoginBox;
