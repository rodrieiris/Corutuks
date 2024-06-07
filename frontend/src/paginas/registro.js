import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/stylesRegistro.css';

function Registro() {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [pais, setPais] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Lógica para registrar al usuario en el lado del cliente
        const hardcodedEmail = 'rodri@gmail.com';

        if (email === hardcodedEmail) {
            setErrorMessage('Este correo electrónico ya está registrado.');
        } else {
            console.log('Usuario registrado con éxito');
            setErrorMessage('Registro exitoso.');
        }
    };

    return (
        <div className="registro">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="apellidos">Apellidos:</label>
                    <input
                        type="text"
                        id="apellidos"
                        value={apellidos}
                        onChange={(event) => setApellidos(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Teléfono:</label>
                    <input
                        type="tel"
                        id="telefono"
                        value={telefono}
                        onChange={(event) => setTelefono(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Dirección:</label>
                    <input
                        type="text"
                        id="direccion"
                        value={direccion}
                        onChange={(event) => setDireccion(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ciudad">Ciudad:</label>
                    <input
                        type="text"
                        id="ciudad"
                        value={ciudad}
                        onChange={(event) => setCiudad(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pais">País:</label>
                    <input
                        type="text"
                        id="pais"
                        value={pais}
                        onChange={(event) => setPais(event.target.value)}
                        required
                    />
                </div>
                <Link to="/perfil">
                    <button type="submit">Registrarse</button>
                </Link>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
            <Link to="/login" className="linkLogin">¿Tienes una cuenta? Inicia sesión aquí</Link>
        </div>
    );
}

export default Registro;
