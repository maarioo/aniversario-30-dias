// src/App.tsx
import { useState } from "react";
import "./App.css";
import { daysData, type DayData } from "./daysData";

function App() {
  const [showGift, setShowGift] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

  const handleOpenDay = (day: DayData) => {
    setSelectedDay(day);
  };

  const handleCloseModal = () => {
    setSelectedDay(null);
  };

  const handleStart = () => {
    setIsStarting(true);
    setTimeout(() => {
      setShowGift(true);
    }, 500);
  };

  return (
    <div className="app-root">
      <div className="start-bg" />
        {!showGift && (
          <div className={`start-screen ${isStarting ? "fade-out" : ""}`}>
            <div className="start-content">
              <div className="ribbon">🎀</div>
              <h1>Abre tu regalo</h1>
              <button className="start-button" onClick={handleStart}>
                Abrir
              </button>
            </div>
          </div>
        )}

        {showGift && (
          <>
          {/* Fondo oscuro con imagen difuminada */}
          <div className="background" />
          {/* Capa principal */}
          <div className="content page-main">
            <header className="header">
              <div className="header-badge">
                <span className="header-badge-heart">💖</span>
                Felices 4 años, pequeñaja. 💖
              </div>
              <h1>30 días contigo</h1>
              <p className="header-subtitle">
                Cada casilla es un trocito de lo que sientes por mi y para que recuerdes lo bonita que eres: palabras, canciones
                y recuerdos solo nuestros. 💕
              </p>
              <p className="header-note">
                Abre las casillas en orden.  
                Simplemente observa y deja que suene la magia. ✨
              </p>
            </header>
            <div className="grid">
              {daysData.map((day) => {
                const isGolden = [10, 13, 20, 30].includes(day.day);
                return (
                  <button
                    key={day.day}
                    className={`day-card ${isGolden ? "gold-card" : ""}`}
                    onClick={() => handleOpenDay(day)}
                  >
                    <span className="day-number">
                      {day.day}
                      {isGolden && <span className="gold-star">⭐</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal para el día seleccionado */}
          {selectedDay && (
            <div className="modal-backdrop" onClick={handleCloseModal}>
              <div
                className="modal"
                onClick={(e) => e.stopPropagation()} // para que no se cierre al hacer click dentro
              >
                <button className="close-button" onClick={handleCloseModal}>
                  ✕
                </button>
                <h2>{selectedDay.title}</h2>

                <div className="modal-image-wrapper">
                  <img
                    src={selectedDay.imageSrc}
                    alt={selectedDay.title}
                    className="modal-image"
                  />
                </div>

                <audio src={selectedDay.audioSrc} controls autoPlay>
                  Tu navegador no soporta el elemento de audio.
                </audio>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;