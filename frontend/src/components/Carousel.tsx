import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import projects from "../data/projects_mini.json";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  tags?: string[];
}

interface CarouselProps {
  title?: string; // Titre optionnel pour le carrousel
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  link,
  category,
  tags = [],
}) => {
  return (
    <motion.article
      className="flex-shrink-0 border-solid bg-stone-900 border-[10px] border-pink-600 border-opacity-10 rounded-[50px] min-h-[200px] max-h-[480px] h-full transition-all duration-300 hover:scale-105 overflow-hidden group"
      whileHover={{ y: -5 }}
    >
      <a
        href={link}
        className="block p-6 h-full flex flex-col"
        aria-label={`View ${title} project`}
      >
        {image && (
          <div className="mb-4 overflow-hidden rounded-lg h-48">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        )}
        <div className="space-y-3 flex-grow flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block px-3 py-1 text-sm font-medium text-stone-900 bg-amber-50 rounded-full">
              {category}
            </span>
            {tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-0.5 text-xs font-medium text-amber-50 bg-stone-800 border border-pink-600 border-opacity-30 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-bold text-amber-50 line-clamp-1">
            {title}
          </h3>
          <p className="text-amber-50/80 line-clamp-3 overflow-hidden">
            {description}
          </p>
        </div>
      </a>
    </motion.article>
  );
};

const Carousel: React.FC<CarouselProps> = () => {
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Vérifier si l'appareil est un mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Gestion du défilement horizontal avec la molette de souris
  // Vitesse de défilement augmentée en multipliant e.deltaY par 2.5
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (carouselRef.current) {
        e.preventDefault();
        carouselRef.current.scrollLeft += e.deltaY * 3.5; // Augmentation de la vitesse de défilement
      }
    };

    const currentCarouselRef = carouselRef.current;

    if (currentCarouselRef) {
      currentCarouselRef.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (currentCarouselRef) {
        currentCarouselRef.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  // Créer un tableau étendu pour l'effet de défilement infini
  const extendedProjects = [...projects, ...projects, ...projects];

  return (
    <div className="w-full">
      {/* Titre aligné à gauche */}
      <h2 className="text-3xl md:text-4xl font-bold text-amber-50 text-left">
        Mes Projets
      </h2>
      <h3 className="mt-2.5 text-5xl font-medium text-amber-50 max-sm:text-4xl mb-6">
        Dévellopeur Web
      </h3>

      <div className="relative w-full scrollbar-hide">
        <div
          ref={carouselRef}
          className="w-full flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex-shrink-0 w-6" />
          {extendedProjects.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              className={`flex-shrink-0 ${isMobile ? "w-[85%]" : "w-[30%]"}`}
            >
              <ProjectCard {...project} />
            </div>
          ))}
          <div className="flex-shrink-0 w-6" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
