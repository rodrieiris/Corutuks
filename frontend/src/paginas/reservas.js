import React from 'react';
import '../styles/styles.css';

function Reservas() {
    return (
        <div className="inicio">
            <h1>Bienvenido a Corutuk</h1>
            <p>Descubre nuestros increíbles tours y reserva tu aventura hoy mismo.</p>
            <div className="container">
                <div className="card">
                    <h2>Tours</h2>
                    <p>Explora nuestros tours disponibles.</p>
                    <button className="button">Ver Más</button>
                </div>
                <div className="card">
                    <h2>Reservas</h2>
                    <p>Reserva tu tour favorito fácilmente.</p>
                    <button className="button">Reservar Ahora</button>
                </div>
            </div>
        </div>
    );
}

export default Reservas;
