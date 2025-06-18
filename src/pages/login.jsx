import React from 'react';
import '../pages/login.css'; // Asegúrate de que la ruta sea correcta

const Login = () => {
  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form>
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
  );
};

export default Login;
