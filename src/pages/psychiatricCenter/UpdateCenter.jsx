import React, { useState } from 'react';
import './UpdateCenter.css';

const UpdateCenter = () => {
  const [centerId, setCenterId] = useState('');
  const [formData, setFormData] = useState(null);
  const [message, setMessage] = useState('');

  const handleLoad = async (e) => {
    e.preventDefault();
    setMessage('');
    setFormData(null);

    if (!centerId.trim()) {
      setMessage('Por favor ingresa un ID');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/psychiatric-centers/${centerId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'No se encontró el centro');

      setFormData({
        ...data,
        services: data.services.join(', ')
      });
    } catch (err) {
      console.error(err);
      setMessage('No se pudo obtener el centro.');

      /*
      // Mock de centro
      const mockCenter = {
        name: 'Centro Actualizable',
        licenseNumber: 'LIC-EDIT',
        description: 'Centro editable',
        phone: '502 2222 3333',
        email: 'edit@centros.gt',
        website: 'https://edit.gt',
        address: {
          country: 'Guatemala',
          department: 'Guatemala',
          municipality: 'Ciudad',
          zone: '9',
          street: '7a Avenida',
          building: 'Torre 2'
        },
        services: 'Psicoterapia, Apoyo emocional',
        workingHours: {
          open: '09:00',
          close: '18:00'
        },
        isPublic: true
      };
      setFormData(mockCenter);
      */
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [field]: value
        }
      });
    } else if (name.startsWith('workingHours.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        workingHours: {
          ...formData.workingHours,
          [field]: value
        }
      });
    } else if (name === 'isPublic') {
      setFormData({ ...formData, isPublic: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');

    const updatedData = {
      ...formData,
      services: formData.services.split(',').map(s => s.trim())
    };

    try {
      const res = await fetch(`http://localhost:3000/api/psychiatric-centers/${centerId}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Error al actualizar');

      setMessage('Centro actualizado exitosamente');
    } catch (err) {
      console.error(err);
      setMessage('No se pudo actualizar el centro.');

      /*
      // Mock de actualización
      console.log('Mock: datos enviados para actualizar', updatedData);
      setMessage('Mock: Centro actualizado localmente (sin conexión)');
      */
    }
  };

  return (
    <div className="update-container">
      <h1>Actualizar Centro</h1>
      <form onSubmit={handleLoad} className="load-form">
        <input
          type="text"
          placeholder="ID del centro"
          value={centerId}
          onChange={(e) => setCenterId(e.target.value)}
        />
        <button type="submit">Cargar datos</button>
      </form>

      {message && <p className="message">{message}</p>}

      {formData && (
        <form onSubmit={handleUpdate} className="update-form">
          <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
          <input type="text" name="licenseNumber" placeholder="Número de Licencia" value={formData.licenseNumber} onChange={handleChange} required />
          <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange}></textarea>
          <input type="text" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="url" name="website" placeholder="Sitio Web" value={formData.website} onChange={handleChange} />

          <fieldset>
            <legend>Dirección</legend>
            <input type="text" name="address.department" placeholder="Departamento" value={formData.address.department} onChange={handleChange} required />
            <input type="text" name="address.municipality" placeholder="Municipio" value={formData.address.municipality} onChange={handleChange} required />
            <input type="text" name="address.zone" placeholder="Zona" value={formData.address.zone} onChange={handleChange} required />
            <input type="text" name="address.street" placeholder="Calle" value={formData.address.street} onChange={handleChange} required />
            <input type="text" name="address.building" placeholder="Edificio" value={formData.address.building} onChange={handleChange} />
          </fieldset>

          <input type="text" name="services" placeholder="Servicios (separados por coma)" value={formData.services} onChange={handleChange} />

          <fieldset>
            <legend>Horario</legend>
            <input type="time" name="workingHours.open" value={formData.workingHours.open} onChange={handleChange} required />
            <input type="time" name="workingHours.close" value={formData.workingHours.close} onChange={handleChange} required />
          </fieldset>

          <label>
            <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} />
            ¿Centro Público?
          </label>

          <button type="submit">Actualizar Centro</button>
        </form>
      )}
    </div>
  );
};

export default UpdateCenter;