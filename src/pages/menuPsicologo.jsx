import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/menuPsicologo.css'; // Puedes usar un CSS similar o crear uno nuevo

const PsicologoMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <header>
        <div className="logo">🧠 Mente en Calma - Psicólogo</div>
        <nav>
          <ul>
            <li><a href="#" onClick={() => navigate('/')}>Inicio</a></li>
            <li><a href="#" onClick={() => navigate('/perfilPsicologo')}>Mi Perfil</a></li>
            <li><a href="#" onClick={() => navigate('/logout')}>Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="bienvenida">
          <h1>Bienvenido/a, Psicólogo</h1>
          <p>Gestiona tus citas y acompaña a tus pacientes en su camino.</p>
        </section>

        <section className="opciones">
          <div className="tarjeta">
            <h2>Ver Citas</h2>
            <p>Consulta tus próximas citas programadas.</p>
            <button className="link-button" onClick={() => navigate('/misCitas')}>
              Ver
            </button>
          </div>
          <div className="tarjeta">
            <h2>Registrar Avances</h2>
            <p>Documenta el progreso y notas de tus sesiones.</p>
            <button className="link-button" onClick={() => navigate('/registrarAvance')}>
              Registrar
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