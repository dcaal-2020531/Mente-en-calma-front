import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/agregarPrograma.css';

const AddProgram = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    modality: '',
    date: '',
    place: '',
  });

  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:1234/v1/programs/createPrograms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje('Programa agregado con éxito');
        setTimeout(() => navigate('/menuAdmin'), 1500);
      } else {
        setMensaje(data.message || 'Error al registrar el programa');
      }
    } catch (error) {
      console.error(error);
      setMensaje('Error del servidor');
    }
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo">🧠 Mente en Calma - Admin</div>
        <nav>
          <ul>
            <li><a href="#" onClick={() => navigate('/menuAdmin')}>Inicio</a></li>
            <li><a href="#" onClick={() => navigate('/menuAdmin')}>Menú</a></li>
            <li><a href="#" onClick={() => navigate('/logout')}>Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="bienvenida">
          <h1>Agregar Programa</h1>
          <p>Llena los datos del programa de apoyo psicológico.</p>
        </section>

        <form className="formulario-cita" onSubmit={handleSubmit}>
          <div className="formulario-group">
            <label htmlFor="name">Nombre del Programa:</label>
            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
          </div>

          <div className="formulario-group">
            <label htmlFor="description">Descripción:</label>
            <textarea id="description" name="description" required value={formData.description} onChange={handleChange}></textarea>
          </div>

          <div className="formulario-group">
            <label htmlFor="type">Tipo:</label>
            <select id="type" name="type" required value={formData.type} onChange={handleChange}>
              <option value="" disabled>Selecciona un tipo</option>
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

          <div className="formulario-group">
            <label htmlFor="modality">Modalidad:</label>
            <select id="modality" name="modality" required value={formData.modality} onChange={handleChange}>
              <option value="" disabled>Selecciona modalidad</option>
              <option value="Virtual">Virtual</option>
              <option value="Presencial">Presencial</option>
            </select>
          </div>

          <div className="formulario-group">
            <label htmlFor="date">Fecha:</label>
            <input type="date" id="date" name="date" required value={formData.date} onChange={handleChange} />
          </div>

          <div className="formulario-group">
            <label htmlFor="place">Lugar (si es presencial):</label>
            <input type="text" id="place" name="place" value={formData.place} onChange={handleChange} />
          </div>

          <button type="submit">Registrar Programa</button>
          {mensaje && <p style={{ color: 'green', marginTop: '1rem' }}>{mensaje}</p>}
        </form>
      </main>

      <footer>
        <p>&copy; 2025 Mente en Calma | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default AddProgram;
