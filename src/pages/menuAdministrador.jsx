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
            <li><a href="#" onClick={() => navigate('/menuAdmin')}>Inicio</a></li>
            <li><a href="#" onClick={() => navigate('/perfilPsicologo')}>Mi Perfil</a></li>
            <li><a href="#" onClick={() => navigate('/adminLogin')}>Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="bienvenida">
          <h1>Bienvenido/a, Administrador.</h1>
          <p>Administra el personal y los centros de atención.</p>
        </section>

        <section className="opciones">
          <div className="tarjeta">
            <h2>Agregar Psicólogo</h2>
            <p>Registra un nuevo psicólogo en el sistema.</p>
            <button className="link-button" onClick={() => navigate('/agregarPsicologo')}>
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
