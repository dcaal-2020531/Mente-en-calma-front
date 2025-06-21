import React, { useEffect, useState } from 'react';
import '../css/verPsicologos.css';

const VerPsicologos = () => {
  const [psicologos, setPsicologos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar psicólogos del backend
  const fetchPsicologos = async () => {
    try {
      const response = await fetch('http://localhost:1234/v1/psychologist/verPsicologos'); // Ajusta la URL según tu backend
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
            <li><a href="#">Mi Perfil</a></li>
            <li><a href="#">Cerrar Sesión</a></li>
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
              {/* Aquí puedes agregar más campos que desees mostrar */}
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