import React from 'react';
import './style.css';

const RegisterPsychologist = () => {
  return (
    <div className="form-container">
      <h2>Registro de Psicólogo</h2>
      <form method="POST" action="/register-psychologist">
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="surname">Apellido:</label>
        <input type="text" id="surname" name="surname" required />

        <label htmlFor="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" required />

        <label htmlFor="birthdate">Fecha de nacimiento:</label>
        <input type="date" id="birthdate" name="birthdate" required />

        <label htmlFor="phone">Teléfono:</label>
        <input type="tel" id="phone" name="phone" required />

        <label htmlFor="country">País:</label>
        <input type="text" id="country" name="country" required />

        <label htmlFor="departament">Departamento:</label>
        <input type="text" id="departament" name="departament" required />

        <label htmlFor="gender">Género:</label>
        <select id="gender" name="gender" className="pretty-select" required defaultValue="">
          <option value="" disabled>Selecciona tu género</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
        </select>

        <label htmlFor="specialties">Especialidad:</label>
        <select id="specialties" name="specialties" className="pretty-select" required defaultValue="">
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
        ¿Ya tienes una cuenta? <a href="loginpsicologo.html">Inicia sesión aquí</a>
      </p>
    </div>
  );
};

export default RegisterPsychologist;
