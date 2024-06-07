/*import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/stylesPago.css';

function PasarelaDePago() {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si Stripe.js ha sido cargado
        if (!stripe || !elements) {
            return;
        }

        // Crear un token de tarjeta
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            setErrorMessage(error.message);
            return;
        }

        console.log('ID del pago:', paymentMethod.id);

        setErrorMessage('Pago procesado con éxito.');
    };

    const cardStyle = {
        style: {
            base: {
                color: '#32325d',
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#a0aec0',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    };

    return (
        <div className="pasarela-pago-container">
            <h2>Pasarela de Pago</h2>
            <form className="payment-form" onSubmit={handleSubmit}>
                <label htmlFor="card-element">
                    Ingresa los detalles de tu tarjeta:
                </label>
                <div className="card-input">
                    <CardElement id="card-element" options={cardStyle} />
                </div>

                <button type="submit" className="btn-pagar">Pagar</button>
            </form>
            {errorMessage && <p className='error'>{errorMessage}</p>}
        </div>
    );
}

export default PasarelaDePago;
*/


import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/stylesPago.css';

function PasarelaDePago() {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si Stripe.js ha sido cargado
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setErrorMessage("Error al obtener el elemento de tarjeta.");
            return;
        }

        // Crear un token de tarjeta
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setErrorMessage(error.message);
        } else {
            console.log('ID del pago:', paymentMethod.id);
            setErrorMessage('Pago procesado con éxito.');
        }
    };

    const cardStyle = {
        style: {
            base: {
                color: '#32325d',
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#a0aec0',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    };

    return (
        <div className="pasarela-pago-container">
            <h2>Pasarela de Pago</h2>
            <form className="payment-form" onSubmit={handleSubmit}>
                <label htmlFor="card-element">
                    Ingresa los detalles de tu tarjeta:
                </label>
                <div className="card-input">
                    <CardElement id="card-element" options={cardStyle} />
                </div>
                <button type="submit" className="btn-pagar">Pagar</button>
            </form>
            {errorMessage && <p className='error'>{errorMessage}</p>}
        </div>
    );
}

export default PasarelaDePago;
