import React from 'react';
import './style.css';

const LoginPsychologist = () => {
  return (
    <div className="form-container">
      <h2>Login Psicólogo</h2>
      <form method="POST" action="/login-psychologist">
        <label htmlFor="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Iniciar Sesión</button>
      </form>

      <p className="switch-link">
        ¿No tienes cuenta? <a href="registerpsicologo.html">Regístrate aquí</a>
      </p>
    </div>
  );
};

export default LoginPsychologist;
