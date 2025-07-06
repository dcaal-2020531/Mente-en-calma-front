import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/verPsicologos.css';

const VerPsicologos = () => {
  const [psicologos, setPsicologos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Función para cargar psicólogos del backend
  const fetchPsicologos = async () => {
    try {
      const response = await fetch('http://localhost:1234/v1/psychologist/verPsicologos');
      if (!response.ok) {
        throw new Error('Error al obtener los psicólogos');
      }
      const data = await response.json();
      setPsicologos(data.psicologos || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPsicologos();
  }, []);

  if (loading) {
    return <p>Cargando psicólogos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (psicologos.length === 0) {
    return <p>No hay psicólogos disponibles.</p>;
  }

  return (
    <div className="app-container">
      <header>
        <div className="logo">🧠 Mente en Calma</div>
        <nav>
          <ul>
            <li><a href="/menuCliente">Inicio</a></li>
            <li><a href="/perfilCliente">Mi Perfil</a></li>
            <li><a href="/">Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="bienvenida">
          <h1>Nuestros Psicólogos</h1>
          <p>Conoce a los profesionales que pueden ayudarte en tu proceso.</p>
        </section>

        <section className="opciones">
          {psicologos.map((psico) => (
            <div key={psico._id || psico.id} className="tarjeta">
              <h2>{psico.name} {psico.surname}</h2>
              <p><strong>Especialidad:</strong> {psico.specialties || psico.especialidad}</p>
              <p>Email: {psico.email}</p>

              <button
                onClick={() => navigate(`/reunionCliente/${psico._id || psico.id}`)}
                style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  backgroundColor: '#4a90e2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#367dc9'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#4a90e2'}
              >
                Entrar a la Reunión
              </button>
            </div>
          ))}
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Salud Mental | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default VerPsicologos;
