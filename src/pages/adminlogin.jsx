import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/admin.css';

const AdminLogin = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí podrías hacer una solicitud a tu backend si es necesario
    // Por ahora simplemente redirige al menú principal del cliente
    navigate('/menuCliente');
  };

  return (
    <div className="admin-login-container">
      <h2>Login Administrador</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="usernameOrEmail">Usuario o Correo electrónico:</label>
        <input
          type="text"
          id="usernameOrEmail"
          name="usernameOrEmail"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
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
  );
};

export default AdminLogin;