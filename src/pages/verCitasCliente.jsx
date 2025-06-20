import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/verCitasCliente.css';

const VerCitasUsuario = () => {
  const [appointments, setAppointments] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:1234/v1/user/allCitas', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setAppointments(data.appointments);
        } else {
          setMensaje(data.message || 'No se pudieron cargar las citas');
        }
      } catch (error) {
        console.error('Error al obtener citas:', error);
        setMensaje('Error del servidor');
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="app-container">
      <header>
        <div className="logo">🧠 Mente en Calma - Usuario</div>
        <nav>
          <ul>
            <li><a href="#" onClick={() => navigate('/menuCliente')}>Inicio</a></li>
            <li><a href="#" onClick={() => navigate('/perfilCliente')}>Mi Perfil</a></li>
            <li><a href="#" onClick={() => navigate('/')}>Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="bienvenida">
          <h1>Mis Citas</h1>
          <p>Aquí puedes consultar tus citas programadas.</p>
        </section>

        {mensaje && <p className="mensaje-error">{mensaje}</p>}

        <section className="lista-citas">
          {appointments.map((cita, index) => (
            <div className="cita-card" key={index}>
              <h3>{cita.title || 'Cita con psicólogo'}</h3>
              <p><strong>Fecha:</strong> {new Date(cita.date).toLocaleString()}</p>
              <p><strong>Lugar:</strong> {cita.place || 'No especificado'}</p>
              <p><strong>Modalidad:</strong> {cita.modality || '---'}</p>
              <p><strong>Notas:</strong> {cita.notes || '---'}</p>
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

export default VerCitasUsuario;
