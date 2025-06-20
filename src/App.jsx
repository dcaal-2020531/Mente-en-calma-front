import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ClienteLogin  from '../src/pages/login.jsx'

import MenuCliente from '../src/pages/menuCliente.jsx'
import VerPsicologos from '../src/pages/verPsicologos.jsx'
import RegistroClinete from '../src/pages/registerCliente.jsx'
import AsignarCita from '../src/pages/asignarCita.jsx'
import MaterialApoyo from '../src/pages/matetialDeApoyo.jsx'
import MenuPsicologo from '../src/pages/menuPsicologo.jsx'
import LoginPsicologo from './pages/loginPsicologo.jsx'
import AdminLogin from '../src/pages/adminlogin.jsx'
import RegisterPsicologo from '../src/pages/registerPsicologo.jsx'
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClienteLogin />} />
       
       <Route path="/menuCliente" element={<MenuCliente />} />

       <Route path="/verPsicologos" element={<VerPsicologos />} />
       <Route path="/registerCliente" element={<RegistroClinete />} />
       <Route path="/asignarCita" element={<AsignarCita />} /> 
       <Route path="/materialApoyo" element={<MaterialApoyo />} /> 
       <Route path="/menuPsicologo" element={<MenuPsicologo />} /> 
       <Route path="/loginPsicologo" element={<LoginPsicologo />} /> 
       <Route path='/registerPsicologo' element={<RegisterPsicologo />} />
       </Routes>
    </BrowserRouter>
  )
}

export default App
