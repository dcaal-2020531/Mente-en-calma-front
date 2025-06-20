import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/menuPsicologo.css';

const PsicologoMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <header>
        <div className="logo">🧠 Mente en Calma - Administrador</div>
        <nav>
          <ul>
            <li><a href="#" onClick={() => navigate('/')}>Inicio</a></li>
            <li><a href="#" onClick={() => navigate('/perfilAdmin')}>Mi Perfil</a></li>
            <li><a href="#" onClick={() => navigate('/logout')}>Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="bienvenida">
          <h1>Bienvenido/a, Psicólogo</h1>
          <p>Administra el personal y los centros de atención.</p>
        </section>

        <section className="opciones">
          <div className="tarjeta">
            <h2>Agregar Psicólogo</h2>
            <p>Registra un nuevo psicólogo en el sistema.</p>
            <button className="link-button" onClick={() => navigate('/registerPsychologist')}>
              Agregar
            </button>
          </div>
          <div className="tarjeta">
            <h2>Agregar Centro Psiquiátrico</h2>
            <p>Incorpora un nuevo centro al sistema de salud mental.</p>
            <button className="link-button" onClick={() => navigate('/registerCentro')}>
              Agregar
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

export default PsicologoMenu;
