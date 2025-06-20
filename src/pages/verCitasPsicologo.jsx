import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/verCitasPsicologo.css'; // Usa tu CSS general

const VerCitasPsicologo = () => {
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await fetch('http://localhost:1234/v1/psychologist/citasDePsicologo', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setCitas(data.citas);
        } else {
          setError(data.message || 'Error al cargar citas');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Error al conectar con el servidor');
      }
    };

    fetchCitas();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/loginPsicologo');
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo">🧠 Mente en Calma</div>
        <nav>
          <ul>
            <li><a onClick={() => navigate('/menuPsicologo')}>Inicio</a></li>
            <li><a onClick={() => navigate('/verCitasPsicologo')}>Mis Citas</a></li>
            <li><a onClick={() => navigate('/olo')}>Cerrar sesión</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="bienvenida">
          <h1>Mis Citas Programadas</h1>
          <p>Consulta tus próximas sesiones agendadas</p>
        </div>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <div className="opciones">
          {citas.length > 0 ? (
            citas.map((cita) => (
              <div key={cita._id} className="tarjeta">
                <h2>{new Date(cita.date).toLocaleString()}</h2>
                <p><strong>Paciente:</strong> {cita.user?.name} {cita.user?.surname}</p>
                <p><strong>Email:</strong> {cita.user?.email}</p>
                <p><strong>Notas:</strong> {cita.notes || 'Sin notas'}</p>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%' }}>No hay citas registradas.</p>
          )}
        </div>
      </main>

      <footer>
        <p>&copy; 2025 Mente en Calma | Psicólogos</p>
      </footer>
    </div>
  );
};

export default VerCitasPsicologo;
