import React, { useState } from 'react';

// =======================================================
// GLOBAL APP SHELL
// Houses persistent Navigation Bar + Screen Routing Container
// =======================================================

function App() {
  // Page Routing State: 'home' | 'technical' | 'viva'
  const [currentScreen, setCurrentScreen] = useState('home');

  return (
    <div className="app-root">

      {/* ===== GLOBAL NAVIGATION BAR (Persistent) ===== */}
      <nav className="global-nav-bar">
        {/* Track Switcher (Technical / Viva) Buttons */}
        <button onClick={() => setCurrentScreen('home')}>Home</button>
        <button onClick={() => setCurrentScreen('technical')}>Technical Prep</button>
        <button onClick={() => setCurrentScreen('viva')}>Project Viva</button>
      </nav>

      {/* ===== SCREEN ROUTING CONTAINER ===== */}
      <div className="screen-container">

        {/* -------------------------------------------------
            SCREEN 1: LANDING / TRACK SELECTION
            ------------------------------------------------- */}
        {currentScreen === 'home' && (
          <div className="screen screen-landing">
            <h3>EduRAG v1.0 - Landing Dashboard</h3>
            <p>Please select a track from the Navigation Bar above to begin.</p>
            <button onClick={() => setCurrentScreen('technical')}>Launch Technical Track</button>
            <button onClick={() => setCurrentScreen('viva')}>Launch Project Viva Track</button>
          </div>
        )}

        {/* -------------------------------------------------
            SCREEN 2: TECHNICAL INTERVIEW ARENA
            3-Pane Split Grid Placeholder
            ------------------------------------------------- */}
        {currentScreen === 'technical' && (
          <div className="screen screen-technical-arena">
            <div className="pane pane-left">
              <h4>Technical History Sidebar Placeholder</h4>
            </div>
            <div className="pane pane-center">
              <h4>Technical Chat Workspace Placeholder</h4>
              <p>Welcome. I am your technical interviewer. Please upload your resume so we can customize your session.</p>
            </div>
            <div className="pane pane-right">
              <h4>Technical Score Cockpit Placeholder</h4>
            </div>
          </div>
        )}

        {/* -------------------------------------------------
            SCREEN 3: PROJECT VIVA SIMULATOR ARENA
            3-Pane Split Grid Placeholder
            ------------------------------------------------- */}
        {currentScreen === 'viva' && (
          <div className="screen screen-viva-arena">
            <div className="pane pane-left">
              <h4>Viva History Sidebar Placeholder</h4>
            </div>
            <div className="pane pane-center">
              <h4>Viva RAG Workspace Placeholder</h4>
              <p>Hello and welcome to your Project Viva Simulator. Please upload your project report file below so we can initialize your defense environment.</p>
            </div>
            <div className="pane pane-right">
              <h4>Viva SDLCCockpit Placeholder</h4>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
