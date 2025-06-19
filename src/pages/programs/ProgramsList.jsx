import React, { useEffect, useState } from 'react';
import './programs-list.css';

const ProgramsList = () => {
  const [programs, setPrograms] = useState([]);
  const [message, setMessage] = useState('Cargando programas...');

  const TOKEN = 'TU_TOKEN_AQUI'; // 🔐 Reemplaza por tu token real o método seguro

  const fetchPrograms = async () => {
    setMessage('Cargando programas...');
    try {
      const res = await fetch('/getall', {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const data = await res.json();

      if (!res.ok || !data.programss) {
        setMessage('No se pudieron obtener los programas.');
        return;
      }

      setPrograms(data.programss);
      setMessage('');
    } catch (err) {
      console.error(err);
      setMessage('Error de red o servidor.');
    }
  };

  useEffect(() => {
    // Descomenta esta línea para usar el backend
    // fetchPrograms();

    // Comentario: Mock para usar sin backend
    const mockData = [
      {
        _id: '1',
        name: 'Terapia para Ansiedad',
        description: 'Manejo emocional.',
        type: 'Ansiedad',
        modality: 'Virtual',
        date: '2025-07-01T00:00:00.000Z',
        place: 'Zoom',
      },
      {
        _id: '2',
        name: 'Programa de Mindfulness',
        description: 'Entrenamiento en atención plena.',
        type: 'Mindfulness',
        modality: 'Presencial',
        date: '2025-08-15T00:00:00.000Z',
        place: 'Centro Comunitario',
      },
    ];
    setPrograms(mockData);
    setMessage('');
  }, []);

  const deleteProgram = async (id, name) => {
    const confirmed = window.confirm(`¿Estás seguro de eliminar "${name}"?`);
    if (!confirmed) return;

    try {
      const res = await fetch(`/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || 'Error al eliminar el programa.');
        return;
      }

      alert('Programa eliminado correctamente.');
      fetchPrograms();
    } catch (err) {
      console.error(err);
      alert('Error de red o servidor.');
    }
  };

  const formatDate = (str) => {
    const d = new Date(str);
    return d.toLocaleDateString('es-ES');
  };

  return (
    <div className="container">
      <h1>Programas Disponibles</h1>
      <button id="reload-btn" onClick={fetchPrograms}>Recargar lista</button>

      {message && <p id="message">{message}</p>}

      <table id="programs-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Modalidad</th>
            <th>Fecha</th>
            <th>Lugar</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.type}</td>
              <td>{p.modality}</td>
              <td>{formatDate(p.date)}</td>
              <td>{p.place || '-'}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteProgram(p._id, p.name)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramsList;
