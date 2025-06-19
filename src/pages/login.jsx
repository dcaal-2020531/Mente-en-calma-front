import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:1234/v1/auth/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Guardar token en localStorage
        localStorage.setItem('token', data.token); // Asegúrate que 'token' sea el nombre correcto en la respuesta
        navigate('/menuCliente');
      } else {
        setMensaje(data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      setMensaje('Error del servidor. Intenta más tarde.');
    }
  };

  const handleGoToRegister = () => {
    navigate('/registerCliente');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>

        {mensaje && <p style={{ color: 'red', textAlign: 'center' }}>{mensaje}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Ingresar</button>
        </form>

        <div className="register-link">
          <p>
            ¿No tienes una cuenta?{' '}
            <span
              onClick={handleGoToRegister}
              style={{ color: '#0083b0', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Regístrate aquí
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;