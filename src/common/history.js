import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

let navigateTo;

const NavigationProvider = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigateTo = (path, state) => {
          navigate(path, state);
        };
    }, [navigate]);

    return <>{children}</>;
};

export { NavigationProvider, navigateTo };
