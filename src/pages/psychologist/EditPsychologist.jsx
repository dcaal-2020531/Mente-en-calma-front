import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './edit-psychologist.css';

const EditPsychologist = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    birthdate: '',
    phone: '',
    country: '',
    departament: '',
    gender: '',
    specialties: ''
  });

  /*
  // Mock para pruebas locales
  const mockPsychologist = {
    _id: "mock123",
    name: "Carlos",
    surname: "López",
    email: "carlos@mail.com",
    birthdate: "1980-07-15",
    phone: "555-8888",
    country: "Colombia",
    departament: "Psicología",
    gender: "Hombre",
    specialties: "Relaciones"
  };
  */

  useEffect(() => {
    const loadPsychologist = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/psychologist/getall`);
        const data = await res.json();

        const psychologist = data.psychologists.find(p => p._id === id);
        if (!psychologist) {
          alert('Psicólogo no encontrado.');
          return;
        }

        setForm({
          ...psychologist,
          birthdate: new Date(psychologist.birthdate).toISOString().split('T')[0]
        });
      } catch (err) {
        console.error('Error al obtener psicólogo:', err);

        // Descomentar para pruebas con mock
        // setForm({ ...mockPsychologist, birthdate: "1980-07-15" });
      }
    };

    loadPsychologist();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/psychologist/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const result = await res.json();
      alert(result.message || 'Psicólogo actualizado');
      navigate('/list-psychologist');
    } catch (err) {
      console.error('Error en PUT:', err);

      // Descomentar para simular actualización
      /*
      console.log('Actualización simulada con:', form);
      alert('Simulación: psicólogo actualizado (mock)');
      navigate('/list-psychologist');
      */
    }
  };

  return (
    <div className="form-container">
      <header>
        <h1>Editar Psicólogo</h1>
        <button onClick={() => navigate('/list-psychologist')}>← Volver a la lista</button>
      </header>

      <form onSubmit={handleSubmit}>
        {[
          { label: 'Nombre', name: 'name' },
          { label: 'Apellido', name: 'surname' },
          { label: 'Email', name: 'email', type: 'email' },
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

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditPsychologist;