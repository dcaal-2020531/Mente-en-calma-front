import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/perfilCliente.css';  // Añade tu CSS para el perfil

const PerfilCliente = () => {
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No estás autenticado.');
          return;
        }

        const res = await fetch('http://localhost:1234/v1/user/getUserProfile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Pasando el token en el header
          },
        });

        const data = await res.json();

        if (res.ok) {
          setCliente(data.user); // Suponiendo que el backend devuelve el perfil con la clave 'user'
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
    navigate('/loginCliente'); // Redirigir al login
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo">🧠 Mente en Calma</div>
        <nav>
          <ul>
            <li><a onClick={() => navigate('/menuCliente')}>Inicio</a></li>
            <li><a onClick={() => navigate('/perfilCliente')}>Mi Perfil</a></li>
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

        {cliente ? (
          <div className="perfil-container">
            <div className="perfil-card">
              <img
                src={cliente.profileImage || '/default-avatar.png'}
                alt="Foto de perfil"
                style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '1rem' }}
              />
              <p><strong>Nombre:</strong> {cliente.name} {cliente.surname}</p>
              <p><strong>Email:</strong> {cliente.email}</p>
              <p><strong>Teléfono:</strong> {cliente.phone}</p>
              <p><strong>Fecha de nacimiento:</strong> {new Date(cliente.birthdate).toLocaleDateString()}</p>
              <p><strong>Género:</strong> {cliente.gender}</p>
              <p><strong>País:</strong> {cliente.country}</p>
              <p><strong>Departamento:</strong> {cliente.departament}</p>
            </div>
          </div>
        ) : (
          !error && <p style={{ textAlign: 'center' }}>Cargando datos del perfil...</p>
        )}
      </main>

      <footer>
        <p>&copy; 2025 Mente en Calma | Cliente</p>
      </footer>
    </div>
  );
};

export default PerfilCliente;
