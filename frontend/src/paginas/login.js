import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/stylesLogin.css";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Lógica para autenticar al usuario en el lado del cliente
        const hardcodedEmail = 'rodri@gmail.com';
        const hardcodedPassword = '1234';

        if (email === hardcodedEmail && password === hardcodedPassword) {
            console.log('Usuario autenticado');
            setErrorMessage('Autenticación exitosa.');
        } else {
            setErrorMessage('Correo electrónico o contraseña incorrectos.');
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Link to="/perfil">
                    <button type="submit" className="btn-login">Login</button>
                </Link>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
            <Link to="/registro" className="linkRegistro">¿No tienes una cuenta? Regístrate aquí</Link>
        </div>
    );
}

export default Login;
