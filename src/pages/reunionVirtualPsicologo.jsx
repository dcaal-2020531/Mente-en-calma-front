import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../css/reunionVirtualPsicologo.css';

const ReunionVirtual = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [startUrl, setStartUrl] = useState('');
  const [joinUrl, setJoinUrl] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [error, setError] = useState('');

  const socketRef = useRef(null);

  // Crear reunión en backend
  const crearReunion = async () => {
    try {
      const res = await fetch('http://localhost:1234/v1/zoom/crear-reunion');
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
      const data = await res.json();

      if (data.start_url && data.join_url) {
        setStartUrl(data.start_url);
        setJoinUrl(data.join_url);
        setError('');
      } else {
        setError('Error al crear la reunión');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('No se pudo generar la reunión. Asegúrate de tener el backend activo.');
    }
  };

  useEffect(() => {
    crearReunion();
  }, []);

  useEffect(() => {
    socketRef.current = io('http://localhost:1234');

    // Unirse a sala del psicólogo
    socketRef.current.emit('joinRoom', id);

    // Recibir mensajes
    socketRef.current.on('chat:mensaje', (msg) => {
      if (msg && msg.texto) {
        setMensajes((prev) => [...prev, msg]);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [id]);

  const enviarMensaje = () => {
    if (mensaje.trim() !== '') {
      const mensajeObj = { psicologoId: id, texto: `Psicólogo: ${mensaje.trim()}` };
      socketRef.current.emit('chat:mensaje', mensajeObj);
      setMensaje('');
      // No agregar mensaje localmente, espera al server para evitar duplicados
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="reunion-container">

      <header>
        <div className="logo">🧠 Mente en Calma - Psicólogo</div>
        <nav>
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/menuPsicologo'); }}>Inicio</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/perfilPsicologo'); }}>Mi Perfil</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <h1>Reunión Virtual</h1>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {!startUrl ? (
        <p>Creando reunión... espera un momento</p>
      ) : (
        <div id="linkContainer">
          <p><strong>🔗 Enlace para el cliente:</strong></p>
          <input type="text" value={joinUrl} readOnly onClick={(e) => e.target.select()} />

          <p><strong>🔑 Enlace del psicólogo:</strong></p>
          <input type="text" value={startUrl} readOnly onClick={(e) => e.target.select()} />

          <p>
            <a href={startUrl} target="_blank" rel="noreferrer" className="link-button">
              Abrir Zoom como Psicólogo
            </a>
          </p>
        </div>
      )}

      <div id="chatBox">
        <h2>💬 Chat en vivo</h2>
        <div
          id="messages"
          style={{
            maxHeight: '250px',
            overflowY: 'auto',
            border: '1px solid #ddd',
            padding: '10px',
            background: '#f9f9f9',
            marginBottom: '10px'
          }}
        >
          {mensajes.map((msg, index) => (
            <p key={index}>{msg.texto}</p>
          ))}
        </div>
        <div id="chatInput" style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
            style={{ flex: 1, padding: '8px', fontSize: '14px' }}
          />
          <button
            onClick={enviarMensaje}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReunionVirtual;
