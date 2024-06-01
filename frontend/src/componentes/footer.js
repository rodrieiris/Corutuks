import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

function Footer() {
    return (
        <footer>
            <div className="footer-links">
                <Link to="/privacidad">Privacidad</Link>
                <Link to="/legal">Legal</Link>
                <Link to="/cookies">Cookies</Link>
            </div>
            <div className="footer-copyright">
                &copy; 2024 Corutuks. Todos los derechos reservados.
            </div>
        </footer>
    );
}

export default Footer;
