import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { MouseProvider, CodyReactionProvider } from "@/components/cody";
import { NavBar } from "@/components/nav/navbar";
import { UpArrow } from "@/components/ui/UpArrow";
import { pageVariants } from "@/lib/motion-variants";
import Accueil from "./pages/Accueil";

const Portfolio = lazy(() => import("./pages/Portfolio"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const NotFound = lazy(() => import("./pages/404"));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <m.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Suspense>
          <Routes location={location}>
            <Route path="/" element={<Accueil />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:id" element={<ProjectPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </m.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MouseProvider>
        <CodyReactionProvider>
          <BrowserRouter>
            <a
              href="#content"
              className="sr-only focus:not-sr-only fixed top-2 left-2 z-[100] bg-fg text-bg px-4 py-2 rounded-full"
            >
              Aller au contenu
            </a>
            <NavBar />
            <main id="content">
              <AnimatedRoutes />
            </main>
            <UpArrow />
          </BrowserRouter>
        </CodyReactionProvider>
      </MouseProvider>
    </LazyMotion>
  );
}
