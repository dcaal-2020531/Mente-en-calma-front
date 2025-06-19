import React, { useState } from 'react';
import '../css/registerCliente.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    birthdate: '',
    phone: '',
    country: '',
    departament: '',
    gender: '',
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
      const res = await fetch('http://localhost:1234/v1/user/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('Usuario registrado con éxito');
        setFormData({
          name: '',
          surname: '',
          email: '',
          password: '',
          birthdate: '',
          phone: '',
          country: '',
          departament: '',
          gender: '',
        });
      } else {
        setMensaje(data.message || 'Ocurrió un error al registrar');
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
      setMensaje('Error del servidor. Intenta más tarde.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Registro de Usuario</h2>

        {mensaje && <p className="mensaje">{mensaje}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label htmlFor="surname">Apellido:</label>
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />

          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label htmlFor="password">Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <label htmlFor="birthdate">Fecha de Nacimiento:</label>
          <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />

          <label htmlFor="phone">Teléfono:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

          <label htmlFor="country">País:</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} required />

          <label htmlFor="departament">Departamento:</label>
          <input type="text" name="departament" value={formData.departament} onChange={handleChange} required />

          <label htmlFor="gender">Género:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
          </select>

          <button type="submit">Registrarse</button>
        </form>

        <div className="login-link">
          <p>¿Ya tienes una cuenta? <a href="/">Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;