import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import '../css/asignarCita.css';

const AsignarCita = () => {
  const [form, setForm] = useState({
    psychologist: '',
    date: '',
    notes: ''
  });
  const [psychologists, setPsychologists] = useState([]);

  useEffect(() => {
    // Cargar psicólogos al montar el componente
    fetch('http://localhost:1234/v1/psychologist/verPsicologos')
      .then(res => res.json())
      .then(data => {
        if (data.psicologos) {
          setPsychologists(data.psicologos);
        }
      })
      .catch(err => console.error('Error al cargar psicólogos:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Debes iniciar sesión para asignar una cita');
        return;
      }

      const res = await fetch('http://localhost:1234/v1/appointment/crearCita', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          psychologist: form.psychologist,
          date: form.date,
          notes: form.notes
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Cita creada exitosamente');
        setForm({ psychologist: '', date: '', notes: '' }); // limpiar formulario
      } else {
        alert(data.message || 'Error al crear cita');
      }
    } catch (err) {
      console.error(err);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo">🧠 Mente en Calma</div>
        <nav>
          <ul>
            <li><a href="/menuCliente">Inicio</a></li>
            <li><a href="#">Mi Perfil</a></li>
            <li><a href="#">Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="bienvenida">
          <h1>Asignar Cita</h1>
          <p>Elige al profesional, fecha y anota cualquier detalle necesario.</p>
        </section>

        <form className="formulario-cita" onSubmit={handleSubmit}>
          <div className="formulario-group">
            <label htmlFor="psychologist">Psicólogo:</label>
            <select
              name="psychologist"
              value={form.psychologist}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un psicólogo</option>
              {psychologists.map((psico) => (
                <option key={psico._id} value={psico._id}>
                  {psico.name} {psico.surname} - {psico.specialties}
                </option>
              ))}
            </select>
          </div>

          <div className="formulario-group">
            <label htmlFor="date">Fecha y hora:</label>
            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formulario-group">
            <label htmlFor="notes">Notas (opcional):</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Agendar Cita</button>
        </form>
      </main>

      <footer>
        <p>&copy; 2025 Mente en Calma | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default AsignarCita;
