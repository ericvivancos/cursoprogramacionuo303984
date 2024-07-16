import React from 'react';

const InstructionList = () => {
    return (
        <div className="instructions-container">
            <h2>Cómo usar esta página</h2>
            <ol className="instructions-list">
                <li>
                    <h3>Paso 1: Inicia sesión en tu cuenta</h3>
                    <p>Utiliza tu correo electrónico y contraseña para acceder a tu cuenta. Si no tienes una cuenta, puedes registrarte.</p>
                </li>
                <li>
                    <h3>Paso 2: Navega a la página de amigos</h3>
                    <p>En la página de amigos, puedes agregar nuevos amigos utilizando sus direcciones de correo electrónico.</p>
                </li>
                <li>
                    <h3>Paso 3: Busca regalos</h3>
                    <p>Usa el correo de tus amigos para buscar los regalos que han registrado. Puedes ver la lista de regalos disponibles.</p>
                </li>
                <li>
                    <h3>Paso 4: Selecciona los regalos</h3>
                    <p>Elige los regalos que quieres regalar a tus amigos y selecciona la opción correspondiente para marcarlos.</p>
                </li>
            </ol>
        </div>
    );
};

export default InstructionList;
