import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './list-psychologist.css';

const ListPsychologist = () => {
  const [psychologists, setPsychologists] = useState([]);
  const navigate = useNavigate();

  /*
  // Mock de datos
  const mockPsychologists = [
    {
      _id: "1",
      name: "Ana",
      surname: "Gómez",
      email: "ana.gomez@mail.com",
      phone: "555-1234",
      specialties: "Ansiedad"
    },
    {
      _id: "2",
      name: "Luis",
      surname: "Ramírez",
      email: "luis.ramirez@mail.com",
      phone: "555-5678",
      specialties: "Depresión"
    }
  ];
  */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/psychologist/getall');
        const data = await res.json();
        if (data.psychologists) {
          setPsychologists(data.psychologists);
        } else {
          setPsychologists([]);
        }
      } catch (err) {
        console.error('Error al obtener psicólogos:', err);
        // setPsychologists(mockPsychologists); // descomenta para usar mock
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-psychologist/${id}`);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este psicólogo?')) {
      try {
        const res = await fetch(`http://localhost:3000/api/psychologist/${id}`, {
          method: 'DELETE'
        });
        const result = await res.json();
        alert(result.message);
        setPsychologists(psychologists.filter(p => p._id !== id));
      } catch (err) {
        console.error(err);
        alert('Error al eliminar el psicólogo.');
      }
    }
  };

  return (
    <div className="list-container">
      <header>
        <h1>Gestión de Psicólogos</h1>
        <button onClick={() => navigate('/create-psychologist')}>+ Agregar Psicólogo</button>
      </header>

      <main>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Especialidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {psychologists.length > 0 ? (
              psychologists.map(ps => (
                <tr key={ps._id}>
                  <td>{ps.name}</td>
                  <td>{ps.surname}</td>
                  <td>{ps.email}</td>
                  <td>{ps.phone}</td>
                  <td>{ps.specialties}</td>
                  <td>
                    <button onClick={() => handleEdit(ps._id)}>Editar</button>
                    <button onClick={() => handleDelete(ps._id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No se encontraron psicólogos.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ListPsychologist;