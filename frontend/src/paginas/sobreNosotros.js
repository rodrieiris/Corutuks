import React from 'react';
import '../styles/stylesSobreNosotros.css';
import ImgSobreNosotros from '../img/imgSobreNosotros.png';

function SobreNosotros() {
    return (
        <div className="sobre-nosotros-container">
            <section className="historia">
                <h2>Nuestra Historia</h2>
                <p>
                    Corutuks nació en 2024, fundada por Rodrigo Eirís. Desde nuestros inicios como una pequeña empresa local, hemos 
                    evolucionado. Lo que comenzó con un solo tour, hoy se ha transformado en una amplia gama de experiencias únicas que 
                    ofrecemos a nuestros clientes.
                </p>
            </section>
            <section className="mision-vision">
                <h2>Misión y Visión</h2>
                <p>
                    <strong>Misión:</strong> Proporcionar experiencias de viaje inolvidables, asegurando la máxima satisfacción del cliente a 
                    través de un servicio excepcional y dedicación a la calidad.
                </p>
                <p>
                    <strong>Visión:</strong> Convertirnos en el líder mundial en el sector de tours y experiencias, siendo reconocidos por 
                    nuestra innovación, calidad y responsabilidad social.
                </p>
            </section>
            <section className="valores">
                <h2>Valores</h2>
                <ul>
                    <li>Integridad</li>
                    <li>Innovación</li>
                    <li>Responsabilidad</li>
                    <li>Calidad</li>
                    <li>Pasión</li>
                </ul>
            </section>
            <section className="equipo">
                <h2>Conoce a Nuestro Equipo</h2>
                <div className="miembros-equipo">
                    <div className="miembro">
                        <img src={ ImgSobreNosotros } alt="Rodrigo Eirís" className="imgHome"/>
                        <h3>Rodrigo Eirís</h3>
                        <p>Co-Fundador y CEO</p>
                    </div>
                    <div className="miembro">
                        <img src={ ImgSobreNosotros } alt="María López" className="imgHome"/>
                        <h3>María López</h3>
                        <p>Directora de Administración</p>
                    </div>
                    <div className="miembro">
                        <img src={ ImgSobreNosotros } alt="Pepito Gómez" className="imgHome"/>
                        <h3>Pepito Gómez</h3>
                        <p>Director de Marketing</p>
                    </div>
                </div>
            </section>
            <section className="servicios">
                <h2>Nuestros Servicios</h2>
                <ul>
                    <li>Excursiones de un día</li>
                    <li>Tours personalizados</li>
                    <li>Experiencias culturales</li>
                    <li>Aventuras al aire libre</li>
                    <li>Viajes corporativos</li>
                </ul>
            </section>
            <section className="testimonios">
                <h2>Testimonios de Clientes</h2>
                <div className="testimonios-container">
                    <div className="testimonio">
                        <p>"¡Una experiencia increíble! Los guías fueron muy amables y conocedores. Definitivamente recomendaría Corutuks a cualquiera."</p>
                        <div className="estrellas">
                            ★★★★★
                        </div>
                        <h4>- Ana García</h4>
                    </div>
                    <div className="testimonio">
                        <p>"Los tours personalizados fueron perfectos para nuestra familia. Pudimos ver todo lo que queríamos y más. ¡Gracias Corutuks!"</p>
                        <div className="estrellas">
                            ★★★★★
                        </div>
                        <h4>- Pedro Fernández</h4>
                    </div>
                    <div className="testimonio">
                        <p>"Me encantaron las aventuras al aire libre. Una de las mejores experiencias de mi vida."</p>
                        <div className="estrellas">
                            ★★★★☆
                        </div>
                        <h4>- Laura Martínez</h4>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SobreNosotros;
