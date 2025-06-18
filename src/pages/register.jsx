import React from 'react';
import '../css/register.css'; // Ajusta la ruta si tu carpeta es distinta

const Register = () => {
  return (
    <div className="register-container">
      <h2>Crear Cuenta</h2>
      <form>
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
        <select id="gender" name="gender" required>
          <option value="">Selecciona una opción</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
        </select>

        <label htmlFor="profileImage">URL de foto de perfil (opcional):</label>
        <input type="url" id="profileImage" name="profileImage" />

        <button type="submit">Registrarse</button>
      </form>

      <div className="login-link">
        <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></p>
      </div>
    </div>
  );
};

export default Register;
