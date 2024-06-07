import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/stylesInfo.css';
import Carousel from 'react-bootstrap/Carousel';
import TorreDeHercules from '../img/TorreDeHercules.jpg';
import Parrote from '../img/Parrote.jpg';
import Riazor from '../img/Riazor.jpg';
import VentanaAtlantico from '../img/VentanaAtlantico.jpg';

function InfoTours3() {
    return (
        <div className="reserva-info-container">
            <Carousel interval={ 3000 } slide={ false } fade={ false }>
                <Carousel.Item>
                    <img src={ TorreDeHercules } alt="Imagen Torre De Hercules" className='imgCarrusel'/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={ Parrote } alt="Imagen Parrote" className='imgCarrusel'/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={ Riazor } alt="Imagen Riazor" className='imgCarrusel'/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={ VentanaAtlantico } alt="Imagen Ventana Atlantico" className='imgCarrusel'/>
                </Carousel.Item>
            </Carousel>
            <div className="reserva-info-content">
                <h1>Miradas al mar</h1>
                <p>
                    Esta ruta al borde del mar recorre la nota característica de la ciudad, el mar, las olas, la maresía...
                    Estos lugares se complementan con las galerías, elemento arquitectónico por referencia. Es así, que
                    a Coruña se le conoce también por ser la Ciudad de Cristal. La razón de este recorrido nace con la
                    finalidad de disfrutar del paseo marítimo urbano más largo de Europa, con sus 13 km.
                </p>
                <h2>Detalles del Recorrido</h2>
                <p>
                    Nuestra ruta tendrá una duración aproximada de 3 horas en la que podrá disfrutar tranquilamente
                    de los siguientes lugares:
                </p>
                <ul>
                    <li>Torre de Hércules</li>
                    <li>Paseo del Parrote - Marina</li>
                    <li>Playa de Riazor</li>
                    <li>Millenium - O Portiño</li>
                    <li>Parque de San Pedro</li>
                </ul>
                <p>
                    ¿Quiere visitar la Torre? Dispondrá de tiempo libre para efectuar su visita, mientras nosotros le
                    esperamos.
                </p>
                <Link to="/reservar-3" className="btn-reservar">
                    Reservar ahora
                </Link>
            </div>
        </div>
    );
}

export default InfoTours3;
