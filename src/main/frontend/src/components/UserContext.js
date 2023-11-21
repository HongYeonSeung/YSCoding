// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const storedUserData = JSON.parse(localStorage.getItem('userData')) || { memberName: '', point: 0 };
    const [userData, setUserData] = useState(storedUserData);

    const setResponseData = (data) => {
        localStorage.setItem('userData', JSON.stringify(data));
        setUserData(data);
    };

    useEffect(() => {
        // 초기 로그인 상태 설정
        if (!storedUserData.memberName) {
            setResponseData({ memberName: "initialLoginName", point: 0 });
        }
    }, []);

    return (
        <UserContext.Provider value={{ userData, setResponseData }}>
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