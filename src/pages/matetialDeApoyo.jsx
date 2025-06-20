import React, { useEffect, useState } from 'react';
import '../css/materialDeApoyo.css';

const MaterialApoyo = () => {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    const articulosDemo = [
      {
        id: 1,
        titulo: '5 Técnicas de Respiración para Reducir el Estrés',
        autor: 'Lic. Andrea Paz',
        contenido: 'La respiración profunda ayuda a activar el sistema nervioso parasimpático. Aquí te explicamos cómo hacerlo paso a paso...',
        fecha: '2025-06-19'
      },
      {
        id: 2,
        titulo: 'Importancia del Sueño en la Salud Mental',
        autor: 'Dr. Carlos Luna',
        contenido: 'Dormir bien no solo recupera tu cuerpo, también mejora tu estado de ánimo y tu enfoque durante el día...',
        fecha: '2025-06-18'
      }
    ];

    setArticulos(articulosDemo);
  }, []);

  return (
    <div className="bienestar-container">
      {/* Encabezado principal */}
      <header className="header-navegacion">
        <div className="logo">🧠 Mente en Calma</div>
        <nav>
          <ul>
            <li><a href="/menuCliente">Inicio</a></li>
            <li><a href="/verPsicologos">Psicólogos</a></li>
            <li><a href="/">Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      {/* Encabezado de la sección */}
      <section className="bienestar-header">
        <h1>Artículos de Bienestar Mental</h1>
        <p>Explora consejos y contenidos útiles para cuidar tu salud emocional</p>
      </section>

      <section className="articulos-lista">
        {articulos.map(articulo => (
          <article key={articulo.id} className="articulo-card">
            <h2>{articulo.titulo}</h2>
            <p className="autor">Por {articulo.autor} | {new Date(articulo.fecha).toLocaleDateString()}</p>
            <p className="contenido">{articulo.contenido}</p>
          </article>
        ))}
      </section>

      <footer className="bienestar-footer">
        <p>&copy; 2025 Mente en Calma | Contenido para tu bienestar mental</p>
      </footer>
    </div>
  );
};

export default MaterialApoyo;
