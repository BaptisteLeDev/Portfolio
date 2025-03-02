import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Accueil from './pages/Accueil';
import Portfolio from './pages/Portfolio';
import Bonus from './pages/Bonus';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/bonus" element={<Bonus />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
