import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/stylesTours.css';
import CastilloSanAnton from '../img/CastilloSanAnton.jpg';
import SanJorge from '../img/SanJorge.jpg';
import Parrote from '../img/Parrote.jpg';

function Tours() {
    return (
        <div className="reservas">
            <div className="container">
                <div className="card">
                    <h2>Coruña mágica</h2>
                    <img src={ CastilloSanAnton } alt="Imagen Castillo San Anton" className='imgCarrusel'/>
                    <div className="botonTours">
                        <Link to="/info-tours-1">
                            <button className="button">Info</button>
                        </Link>
                        <Link to="/reservar-1">
                            <button className="button">Reservar</button>
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <h2>Caminos Sagrados</h2>
                    <img src={ SanJorge } alt="Imagen San Jorge" className='imgCarrusel'/>
                    <div className="botonTours">
                        <Link to="/info-tours-2">
                            <button className="button">Info</button>
                        </Link>
                        <Link to="/reservar-2">
                            <button className="button">Reservar</button>
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <h2>Miradas al mar</h2>
                    <img src={ Parrote } alt="Imagen Parrote" className='imgCarrusel'/>
                    <div className="botonTours">
                        <Link to="/info-tours-3">
                            <button className="button">Info</button>
                        </Link>
                        <Link to="/reservar-3">
                            <button className="button">Reservar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tours;
