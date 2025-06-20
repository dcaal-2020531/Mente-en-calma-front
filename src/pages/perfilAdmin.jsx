import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/perfilCliente.css';  // Puedes usar un CSS distinto si prefieres

const PerfilAdmin = () => {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token al montar PerfilAdmin:', token);
        if (!token) {
          setError('No estás autenticado.');
          return;
        }

        const res = await fetch('http://localhost:1234/v1/admin/getAdmin', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setAdmin(data.admin || data.user); // Asegúrate de que el backend lo devuelva como "admin"
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
    navigate('/adminlogin'); // Ruta de login para admin
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo">🧠 Mente en Calma - Admin</div>
        <nav>
          <ul>
            <li><a onClick={() => navigate('/menuAdmin')}>Inicio</a></li>
            <li><a onClick={() => navigate('/perfilAdmin')}>Mi Perfil</a></li>
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

        {admin ? (
          <div className="perfil-container">
            <div className="perfil-card">
              <p><strong>Nombre:</strong> {admin.name} {admin.surname}</p>
              <p><strong>Usuario:</strong> {admin.username}</p>
              <p><strong>Email:</strong> {admin.email}</p>
              <p><strong>Teléfono:</strong> {admin.phone}</p>
              <p><strong>Rol:</strong> {admin.role}</p>
              <p><strong>Estado:</strong> {admin.status ? 'Activo' : 'Inactivo'}</p>
            </div>
          </div>
        ) : (
          !error && <p style={{ textAlign: 'center' }}>Cargando datos del perfil...</p>
        )}
      </main>

      <footer>
        <p>&copy; 2025 Mente en Calma | Administrador</p>
      </footer>
    </div>
  );
};

export default PerfilAdmin;
