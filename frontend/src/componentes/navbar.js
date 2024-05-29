// src/componentes/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/navbar.css';

function Navbar() {
    return (
        <nav>
            <Link to="/">
                <img src={'../../../corutuks.png'} alt="Imagen Corutuks" />
            </Link>
                
            <ul>
                <li><Link to="/reservas">Tours</Link></li>
                <li><Link to="/sobreNosotros">Sobre Nosotros</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
