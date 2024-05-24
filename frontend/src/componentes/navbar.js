// src/componentes/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
        <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/registro">Registro</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/perfil">Perfil</Link></li>
            <li><Link to="/reservas">Reservas</Link></li>
        </ul>
        </nav>
    );
}

export default Navbar;
