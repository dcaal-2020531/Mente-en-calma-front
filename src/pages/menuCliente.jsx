import React from 'react';
import '../css/styleMenuCliente.css';

const ClientMenu = () => {
  return (
    <div className="app-container">
      <header>
        <div className="logo">🧠 Mente en Calma</div>
        <nav>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Mi Perfil</a></li>
            <li><a href="#">Sesiones</a></li>
            <li><a href="#">Psicólogos</a></li>
            <li><a href="#">Recursos</a></li>
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
            <h2>Agendar Sesión</h2>
            <p>Elige día y hora para tu próxima consulta con un profesional.</p>
            <a href="#">Agendar</a>
          </div>
          <div className="tarjeta">
            <h2>Ver Psicólogos</h2>
            <p>Explora el perfil de nuestros especialistas y elige con quién trabajar.</p>
            <a href="#">Ver</a>
          </div>
          <div className="tarjeta">
            <h2>Material de Apoyo</h2>
            <p>Lee artículos y accede a recursos útiles para tu bienestar.</p>
            <a href="#">Explorar</a>
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