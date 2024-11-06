import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { DEFAULT } from './constants';

let showNotification;

const NotificationProvider = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        showNotification = (msg, variant = DEFAULT) => {
            enqueueSnackbar(msg, { variant });
        };
    }, [enqueueSnackbar]);

    return <>{children}</>;
};

export { NotificationProvider, showNotification };
