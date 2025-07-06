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
import VerCitasPsicologo from './pages/verCitasPsicologo.jsx';
import RegisterAdmin from '../src/pages/registerPsicologo.jsx'
import MenuAdmin from '../src/pages/menuAdministrador.jsx'
import AgregarPsicologo from './pages/agregarPsicologo.jsx';
import AgregarPrograma from '../src/pages/agregarPrograma.jsx'
import VerCitasCliente from '../src/pages/verCitasCliente.jsx'
import PerfilCliente from './pages/perfilCliente.jsx';
import PerfilPsicologo from './pages/perfilPsicologo.jsx';
import PerfilAdmin from './pages/perfilAdmin.jsx';
import Login from '../src/pages/login.jsx';
import VerClientes from '../src/pages/verClientes.jsx'
import ReunionVirtualPsicologo from '../src/pages/reunionVirtualPsicologo.jsx'
import ReunionCliente from '../src/pages/reunionCliente.jsx'

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
       <Route path='/verCitasPsicologo' element={<VerCitasPsicologo />} />
       <Route path='/adminLogin' element={<AdminLogin />} />
       <Route path='/registerAdmin' element={<RegisterAdmin />} />
       <Route path='/menuAdmin' element={<MenuAdmin />} />
       <Route path='/agregarPsicologo' element={<AgregarPsicologo />} />
       <Route path='/agregarPrograma' element={<AgregarPrograma />} />
       <Route path='/verCitasCliente' element={<VerCitasCliente />} />
       <Route path='/perfilCliente' element={<PerfilCliente />}/>
       <Route path='/perfilPsicologo' element={<PerfilPsicologo />}/>
       <Route path='/perfilAdmin' element={<PerfilAdmin />}/>
       <Route path='/login' element={<Login />}/>
       <Route path='/verClientes' element={<VerClientes />}/>
       <Route path='/reunionVirtualPsicologo/:id' element={< ReunionVirtualPsicologo />}/>
       <Route path='/reunionCliente/:id' element={< ReunionCliente />}/>

       </Routes>
    </BrowserRouter>
  )
}

export default App
