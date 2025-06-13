import InicioSesion from "./components/Login";
import NotFound from './components/NotFound';
import Home from './components/Home';
import Form from './components/Form';
import './index.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom';



function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path='/app' element={<Form />} />
        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    
  );
}

export default App;