import React from "react";
import { motion } from "framer-motion";
import Background from "../assets/background_accueil.png";
import Cody from "../assets/Cody_Accueil.svg";

const Accueil = () => {
    return (
        <>
        {/* 🎯 SECTION HERO */}
        <motion.section
            className="columns-2 relative bg-cover bg-center p-10 flex items-center justify-center gap-25"
            style={{ backgroundImage: `url(${Background})` }}
        >
            <motion.div className="relative flex flex-col items-left justify-center min-h-screen text-white text-left">
                <h1 className="text-5xl font-bold mb-4 ">
                    _Hello world,<br /> je suis Baptiste
                </h1>
                <p className="text-4xl mb-6">
                    Jeune développeur en<br /> formation à MyDigitalSchool
                </p>
            </motion.div>

            <motion.div>
                <img src={Cody} alt="Cody" className="w-100 h-auto mb-6 " />
            </motion.div>
        </motion.section>
  
        {/* 🎯 SECTION "À PROPOS" */}
        <motion.section
          className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-900 text-white text-center"

          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">À propos de moi</h2>
          <p className="max-w-2xl">
            Passionné par le développement, je construis des interfaces modernes
            et performantes. 🚀
          </p>
        </motion.section>
  
        {/* 🎯 SECTION "PROJETS" */}
        <motion.section
          className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-800 text-white text-center"

          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Mes Projets</h2>
          <p className="max-w-2xl">
            Voici quelques projets que j’ai réalisés en React et Tailwind CSS.
          </p>
        </motion.section>
      </>
    );
  };
export default Accueil;
