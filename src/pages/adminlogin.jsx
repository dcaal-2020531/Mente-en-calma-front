import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/admin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:1234/v1/auth/loginAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/menuAdmin');
      } else {
        setMensaje(data.message || 'Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensaje('Error del servidor. Intenta más tarde.');
    }
  };


  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login Administrador</h2>

        {mensaje && (
          <p style={{ color: 'red', textAlign: 'center' }}>{mensaje}</p>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Iniciar Sesión</button>
        </form>

        
      </div>
    </div>
  );
};

export default AdminLogin;
