import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

let navigateTo;

const Navigation = ({ children }) => {
    const naviagte = useNavigate();

    useEffect(() => {
        // Set up a global showNotification function
        navigateTo = (path) => {
            naviagte(path);
        };
    }, [navigateTo]);

    return <>{children}</>;
};

export { Navigation, navigateTo };
