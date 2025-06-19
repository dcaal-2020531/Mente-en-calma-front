import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import AdminLogin from '../src/pages/adminlogin.jsx'
import ClienteLogin  from '../src/pages/login.jsx'

import MenuCliente from '../src/pages/menuCliente.jsx'
import VerPsicologos from '../src/pages/verPsicologos.jsx'
import RegistroClinete from '../src/pages/registerCliente.jsx'
import AsignarCita from '../src/pages/asignarCita.jsx'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClienteLogin />} />
       
       <Route path="/menuCliente" element={<MenuCliente />} />

       <Route path="/verPsicologos" element={<VerPsicologos />} />
       <Route path="/registerCliente" element={<RegistroClinete />} />
       <Route path="/asignarCita" element={<AsignarCita />} /> 
       </Routes>
    </BrowserRouter>
  )
}

export default App
