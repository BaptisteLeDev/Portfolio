import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Accueil from './pages/Accueil';
import Portfolio from './pages/Portfolio';
import ProjectPage from './pages/ProjectPage';
import Bonus from './pages/Bonus';
import NotFound from './pages/404';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<ProjectPage />} />
          <Route path="/bonus" element={<Bonus />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
          </BrowserRouter>
  );
}

export default App;
