import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías validar email y contraseña antes
    navigate('/menuCliente'); // Redirección
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="text" id="email" name="email" required />

          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required />

          <button type="submit">Ingresar</button>
        </form>

        <div className="register-link">
          <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;