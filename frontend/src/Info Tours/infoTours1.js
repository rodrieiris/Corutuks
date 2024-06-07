import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import '../styles/stylesInfo.css';
import TorreDeHercules from '../img/TorreDeHercules.jpg';
import CastilloSanAnton from '../img/CastilloSanAnton.jpg';
import MariaPita from '../img/MariaPita.jpg';
import SanCarlos from '../img/SanCarlos.jpg';
import SanPedro from '../img/SanPedro.jpg';

function InfoTours1() {
    return (
        <div className="reserva-info-container">
            <Carousel interval={ 3000 } slide={ false } fade={ false }>
                <Carousel.Item>
                    <img src={ TorreDeHercules } alt="Imagen Torre De Hércules" className='imgCarrusel'/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={ CastilloSanAnton } alt="Imagen Castillo de San Antón" className='imgCarrusel'/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={ MariaPita } alt="Imagen María Pita" className='imgCarrusel'/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={ SanCarlos } alt="Imagen San Carlos" className='imgCarrusel'/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={ SanPedro } alt="Imagen San Pedro" className='imgCarrusel'/>
                </Carousel.Item>
            </Carousel>
            <div className="reserva-info-content">
                <h1>Coruña mágica</h1>
                <p>
                    ¡Descubre la emblemática ciudad de A Coruña, dónde nadie es forastero! Si quieres visitar el faro
                    romano más antiguo del mundo en funcionamiento; una antigua cárcel reconvertida en museo
                    arqueológico; cañones y baterías militares de la Segunda Guerra Mundial o, incluso, la tumba de Sir
                    John Moore, general británico... Esta es tu ruta. Recorrerás los principales atractivos de la ciudad.
                </p>
                <h2>Detalles del Recorrido</h2>
                <p>
                    Nuestra ruta tendrá una duración de aproximadamente 4 horas y recorrerá los siguientes puntos de
                    interés:
                </p>
                <ul>
                    <li>Torre de Hércules</li>
                    <li>Castillo de San Antón</li>
                    <li>Plaza María Pita</li>
                    <li>Jardín de San Carlos</li>
                    <li>Parque de San Pedro</li>
                </ul>
                <p>
                    ¿Quiere visitar la Torre o el Castillo? Dispondrá de tiempo libre para efectuar su visita, mientras
                    nosotros le esperamos.
                </p>
                <p>
                    Cada uno de estos lugares ofrece a aquellos que los visitan una experiencia única e inigualable. La
                    Historia está presente en cada rinconcito de la ciudad y nosotros le llevamos para que lo descubra
                    como nunca.
                </p>
                <Link to="/reservar-1" className="btn-reservar">
                    Reservar
                </Link>
            </div>
        </div>
    );
}

export default InfoTours1;
