import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/styleMenuCliente.css';

const ClientMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <header>
        <div className="logo">🧠 Mente en Calma</div>
        <nav>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#" onClick={() => navigate('/perfilCliente')}>Mi Perfil</a></li>
            <li><a href="#">Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="bienvenida">
          <h1>Bienvenido/a, Usuario</h1>
          <p>Nos alegra tenerte aquí. Comienza tu camino hacia el bienestar mental con nosotros.</p>
        </section>

        <section className="opciones">
          <div className="tarjeta">
            <h2>Agendar Cita</h2>
            <p>Elige día y hora para tu próxima consulta con un profesional.</p>
            <button className="link-button" onClick={() => navigate('/asignarCita')}>
              Asignar
            </button>
          </div>
          <div className="tarjeta">
            <h2>Ver Psicólogos</h2>
            <p>Explora el perfil de nuestros especialistas y elige con quién trabajar.</p>
            <button className="link-button" onClick={() => navigate('/verPsicologos')}>
              Ver
            </button>
          </div>
          <div className="tarjeta">
            <h2>Material de Apoyo</h2>
            <p>Lee artículos y accede a recursos útiles para tu bienestar.</p>
            <button className="link-button" onClick={() => navigate('/materialApoyo')}>
              Explorar
            </button>
          </div>
             <div className="tarjeta">
            <h2>Ver mis citas</h2>
            <p>Ve cuales citas tienes asignas.</p>
            <button className="link-button" onClick={() => navigate('/verCitasCliente')}>
              Explorar
            </button>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Mente en Calma | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default ClientMenu;