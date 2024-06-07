import React from "react";
import '../styles/stylesInicio.css';
import Img from '../img/home.jpg';

function Inicio() {
    return (
        <div className="inicio">
            <img src={ Img } alt="Imagen Home" className="imgHome"/>
            <div className="textoContainer">
                <h1 className="textoBienvenido">¡Bienvenido!</h1>
                <h2 className="textoInicio">Descubre la ciudad de una manera única y emocionante: ¡Con Corutuks, el alma de la ciudad 
                    en cada TukTuk!
                </h2>
            </div>
        </div>
    );
}

export default Inicio;
