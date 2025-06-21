import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/asignarCita.css'; // Reutilizamos el CSS compartido

const AgregarPsicologo = () => {
  const [form, setForm] = useState({
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:1234/v1/psychologist/createPsychologist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Psicólogo agregado exitosamente');
        navigate('/menuAdmin');
      } else {
        alert(data.message || 'Error al registrar');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error del servidor');
    }
  };

  return (
    <div>
      <header>
        <div className="logo">🧠 Mente en Calma - Admin</div>
        <nav>
          <ul>
            <li><a href="#" onClick={() => navigate('/menuAdmin')}>Inicio</a></li>
            <li><a href="#" onClick={() => navigate('/perfilAdmin')}>Mi Perfil</a></li>
            <li><a href="#" onClick={() => navigate('/adminLogin')}>Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="bienvenida">
          <h1>Agregar Psicólogo</h1>
          <p>Complete los campos para registrar un nuevo psicólogo.</p>
        </section>

        <form onSubmit={handleSubmit} className="formulario-cita">
          <div className="formulario-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="formulario-group">
            <label htmlFor="surname">Apellido</label>
            <input type="text" name="surname" value={form.surname} onChange={handleChange} required />
          </div>

          <div className="formulario-group">
            <label htmlFor="email">Correo</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="formulario-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>

          <div className="formulario-group">
            <label htmlFor="birthdate">Fecha de Nacimiento</label>
            <input type="date" name="birthdate" value={form.birthdate} onChange={handleChange} required />
          </div>

          <div className="formulario-group">
            <label htmlFor="phone">Teléfono</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
          </div>

          <div className="formulario-group">
            <label htmlFor="country">País</label>
            <input type="text" name="country" value={form.country} onChange={handleChange} required />
          </div>

          <div className="formulario-group">
            <label htmlFor="departament">Departamento</label>
            <input type="text" name="departament" value={form.departament} onChange={handleChange} required />
          </div>

          <div className="formulario-group">
            <label htmlFor="gender">Género</label>
            <select name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Seleccione</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>
          </div>

          <div className="formulario-group">
            <label htmlFor="specialties">Especialidad</label>
            <select name="specialties" value={form.specialties} onChange={handleChange} required>
              <option value="">Seleccione</option>
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
          </div>

          <button type="submit">Registrar Psicólogo</button>
        </form>
      </main>

      <footer>
        <p>&copy; 2025 Mente en Calma | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default AgregarPsicologo;
