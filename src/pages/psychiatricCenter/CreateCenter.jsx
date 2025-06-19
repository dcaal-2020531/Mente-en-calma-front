import React, { useState } from 'react';
import './CreateCenter.css';

const CreateCenter = () => {
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: {
      country: 'Guatemala',
      department: '',
      municipality: '',
      zone: '',
      street: '',
      building: ''
    },
    services: '',
    workingHours: {
      open: '',
      close: ''
    },
    isPublic: false
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.address) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value
        }
      });
    } else if (name in formData.workingHours) {
      setFormData({
        ...formData,
        workingHours: {
          ...formData.workingHours,
          [name]: value
        }
      });
    } else if (name === 'isPublic') {
      setFormData({ ...formData, isPublic: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      services: formData.services.split(',').map((s) => s.trim())
    };

    try {
      const res = await fetch('http://localhost:3000/api/psychiatric-centers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || 'Error al crear');

      setMessage('Centro creado exitosamente');
      setFormData({
        name: '',
        licenseNumber: '',
        description: '',
        phone: '',
        email: '',
        website: '',
        address: {
          country: 'Guatemala',
          department: '',
          municipality: '',
          zone: '',
          street: '',
          building: ''
        },
        services: '',
        workingHours: {
          open: '',
          close: ''
        },
        isPublic: false
      });
    } catch (err) {
      console.error(err);
      setMessage('No se pudo conectar al servidor.');

      /*
      // Mock para pruebas sin backend
      console.log('Mock POST', dataToSend);
      setMessage('Mock: Centro creado localmente (sin conexión)');
      */
    }
  };

  return (
    <div className="create-container">
      <h1>Registrar Nuevo Centro Psiquiátrico</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
        <input type="text" name="licenseNumber" placeholder="Número de Licencia" value={formData.licenseNumber} onChange={handleChange} required />
        <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange}></textarea>
        <input type="text" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required />
        <input type="url" name="website" placeholder="Sitio Web" value={formData.website} onChange={handleChange} />

        <fieldset>
          <legend>Dirección</legend>
          <input type="text" name="department" placeholder="Departamento" value={formData.address.department} onChange={handleChange} required />
          <input type="text" name="municipality" placeholder="Municipio" value={formData.address.municipality} onChange={handleChange} required />
          <input type="text" name="zone" placeholder="Zona" value={formData.address.zone} onChange={handleChange} required />
          <input type="text" name="street" placeholder="Calle" value={formData.address.street} onChange={handleChange} required />
          <input type="text" name="building" placeholder="Edificio" value={formData.address.building} onChange={handleChange} />
        </fieldset>

        <input type="text" name="services" placeholder="Servicios (separados por coma)" value={formData.services} onChange={handleChange} required />

        <fieldset>
          <legend>Horario de Atención</legend>
          <input type="time" name="open" value={formData.workingHours.open} onChange={handleChange} required />
          <input type="time" name="close" value={formData.workingHours.close} onChange={handleChange} required />
        </fieldset>

        <label>
          <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} />
          ¿Centro Público?
        </label>

        <button type="submit">Crear Centro</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreateCenter;