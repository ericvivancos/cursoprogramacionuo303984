import React, { createContext, useState, useEffect } from 'react';
import { query } from '../utils/apiUtils';

export const GiftContext = createContext();

export const GiftProvider = ({ children }) => {
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ type: '', message: '' });

    const fetchGiftsByEmail = async (email) => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const response = await query('GET', `presents?userEmail=${email}`, {}, token);
            if(response.error){
                throw new Error(response.error);
            }
            
            setGifts(response.data);
            setNotification({ type: 'success', message: 'Regalos encontrados' });
        } catch (err) {
            console.log(err);
            setNotification({ type: 'error', message: err.message || 'Error al buscar regalos' });
            setGifts([]);
        } finally {
            setLoading(false);
        }
    };

    const selectGift = async (presentId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await query('PUT', `presents/${presentId}`, {}, token);
            if(response.error){
                throw new Error(response.error);
            }
            setNotification({ type: 'success', message: response.data.message });
        } catch (err) {
            setNotification({ type: 'error', message: err.message || 'Error al seleccionar regalo' });
        }
    };

    return (
        <GiftContext.Provider value={{ gifts, loading, fetchGiftsByEmail, selectGift, notification, setNotification }}>
            {children}
        </GiftContext.Provider>
    );
};
