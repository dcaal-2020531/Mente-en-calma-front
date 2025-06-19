import React, { useState } from 'react';
import './ViewCenter.css';

const ViewCenter = () => {
  const [centerId, setCenterId] = useState('');
  const [center, setCenter] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setCenter(null);

    if (!centerId.trim()) {
      setError('Por favor ingresa un ID');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/psychiatric-centers/${centerId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Error al obtener centro');

      setCenter(data);
    } catch (err) {
      console.error(err);
      setError('No se pudo conectar al servidor o el centro no existe.');

      /*
      // Mock de datos
      const mockData = {
        _id: '1',
        name: 'Centro Mock',
        licenseNumber: 'LIC-999',
        phone: '502 1234 5678',
        email: 'mock@centros.gt',
        website: 'https://mock.gt',
        address: {
          country: 'Guatemala',
          department: 'Guatemala',
          municipality: 'Zona 1',
          zone: '1',
          street: '5ta Avenida',
          building: 'Edif. Azul'
        },
        services: ['Psicología', 'Psiquiatría'],
        workingHours: {
          open: '08:00',
          close: '17:00'
        },
        isPublic: true
      };
      setCenter(mockData);
      */
    }
  };

  return (
    <div className="view-container">
      <h1>Buscar Centro por ID</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="ID del Centro"
          value={centerId}
          onChange={(e) => setCenterId(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p className="error">{error}</p>}

      {center && (
        <div className="center-details">
          <h2>{center.name}</h2>
          <p><strong>Licencia:</strong> {center.licenseNumber}</p>
          <p><strong>Teléfono:</strong> {center.phone}</p>
          <p><strong>Email:</strong> {center.email}</p>
          {center.website && (
            <p><strong>Sitio Web:</strong> <a href={center.website} target="_blank" rel="noopener noreferrer">{center.website}</a></p>
          )}
          <p><strong>Dirección:</strong> {`${center.address?.street}, Zona ${center.address?.zone}, ${center.address?.municipality}, ${center.address?.department}, ${center.address?.country}`}</p>
          {center.address?.building && <p><strong>Edificio:</strong> {center.address.building}</p>}
          <p><strong>Servicios:</strong> {center.services.join(', ')}</p>
          <p><strong>Horario:</strong> {center.workingHours.open} - {center.workingHours.close}</p>
          <p><strong>Centro Público:</strong> {center.isPublic ? 'Sí' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default ViewCenter;