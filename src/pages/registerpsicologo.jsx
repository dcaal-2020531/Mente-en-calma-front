import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/registerPsicologo.css';

const RegisterPsychologist = () => {
  const navigate = useNavigate();

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
    specialties: ''
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:1234/v1/psychologist/createPsychologist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registro exitoso. Puedes iniciar sesión.');
        navigate('/loginPsicologo');
      } else {
        setMensaje(data.message || 'Error al registrar psicólogo.');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setMensaje('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="form-container">
      <h2>Registro de Psicólogo</h2>

      {mensaje && <p style={{ color: 'red', textAlign: 'center' }}>{mensaje}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="surname">Apellido:</label>
        <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} required />

        <label htmlFor="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

        <label htmlFor="birthdate">Fecha de nacimiento:</label>
        <input type="date" id="birthdate" name="birthdate" value={formData.birthdate} onChange={handleChange} required />

        <label htmlFor="phone">Teléfono:</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

        <label htmlFor="country">País:</label>
        <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />

        <label htmlFor="departament">Departamento:</label>
        <input type="text" id="departament" name="departament" value={formData.departament} onChange={handleChange} required />

        <label htmlFor="gender">Género:</label>
        <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="" disabled>Selecciona tu género</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
        </select>

        <label htmlFor="specialties">Especialidad:</label>
        <select id="specialties" name="specialties" value={formData.specialties} onChange={handleChange} required>
          <option value="" disabled>Selecciona una especialidad</option>
          <option value="Ansiedad">Ansiedad</option>
          <option value="Depresión">Depresión</option>
          <option value="TDAH">TDAH</option>
          <option value="Trastornos alimenticios">Trastornos alimenticios</option>
          <option value="Estrés postraumático">Estrés postraumático</option>
          <option value="Duelo">Duelo</option>
          <option value="Relaciones">Relaciones</option>
          <option value="Autoestima">Autoestima</option>
          <option value="Otro">Otro</option>
        </select>

        <button type="submit">Registrarse</button>
      </form>

      <p className="switch-link">
        ¿Ya tienes una cuenta? <a href="/loginPsicologo">Inicia sesión aquí</a>
      </p>
    </div>
  );
};

export default RegisterPsychologist;