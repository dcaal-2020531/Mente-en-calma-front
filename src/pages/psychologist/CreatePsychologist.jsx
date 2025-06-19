import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './create-psychologist.css';

const CreatePsychologist = () => {
  const navigate = useNavigate();
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

  /*
  // Mock para simulación local
  const mockPsychologist = {
    name: "Claudia",
    surname: "Martínez",
    email: "claudia@mail.com",
    password: "123456",
    birthdate: "1985-05-20",
    phone: "555-7890",
    country: "México",
    departament: "Salud mental",
    gender: "Mujer",
    specialties: "Ansiedad"
  };
  */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/psychologist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const result = await res.json();

      if (result.success) {
        alert('Psicólogo creado correctamente');
        navigate('/list-psychologist');
      } else {
        alert('Error al crear psicólogo: ' + (result.message || ''));
      }
    } catch (err) {
      console.error('Error en POST:', err);

      // Descomenta para simular éxito con mock
      /*
      console.log('Simulación de envío con mock:', mockPsychologist);
      alert('Simulación: psicólogo creado (mock)');
      navigate('/list-psychologist');
      */
    }
  };

  return (
    <div className="form-container">
      <header>
        <h1>Agregar Psicólogo</h1>
        <button onClick={() => navigate('/list-psychologist')}>← Volver a la lista</button>
      </header>

      <form onSubmit={handleSubmit}>
        {[
          { label: 'Nombre', name: 'name' },
          { label: 'Apellido', name: 'surname' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Contraseña', name: 'password', type: 'password' },
          { label: 'Fecha de nacimiento', name: 'birthdate', type: 'date' },
          { label: 'Teléfono', name: 'phone' },
          { label: 'País', name: 'country' },
          { label: 'Departamento', name: 'departament' }
        ].map(({ label, name, type = 'text' }) => (
          <div className="form-group" key={name}>
            <label>{label}:</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="form-group">
          <label>Género:</label>
          <select name="gender" value={form.gender} onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
          </select>
        </div>

        <div className="form-group">
          <label>Especialidad:</label>
          <select name="specialties" value={form.specialties} onChange={handleChange} required>
            <option value="">Seleccionar</option>
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

        <button type="submit">Crear Psicólogo</button>
      </form>
    </div>
  );
};

export default CreatePsychologist;