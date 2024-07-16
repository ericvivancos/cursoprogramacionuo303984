import React from 'react';

const GiftItem = ({ present, onSelectGift }) => {
    return (
        <div className="present-item">
            <p><strong>Nombre:</strong> {present.name}</p>
            <p><strong>Descripción:</strong> {present.description}</p>
            <p><strong>Precio:</strong> {present.price}</p>
            <button onClick={() => onSelectGift(present.id)}>Seleccionar</button>
        </div>
    );
};

export default GiftItem;
