import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProjectDetail from '@/components/project';
import projects from '../data/projects.json';
import { ChevronLeft } from 'lucide-react';

// Plus besoin de ProjectImages, nous utilisons directement les chemins d'images du dossier public
const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-900 p-6">
        <h1 className="text-4xl font-bold text-pink-600 mb-6">Projet non trouvé</h1>
        <Link 
          to="/portfolio"
          className="flex items-center gap-2 text-amber-50 hover:text-pink-400 transition-colors"
        >
          <ChevronLeft size={20} />
          Retour au portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-900 py-32 px-6 md:px-20">
      <div className="mb-6">
        <Link 
          to="/portfolio"
          className="inline-flex items-center gap-2 text-amber-50 hover:text-pink-400 transition-colors mb-8"
        >
          <ChevronLeft size={20} />
          Retour au portfolio
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto"
      >
        <ProjectDetail project={project} />
      </motion.div>
    </div>
  );
};

export default ProjectPage;