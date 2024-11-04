import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';

let showNotification;

const NotificationProvider = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        showNotification = (msg, variant = "default") => {
            enqueueSnackbar(msg, { variant });
        };
    }, [enqueueSnackbar]);

    return <>{children}</>;
};

export { NotificationProvider, showNotification };
