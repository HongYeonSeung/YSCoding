// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loginId, setLoginId] = useState(localStorage.getItem('loginId'));

    const setResponseData = (data) => {
        localStorage.setItem('loginId', data);
        setLoginId(data);
    };

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
