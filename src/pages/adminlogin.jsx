import React from 'react';
import './admin.css';

const AdminLogin = () => {
  return (
    <div className="admin-login-container">
      <h2>Login Administrador</h2>
      <form method="POST" action="/login-admin">
        <label htmlFor="usernameOrEmail">Usuario o Correo electrónico:</label>
        <input type="text" id="usernameOrEmail" name="usernameOrEmail" required />

        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default AdminLogin;
