import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/perfilCliente.css';  // CSS para el perfil (puedes renombrar si quieres)

const PerfilPsicologo = () => {
  const [psicologo, setPsicologo] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token al montar PerfilPsicologo:', token);
        if (!token) {
          setError('No estás autenticado.');
          return;
        }

        const res = await fetch('http://localhost:1234/v1/psychologist/getPyschologist', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setPsicologo(data.psychologist || data.user); 
          // Ajusta la clave según lo que te devuelva tu backend: puede ser "psychologist" o "user"
        } else {
          setError(data.message || 'Error al cargar el perfil');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Error al conectar con el servidor');
      }
    };

    fetchPerfil();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/loginPsicologo'); // Cambia la ruta si es distinto el login para psicólogo
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo">🧠 Mente en Calma</div>
        <nav>
          <ul>
            <li><a onClick={() => navigate('/menuPsicologo')}>Inicio</a></li>
            <li><a onClick={() => navigate('/perfilPsicologo')}>Mi Perfil</a></li>
            <li><a onClick={handleLogout}>Cerrar sesión</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="bienvenida">
          <h1>Mi Perfil</h1>
          <p>Consulta tu información personal registrada.</p>
        </div>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        {psicologo ? (
          <div className="perfil-container">
            <div className="perfil-card">
              <p><strong>Nombre:</strong> {psicologo.name} {psicologo.surname}</p>
              <p><strong>Email:</strong> {psicologo.email}</p>
              <p><strong>Teléfono:</strong> {psicologo.phone}</p>
              <p><strong>Fecha de nacimiento:</strong> {new Date(psicologo.birthdate).toLocaleDateString()}</p>
              <p><strong>Género:</strong> {psicologo.gender}</p>
              <p><strong>País:</strong> {psicologo.country}</p>
              <p><strong>Departamento:</strong> {psicologo.departament}</p>
              <p><strong>Especialidades:</strong> {psicologo.specialties || 'No registrada'}</p>
            </div>
          </div>
        ) : (
          !error && <p style={{ textAlign: 'center' }}>Cargando datos del perfil...</p>
        )}
      </main>

      <footer>
        <p>&copy; 2025 Mente en Calma | Psicólogo</p>
      </footer>
    </div>
  );
};

export default PerfilPsicologo;
