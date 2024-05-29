import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/navbar';
import Inicio from './paginas/inicio';
import Reservas from './paginas/reservas';
import SobreNosotros from './paginas/sobreNosotros';
import Contacto from './paginas/contacto';
import Registro from './paginas/registro';
import Login from './paginas/login';
import Perfil from './paginas/perfil';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={ <Inicio /> } />
          <Route path="/reservas" element={ <Reservas /> } />
          <Route path="/sobreNosotros" element={ <SobreNosotros /> } />
          <Route path="/contacto" element={ <Contacto /> } />
          <Route path="/registro" element={ <Registro /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/perfil" element={ <Perfil /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;