import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import AdminLogin from '../src/pages/adminlogin.jsx'
import ClienteLogin  from '../src/pages/login.jsx'

import MenuCliente from '../src/pages/menuCliente.jsx'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClienteLogin />} />
       
       <Route path="/menuCliente" element={<MenuCliente />} />
       </Routes>
    </BrowserRouter>
  )
}

export default App
