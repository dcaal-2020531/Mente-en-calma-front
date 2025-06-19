import React, { useEffect, useState } from 'react';
import './ListCenters.css';

const ListCenters = () => {
  const [centers, setCenters] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/psychiatric-centers');
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Error al obtener centros');

        setCenters(data);
      } catch (err) {
        console.error(err);
        setError('No se pudo conectar al servidor.');

        /*
        // Mock de datos
        const mockData = [
          {
            _id: '1',
            name: 'Centro Vida',
            licenseNumber: 'LIC-123',
            phone: '502 1234 5678',
            email: 'vida@centros.gt',
            address: {
              department: 'Guatemala',
              municipality: 'Mixco'
            },
            isPublic: true
          },
          {
            _id: '2',
            name: 'Centro Esperanza',
            licenseNumber: 'LIC-456',
            phone: '502 8765 4321',
            email: 'esperanza@centros.gt',
            address: {
              department: 'Quetzaltenango',
              municipality: 'Xela'
            },
            isPublic: false
          }
        ];
        setCenters(mockData);
        */
      }
    };

    fetchCenters();
  }, []);

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`¿Estás seguro que deseas eliminar el centro "${name}"?`);

    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/api/psychiatric-centers/${id}/delete`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Error al eliminar centro');

      setCenters(centers.filter(c => c._id !== id));
      setMessage(`Centro "${name}" eliminado exitosamente`);
    } catch (err) {
      console.error(err);
      setError('No se pudo eliminar el centro.');

      /*
      // 🔧 Mock de eliminación
      console.log(`Mock: Centro con ID ${id} eliminado`);
      setCenters(centers.filter(c => c._id !== id));
      setMessage(`Mock: Centro "${name}" eliminado`);
      */
    }
  };

  return (
    <div className="list-container">
      <h1>Lista de Centros Psiquiátricos</h1>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      {centers.length === 0 && !error ? (
        <p>No hay centros registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Licencia</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Departamento</th>
              <th>Municipio</th>
              <th>Público</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {centers.map(center => (
              <tr key={center._id}>
                <td>{center.name}</td>
                <td>{center.licenseNumber}</td>
                <td>{center.phone}</td>
                <td>{center.email}</td>
                <td>{center.address?.department || '—'}</td>
                <td>{center.address?.municipality || '—'}</td>
                <td>{center.isPublic ? 'Sí' : 'No'}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(center._id, center.name)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListCenters;
