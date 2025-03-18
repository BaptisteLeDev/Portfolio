import { motion } from "framer-motion";

// Définition du type Project
export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  link: string;
  demoLink?: string;
  githubLink?: string;
  category: string;
  skills: string[];
  attribution: string;
  date: string;
  role: string;
}

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  return (
    <motion.div 
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-stone-800 rounded-[30px] p-8 h-full"
    >
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <img 
            src={project.image} 
            alt={project.title} 
            onError={(e) => {
              e.currentTarget.src = "/images/none-image.jpg";
            }}
            className="w-full h-64 object-cover rounded-[20px]"
          />
        </div>
        
        <h3 className="text-3xl font-bold text-pink-600 mb-4">
          {project.title}
        </h3>
        
        <p className="text-amber-50 text-xl mb-6">
          {project.detailedDescription}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-pink-400 text-lg font-medium mb-2">Compétences</h4>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skills, index) => (
                <span 
                  key={index}
                  className="bg-stone-700 text-amber-50 px-3 py-1 rounded-full text-sm"
                >
                  {skills}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-pink-400 text-lg font-medium mb-2">Attribution</h4>
            <p className="text-amber-50/80">{project.attribution}</p>
          </div>
          
          <div>
            <h4 className="text-pink-400 text-lg font-medium mb-2">Date</h4>
            <p className="text-amber-50/80">{project.date}</p>
          </div>
          
          <div>
            <h4 className="text-pink-400 text-lg font-medium mb-2">Mon rôle</h4>
            <p className="text-amber-50/80">{project.role}</p>
          </div>
        </div>

        <div className="mt-auto flex gap-4">
          {project.demoLink && (
            <a 
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-colors"
            >
              Voir la démo
            </a>
          )}
          
          {project.githubLink && (
            <a 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-amber-50 text-amber-50 px-6 py-3 rounded-full hover:bg-amber-50/10 transition-colors"
            >
              Code source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;