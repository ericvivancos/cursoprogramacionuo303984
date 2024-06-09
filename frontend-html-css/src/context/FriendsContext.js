import React, { createContext, useState, useEffect } from 'react';
import { query } from '../utils/apiUtils';

export const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ type: '', message: '' });

    const fetchFriends = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await query('GET', 'friends', {}, token);
            setFriends(response.data);
        } catch (err) {
            setNotification({ type: 'error', message: err.response?.data?.error || 'Error al obtener amigos' });
        } finally {
            setLoading(false);
        }
    };

    const addFriend = async (email) => {
        const token = localStorage.getItem('token');
        try {
            const response = await query('POST', 'friends', { email }, token);
            if (response.data && response.data.message) {
                setFriends([...friends, email]);
                setNotification({ type: 'success', message: response.data.message });
            }
            else{
                throw new Error(response.error);
            }
        } catch (err) {
            setNotification({ type: 'error', message: err.message || 'Error al agregar amigo' });
        }
    };

    const removeFriend = async (email) => {
        const token = localStorage.getItem('token');
        try {
            const response = await query('DELETE', `friends/${email}`, {}, token);
            if (response.data && response.data.message) {
                setFriends(friends.filter(friend => friend !== email));
                setNotification({ type: 'success', message: response.data.message });
            }
            else{
                throw new Error(response.error);
            }
        } catch (err) {
            setNotification({ type: 'error', message: err.message || 'Error al eliminar amigo' });
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    return (
        <FriendsContext.Provider value={{ friends, addFriend, removeFriend, notification, setNotification, loading }}>
            {children}
        </FriendsContext.Provider>
    );
};
