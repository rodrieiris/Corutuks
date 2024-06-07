import React from 'react';
import '../styles/stylesPerfil.css';

function Perfil() {
    return (
        <div className="perfil-container">
            <h2>Mi Perfil</h2>
            <div className="perfil-info">
                <div className="campo">
                    <label>Nombre:</label>
                    <p>Rodrigo Eiris</p>
                </div>
                <div className="campo">
                    <label>Email:</label>
                    <p>rodri@gmail.com</p>
                </div>
                <div className="campo">
                    <label>País:</label>
                    <p>España</p>
                </div>
                <div className="campo">
                    <label>Fecha de Registro:</label>
                    <p>06/06/2024</p>
                </div>
            </div>
        </div>
    );
}

export default Perfil;
