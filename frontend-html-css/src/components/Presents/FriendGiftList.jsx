import React from 'react';
import GiftItem from './GiftItem';

const GiftList = ({ gifts, onSelectGift }) => {
    return (
        <div className="presents-list">
            {gifts.map(present => (
                <GiftItem key={present.id} present={present} onSelectGift={onSelectGift} />
            ))}
        </div>
    );
};

export default GiftList;
