import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/stylesInfo.css';
import Carousel from 'react-bootstrap/Carousel';
import IglesiaDeSantiago from '../img/IglesiaDeSantiago.jpg';
import SantaMaria from '../img/SantaMaria.jpg';
import SanJorge from '../img/SanJorge.jpg';
import SantoDomingo from '../img/SantoDomingo.jpg';

function InfoTours2() {
    return (
        <div className="reserva-info-container">
            <Carousel interval={ 3000 } slide={ false } fade={ false }>
                <Carousel.Item>
                    <img src={ IglesiaDeSantiago } alt="Imagen Iglesia De Santiago" className='imgCarrusel'/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={ SantaMaria } alt="Imagen Santa Maria" className='imgCarrusel'/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={ SanJorge } alt="Imagen San Jorge" className='imgCarrusel'/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={ SantoDomingo } alt="Imagen Santo Domingo" className='imgCarrusel'/>
                </Carousel.Item>
            </Carousel>
            <div className="reserva-info-content">
                <h1>Caminos Sagrados</h1>
                <p>
                    Bienvenidos a Caminos Sagrados, un tour imperdible sobre los lugares de culto con mayor historia
                    de nuestra ciudad.
                    A lo largo de la ruta se sumergirá en la riqueza histórica, arquitectónica y artística de A Coruña. Los
                    templos ubicados en la ciudad datan de entre el siglo XII al XVIII, siendo principalmente románicos y
                    barrocos.
                </p>
                <h2>Detalles del Recorrido</h2>
                <p>
                    Nuestra ruta tendrá una duración aproximada de 2 horas. Durante el recorrido le acompañará un
                    guía turístico para poder profundizar en el descubrimiento de nuestra historia.
                </p>
                <p>
                    La ruta constará de los siguientes puntos de interés:
                </p>
                <ul>
                    <li>Iglesia de Santiago</li>
                    <li>Colegiata Santa María del Campo</li>
                    <li>Iglesia de San Jorge</li>
                    <li>Convento de Santo Domingo</li>
                </ul>
                <p>
                    Únete a nosotros en este viaje por el cual nos perderemos entre la historia y el arte de esta preciosa
                    ciudad.
                </p>
                <Link to="/reservar-2" className="btn-reservar">
                    Reservar
                </Link>
            </div>
        </div>
    );
}

export default InfoTours2;
