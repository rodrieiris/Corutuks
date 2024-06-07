import React, { useState } from 'react';
import '../styles/stylesContacto.css'; 

function Contacto() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        mensaje: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
    };

    const handleCloseModal = () => {
        setIsSubmitted(false);
        setFormData({
            nombre: "",
            email: "",
            mensaje: ""
        });
    };

    return (
        <div className="contacto-container">
            <div className="info-contacto">
                <h2>Información de contacto</h2>
                <div className="contact-details">
                    <div className="contact-row">
                        <span className="contact-label">Email:</span>
                        <span className="contact-info">info@corutuks.com</span>
                    </div>
                    <div className="contact-row">
                        <span className="contact-label">Teléfono:</span>
                        <span className="contact-info">+123456789</span>
                    </div>
                    <div className="contact-row">
                        <span className="contact-label">Horario:</span>
                        <span className="contact-info">Lunes a Jueves de 9:00 a 22:00</span>
                    </div>
                    <div className="contact-row">
                        <span className="contact-label"></span>
                        <span className="contact-info">Viernes a Domingo de 10:30 a 24:00</span>
                    </div>
                </div>
            </div>
            
            <div className="mapa-contacto">
                <h2>Ubicación Corutuks</h2>
                    <iframe
                        title="Ubicación Corutuks"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d290.97937028362946!2d-8.39573904531993!3d43.36930133463064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2e7b8069a8d1e1%3A0x79e55913e604c8c4!2sExplanada%20del%20Parrote!5e1!3m2!1ses!2ses!4v1717247059532!5m2!1ses!2ses"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
            </div>
            <div className="formulario-contacto">
            <h2>Formulario de contacto</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mensaje">Mensaje:</label>
                    <textarea
                        id="mensaje"
                        name="mensaje"
                        rows="5"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Enviar</button>
            </form>

            {isSubmitted && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <p>Mensaje enviado.</p>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}

export default Contacto;
