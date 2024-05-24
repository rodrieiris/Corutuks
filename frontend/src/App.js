import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/navbar';
import Inicio from './paginas/inicio';
import Registro from './paginas/registro';
import Login from './paginas/login';
import Perfil from './paginas/perfil';
import Reservas from './paginas/reservas';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={ <Inicio /> } />
          <Route path="/registro" element={ <Registro /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/perfil" element={ <Perfil /> } />
          <Route path="/reservas" element={ <Reservas /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
