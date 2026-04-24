import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { MouseProvider } from "@/components/cody";
import { NavBar } from "@/components/nav/navbar";
import { UpArrow } from "@/components/ui/UpArrow";
import { pageVariants } from "@/lib/motion-variants";
import Accueil from "./pages/Accueil";
import Portfolio from "./pages/Portfolio";
import ProjectPage from "./pages/ProjectPage";
import Bonus from "./pages/Bonus";
import NotFound from "./pages/404";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Accueil />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<ProjectPage />} />
          <Route path="/bonus" element={<Bonus />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <MouseProvider>
      <BrowserRouter>
        <a
          href="#content"
          className="sr-only focus:not-sr-only fixed top-2 left-2 z-[100] bg-fg text-bg px-4 py-2 rounded-full"
        >
          Aller au contenu
        </a>
        <NavBar />
        <main id="content" className="pt-16">
          <AnimatedRoutes />
        </main>
        <UpArrow />
      </BrowserRouter>
    </MouseProvider>
  );
}
