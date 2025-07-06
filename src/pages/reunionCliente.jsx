import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../css/reunionCliente.css';

const ReunionCliente = () => {
  const { id } = useParams(); // id psicólogo
  const navigate = useNavigate();

  const socketRef = useRef(null);

  const [mensajes, setMensajes] = useState([]);
  const [mensajeInput, setMensajeInput] = useState('');
  const [linkReunion, setLinkReunion] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    socketRef.current = io('http://localhost:1234');

    // Unirse a sala privada del psicólogo (y cliente)
    socketRef.current.emit('joinRoom', id);

    // Escuchar mensajes de chat
    socketRef.current.on('chat:mensaje', (msg) => {
      if (msg && msg.texto) {
        setMensajes((prev) => [...prev, msg]);
      }
    });

    // Escuchar enlace enviado por psicólogo
    socketRef.current.on('reunion:link', ({ psicologoId, start_url, join_url }) => {
      if (psicologoId === id) {
        setLinkReunion({ start_url, join_url });
      }
    });

    socketRef.current.on('connect_error', () => {
      setError('No se pudo conectar al servidor de chat');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [id]);

  const enviarMensaje = () => {
    if (mensajeInput.trim() !== '') {
      const mensajeObj = { psicologoId: id, texto: `Cliente: ${mensajeInput.trim()}` };
      socketRef.current.emit('chat:mensaje', mensajeObj);
      setMensajeInput('');
      // No agregar mensaje localmente para evitar duplicados
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="app-container" style={{ maxWidth: '700px', margin: 'auto', padding: '1rem' }}>
      <header>
        <div className="logo">🧠 Mente en Calma</div>
        <nav>
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/menuCliente'); }}>Inicio</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/perfilCliente'); }}>Mi Perfil</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <h1>Reunión con Psicólogo</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!linkReunion ? (
        <p>Esperando enlace de la reunión del psicólogo...</p>
      ) : (
        <div>
          <p><strong>Enlace para unirse:</strong></p>
          <a href={linkReunion.join_url} target="_blank" rel="noreferrer">{linkReunion.join_url}</a>
        </div>
      )}

      <div style={{ marginTop: '2rem', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
        <h2>💬 Chat en vivo</h2>
        <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '10px', background: '#f9f9f9', padding: '10px' }}>
          {mensajes.map((msg, i) => (
            <p key={i} style={{ margin: '4px 0' }}>{msg.texto}</p>
          ))}
        </div>
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={mensajeInput}
          onChange={(e) => setMensajeInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
          style={{ width: '80%', padding: '8px' }}
        />
        <button
          onClick={enviarMensaje}
          style={{
            width: '18%',
            marginLeft: '2%',
            padding: '8px',
            cursor: 'pointer',
            backgroundColor: '#4a90e2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ReunionCliente;
