import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
import Registro from './components/Registro';
import ContenedorDispositivos from './components/ContenedorDispositivos';


function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
    <Route path="/" element={<Registro />} />
    <Route path="/loader" element={ <ContenedorDispositivos /> } />
    </Routes>
    </BrowserRouter>   
    </>
  );
}

export default App;
