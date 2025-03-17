import { motion } from "framer-motion";
import { useState } from "react";
import Background from "../assets/background_portfolio.png";
import Cody from "../assets/Cody_Portfolio.svg";
import UpArrow from "@/components/ui/UpArrow";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";
import projects from "../data/projects.json";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0].id);

  const currentProject = projects.find(project => project.id === selectedProject) || projects[0];

  return (
    <>
      {/* 🎯 SECTION HERO */}
      <motion.section
        className="relative bg-cover bg-center p-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 rounded-b-[100px]"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <motion.div className="flex flex-col items-start justify-center min-h-screen text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            / Print Portfolio
          </h1>
          <p className="text-xl md:text-3xl mb-6">
            Voici mon portfolio,
            <br /> merci de votre visite !
          </p>
        </motion.div>

        <motion.div className="hidden md:block">
          <img
            src={Cody}
            alt="Cody"
            className="w-full max-w-xs md:max-w-md h-auto mb-6"
          />
        </motion.div>
      </motion.section>

      {/* 🎯 SECTION "PORTFOLIO" */}
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center bg-stone-900 p-10 md:p-20"
        initial={{ transform: "translateX(-100px)" }}
        animate={{ transform: "translateX(0px)" }}
        transition={{ type: "spring" }}
      >
        <h2 className="text-4xl font-bold mb-4">Bienvenue sur mon Portfolio</h2>
        <p className="text-lg mb-6">Découvrez mes projets et réalisations.</p>
        <Carousel />
      </motion.section>

      {/*Section Autre projet */}
      <motion.section
        className="px-10 md:px-20 py-24 bg-stone-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-10">
          {/* Partie gauche - Titre et liste des projets */}
          <div className="w-full md:w-1/3">
            <div className="mb-8">
              <h2 className="text-5xl text-amber-50 font-[350] max-sm:text-4xl">
                Mes Projets
              </h2>
              <h3 className="mt-2.5 text-5xl font-medium text-amber-50 max-sm:text-4xl">
                Ux / Ui & Design
              </h3>
            </div>
            
            <ul className="space-y-6">
              {projects.filter(p => p.category === "UX/UI & Design").map(project => (
                <li 
                  key={project.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedProject === project.id 
                      ? "text-pink-600 border-l-4 border-pink-600 pl-4" 
                      : "text-amber-50 hover:text-pink-400 pl-4"
                  }`}
                  onClick={() => setSelectedProject(project.id)}
                >
                  <h4 className="text-5xl font-[350]">{project.title}</h4>
                </li>
              ))}
            </ul>
          </div>

          {/* Partie droite - Détails du projet */}
          <div className="w-full md:w-2/3 mt-8 md:mt-0">
            <motion.div 
              key={currentProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-stone-800 rounded-[30px] p-8 h-full"
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <img 
                    src={currentProject.image} 
                    alt={currentProject.title} 
                    className="w-full h-64 object-cover rounded-[20px]"
                  />
                </div>
                
                <h3 className="text-3xl font-bold text-pink-600 mb-4">
                  {currentProject.title}
                </h3>
                
                <p className="text-amber-50 text-xl mb-6">
                  {currentProject.detailedDescription}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-pink-400 text-lg font-medium mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="bg-stone-700 text-amber-50 px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-pink-400 text-lg font-medium mb-2">Attribution</h4>
                    <p className="text-amber-50/80">{currentProject.attribution}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-pink-400 text-lg font-medium mb-2">Date</h4>
                    <p className="text-amber-50/80">{currentProject.date}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-pink-400 text-lg font-medium mb-2">Mon rôle</h4>
                    <p className="text-amber-50/80">{currentProject.role}</p>
                  </div>
                </div>

                <div className="mt-auto flex gap-4">
                  {currentProject.demoLink && (
                    <a 
                      href={currentProject.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-colors"
                    >
                      Voir la démo
                    </a>
                  )}
                  
                  {currentProject.githubLink && (
                    <a 
                      href={currentProject.githubLink}
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
          </div>
        </div>
      </motion.section>

      {/* Portfolio Section */}
      <motion.section
        className="px-10 md:px-20 py-24 bg-stone-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h2 className="text-5xl text-amber-50 max-sm:text-4xl">
            Mes Projets
          </h2>
          <h3 className="text-5xl text-amber-50 max-sm:text-4xl">Dossier</h3>
        </div>

        <div className="flex gap-12 mx-0 my-12 max-md:flex-wrap max-md:justify-center">
          <div className="rounded-full bg-zinc-300 h-[100px] w-[100px]" />
          <div className="rounded-full bg-zinc-300 h-[100px] w-[100px]" />
          <div className="rounded-full bg-zinc-300 h-[100px] w-[100px]" />
          <div className="rounded-full bg-zinc-300 h-[100px] w-[100px]" />
          <div className="rounded-full bg-zinc-300 h-[100px] w-[100px]" />
        </div>

        <div className="flex flex-col gap-2.5">
          <h4 className="text-5xl text-amber-50 font-[350]">FORTICHE</h4>
          <h4 className="text-5xl text-amber-50 font-[350]">VANNES AGGLO</h4>
          <h4 className="text-5xl text-amber-50 font-[350]">G-En</h4>
        </div>
      </motion.section>

      <UpArrow />
      <Footer />
    </>
  );
};

export default Portfolio;
