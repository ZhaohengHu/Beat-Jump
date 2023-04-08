import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamePage from './GamePage';
import LevelPage from './LevelPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path='/levels' element={<LevelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
