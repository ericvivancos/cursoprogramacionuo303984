import React, { useState, useContext } from 'react';
import { GiftContext } from '../../context/GiftContext';
import Notification from '../Notification';
import GiftList from './FriendGiftList';

const SearchGifts = () => {
    const { gifts, loading, fetchGiftsByEmail, selectGift, notification, setNotification } = useContext(GiftContext);
    const [email, setEmail] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        await fetchGiftsByEmail(email);
    };

    const handleSelectGift = async (presentId) => {
        await selectGift(presentId);
    };

    return (
        <div className="container">
            {notification.message && (
                <Notification type={notification.type} message={notification.message} onClose={() => setNotification({ type: '', message: '' })} />
            )}
            <div className="card myshadow">
                <div className="card-header">
                    <h2 className="card-title">Buscar Regalos</h2>
                    <p className="card-description">Introduce el correo del usuario para buscar sus regalos</p>
                </div>
                <div className="card-content">
                    <form onSubmit={handleSearch}>
                        <div className="form-group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Email</label>
                        </div>
                        <button type="submit">Buscar Regalos</button>
                    </form>
                    {!loading && gifts && gifts.length > 0 ? (
                        <GiftList gifts={gifts} onSelectGift={handleSelectGift} />
                    ) : (
                        !loading && <p>No se encontraron regalos.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchGifts;
