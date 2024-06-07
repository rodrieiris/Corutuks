import React from 'react';
import { Link } from 'react-router-dom';
import CorutuksLogo from '../img/corutuks.png';
import '../styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    return (
        <nav>
            <Link to="/">
                <img src={ CorutuksLogo } alt="Imagen Corutuks" className='CorutuksLogo'/>
            </Link>
                
            <ul>
                <li><Link to="/tours">Tours</Link></li>
                <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
                <li><Link to="/contacto" className='contacto'>Contacto</Link></li>
                <li>
                    <Link to="/login" className='emoticonoLogin'>
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
