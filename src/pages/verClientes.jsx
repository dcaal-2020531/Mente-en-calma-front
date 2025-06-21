import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/verClientes.css';

const VerClientesPsicologo = () => {
  const [clientes, setClientes] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:1234/v1/user/getall', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setClientes(data.users);
        } else {
          setMensaje(data.message || 'No se pudieron cargar los clientes');
        }
      } catch (error) {
        console.error('Error al obtener clientes:', error);
        setMensaje('Error del servidor');
      }
    };

    fetchClientes();
  }, []);

  return (
    <div className="app-container">
    <header>
        <div className="logo">🧠 Mente en Calma - Psicólogo</div>
        <nav>
          <ul>
            <li><a href="#" onClick={() => navigate('/')}>Inicio</a></li>
            <li><a href="#" onClick={() => navigate('/perfilPsicologo')}>Mi Perfil</a></li>
            <li><a href="#" onClick={() => navigate('/loginPsicologo')}>Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="bienvenida">
          <h1>Clientes Registrados</h1>
          <p>Aquí puedes consultar la información de los clientes registrados en el sistema.</p>
        </section>

        {mensaje && <p className="mensaje-error">{mensaje}</p>}

        <section className="lista-clientes">
          {clientes.map((cliente, index) => (
            <div className="cliente-card" key={index}>
              <h3>{cliente.name} {cliente.surname}</h3>
              <p><strong>Email:</strong> {cliente.email}</p>
              <p><strong>Teléfono:</strong> {cliente.phone}</p>
              <p><strong>Fecha de nacimiento:</strong> {new Date(cliente.birthdate).toLocaleDateString()}</p>
              <p><strong>Género:</strong> {cliente.gender}</p>
              <p><strong>País:</strong> {cliente.country}</p>
              <p><strong>Departamento:</strong> {cliente.departament}</p>
            </div>
          ))}
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Mente en Calma | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default VerClientesPsicologo;
