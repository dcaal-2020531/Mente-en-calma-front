import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/login.css';

const LoginPsicologo = () => {
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
      const res = await fetch('http://localhost:1234/v1/auth/loginPsychologist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/menuPsicologo');
      } else {
        setMensaje(data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      setMensaje('Error del servidor. Intenta más tarde.');
    }
  };

  const handleGoToRegister = () => {
    navigate('/registerPsicologo'); // Ajusta la ruta si es diferente
  };


  const handleGoToPsicologoLogin = () => {
    navigate('/');
  };

    const handleGoToAdministrador = () => {
    navigate('/adminlogin');
  };


  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login Psicólogo</h2>

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

        <button
          onClick={handleGoToPsicologoLogin}
          style={{
            marginTop: '1rem',
            backgroundColor: '#4a90e2',
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            width: '100%',
          }}
        >
          Acceder como Cliente
        </button>

          <button
          onClick={handleGoToAdministrador}
          style={{
            marginTop: '1rem',
            backgroundColor: '#4a90e2',
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            width: '100%',
          }}
        >
          Acceder como Administrador
        </button>

        <div className="register-link" style={{ marginTop: '1rem' }}>
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

export default LoginPsicologo;
