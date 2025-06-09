import { useState } from 'react'
import InicioSesion from "./components/Login"
import NotFound from './components/NotFound';
import './App.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './components/Home';


function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<InicioSesion />} />
        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    
  );
}

export default App;