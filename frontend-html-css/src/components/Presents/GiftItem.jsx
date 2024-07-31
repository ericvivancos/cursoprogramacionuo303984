import React from 'react';

const GiftItem = ({ present, onSelectGift }) => {
    console.log(present);
    return (
        <div className="present-item">
            <p><strong>Nombre:</strong> {present.name}</p>
            <p><strong>Descripción:</strong> {present.description}</p>
            <p><strong>Precio:</strong> {present.price}</p>
            {present.chosen_by ? (
                <p><strong>Elegido por:</strong> {present.chosen_by}</p>
            ) : (
                <button onClick={() => onSelectGift(present.id)}>Seleccionar</button>
            )}
        </div>
    );
};

export default GiftItem;
