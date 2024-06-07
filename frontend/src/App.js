import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from './componentes/navbar';
import Inicio from './paginas/inicio';
import Tours from './paginas/tours';
import SobreNosotros from './paginas/sobreNosotros';
import Contacto from './paginas/contacto';
import Registro from './paginas/registro';
import Login from './paginas/login';
import Perfil from './paginas/perfil';
import Privacidad from './paginas/privacidad';
import Legal from './paginas/legal';
import Cookies from './paginas/cookies';
import InfoTours1 from './Info Tours/infoTours1';
import InfoTours2 from './Info Tours/infoTours2';
import InfoTours3 from './Info Tours/infoTours3';
import Reservar1 from './Reservas/reservar1';
import Reservar2 from './Reservas/reservar2';
import Reservar3 from './Reservas/reservar3';
import PasarelaDePago  from './componentes/pasarelaDePago';
import Footer from './componentes/footer';

// Creamos una instancia de Stripe.js
const stripe = loadStripe('tu_llave_publica_de_stripe');

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="contenido">
          <Routes>
            <Route path="/" element={ <Inicio /> } />
            <Route path="/tours" element={ <Tours /> } />
            <Route path="/sobre-nosotros" element={ <SobreNosotros /> } />
            <Route path="/contacto" element={ <Contacto /> } />
            <Route path="/registro" element={ <Registro /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/perfil" element={ <Perfil /> } />
            <Route path="/privacidad" element={ <Privacidad /> } />
            <Route path="/legal" element={ <Legal /> } />
            <Route path="/cookies" element={ <Cookies /> } />
            <Route path="/info-tours-1" element={ <InfoTours1 /> } />
            <Route path="/info-tours-2" element={ <InfoTours2 /> } />
            <Route path="/info-tours-3" element={ <InfoTours3 /> } />
            <Route path="/reservar-1" element={ <Reservar1 /> } />
            <Route path="/reservar-2" element={ <Reservar2 /> } />
            <Route path="/reservar-3" element={ <Reservar3 /> } />
            <Route
              path="/pasarela-de-pago"
              element={
                <Elements stripe={ stripe }>
                  <PasarelaDePago />
                </Elements>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
