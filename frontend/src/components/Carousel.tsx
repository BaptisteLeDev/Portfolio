import React, { useState } from 'react';
import { motion } from 'framer-motion';
import projects from '../data/projects.json';


interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, link, category }) => {
  return (
    <article className="border-solid bg-stone-900 border-[10px] border-pink-600 border-opacity-10 rounded-[50px] min-h-[200px] transition-all duration-300 hover:transform hover:scale-105 overflow-hidden group">
      <a href={link} className="block p-6 h-full" aria-label={`View ${title} project`}>
        {image && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <img src={image} alt={title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
          </div>
        )}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 text-sm font-medium text-stone-900 bg-amber-50 rounded-full">
            {category}
          </span>
          <h3 className="text-2xl font-bold text-amber-50">{title}</h3>
          <p className="text-amber-50/80">{description}</p>
        </div>
      </a>
    </article>
  );
};

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full flex items-center justify-center">
      <button onClick={handlePrev} className="text-black font-bold absolute left-25 p-3 bg-amber-50 rounded-full hover:scale-110">
        {'<'}
      </button>
      <motion.div
        className="w-full flex items-center justify-center gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <ProjectCard {...projects[currentIndex]} />
        <ProjectCard {...projects[currentIndex]} />
      </motion.div>
      <button onClick={handleNext} className="text-black font-bold absolute right-25 p-3 bg-amber-50 rounded-full hover:scale-110">
      {'>'}
      </button>
    </div>
  );
};

export default Carousel;