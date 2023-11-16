// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const storedLoginId = localStorage.getItem('loginId');
    const [loginId, setLoginId] = useState(storedLoginId || '');

    const setResponseData = (data) => {
        localStorage.setItem('loginId', data);
        setLoginId(data);
    };

    useEffect(() => {
        // 예를 들어, 초기 로그인 상태를 설정하려면 여기서 작업할 수 있습니다.
        // 예: storedLoginId 가 없을 경우, 초기 로그인 상태를 설정한다.
        // if (!storedLoginId) {
        //   setResponseData("initialLoginId");
        // }
    }, []); // 한 번만 실행되도록 []를 전달

    return (
        <UserContext.Provider value={{ loginId, setResponseData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
