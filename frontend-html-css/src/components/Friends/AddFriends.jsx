import React, { useState,useContext } from 'react';
import { FriendsContext } from '../../context/FriendsContext';
import Notification from '../Notification';

const AddFriends = () => {
    const [email, setEmail] = useState('');
    const { addFriend, notification, setNotification } = useContext(FriendsContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addFriend(email);
        setEmail('');
        setTimeout(() => {
            setNotification({ type: '', message: '' });
        }, 2000); 
    };
    return (
        <div className="container">
            {notification.message && (
                <Notification type={notification.type} message={notification.message} onClose={() => setNotification({ type: '', message: '' })} />
            )}
            <div className="card myshadow">
                <div className="card-header">
                    <h2 className="card-title">Añadir Amigos</h2>
                    <p className="card-description">Introduce un correo para añadir a tu listado de amigos</p>
                </div>
                <div className="card-content">
                    <form onSubmit={handleSubmit} >
                        <div className="form-group">
                            <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label >Email</label>
                        </div>
                        <button type="submit">Añadir Amigo</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFriends;