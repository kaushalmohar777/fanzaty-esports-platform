import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setOnlineUser } from '../features/user/userSlice';
import { getLocalStorageData } from '../shared/commonFunction';

const useSocket = () => {
    const socketRef = useRef();
    const BASE_URL = 'http://localhost:3000';
    const dispatch = useDispatch();

    useEffect(() => {
        const token = getLocalStorageData('token');

        const socket = io(BASE_URL, {
            transports: ['websocket'],
            auth: {
                token: token,
            },
        });

        socket.on('connect', () => {
            console.log('Connected:', socket.id);
        });

        socket.on('disconnect', (reason) => {
            console.log('Disconnected:', reason);
        });

        socket.on('connect_error', (error) => {
            console.error('Connection Error:', error);
        });

        socket.on('onlineUser', (data) => {
            dispatch(setOnlineUser(data));
        });

        socketRef.current = socket;

        return () => {
            socket.disconnect();
        };
    }, [BASE_URL, dispatch]);

    return socketRef.current;
};

export default useSocket;
