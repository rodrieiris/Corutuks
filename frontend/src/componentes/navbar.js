import React from 'react';
import { Link } from 'react-router-dom';
import CorutuksLogo from '../img/corutuks.png';
import '../styles/navbar.css';

function Navbar() {
    return (
        <nav>
            <Link to="/">
                <img src={ CorutuksLogo } alt="Imagen Corutuks" className='CorutuksLogo'/>
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
