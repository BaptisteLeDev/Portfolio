import { motion } from "framer-motion";
import Background from "../assets/background_accueil.png";
import Cody from "../assets/Cody_Accueil.svg";
import Introduction from "../assets/section_coup-oeil.png";
import Competence from "../assets/section_competences.png";
import F1 from "../assets/forma_1.svg";
import F2 from "../assets/forma_2.svg";
import F3 from "../assets/forma_3.svg";

const Accueil = () => {
  return (
    <>
      {/* 🎯 SECTION HERO */}
      <motion.section
        className="columns-2 relative bg-cover bg-center p-10 flex items-center justify-center gap-50 rounded-b-[100px] "
        style={{ backgroundImage: `url(${Background})` }}
      >
        <motion.div className="relative flex flex-col items-left justify-center min-h-screen text-left">
          <h1 className="font-bold mb-4 ">
            _Hello world,
            <br /> je suis Baptiste
          </h1>
          <p className="text-3xl mb-6">
            Jeune développeur en
            <br /> formation à MyDigitalSchool
          </p>
        </motion.div>

        <motion.div>
          <img src={Cody} alt="Cody" className="w-100 h-auto mb-6 " />
        </motion.div>
      </motion.section>

      {/* 🎯 SECTION "INTRODUCTION" */}
      <motion.section
        className="columns-2 relative flex items-center justify-center gap-30 z-[-1] bg-center p-10 -top-25"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ backgroundImage: `url(${Introduction})` }}
      >
        <motion.div>
          <p className="text-9xl">[</p>
        </motion.div>

        <motion.div className="relative min-h-screen flex flex-col items-left justify-center text-left box-border size-[40%]">
          <h2 className="text-3xl mb-4">Introduction</h2>
          <h3 className="text-5xl font-bold mb-4 ">Coup d'oeil</h3>
          <p className="max-w-2xl text-lg">
            Je suis Baptiste Dechamp, développeur passionné par la création de
            contenus pour les réseaux sociaux, le développement web et la
            gestion de projets. Curieux et collaboratif, j'aime des solutions
            uniques et performantes en explorant des approches créatives et
            techniques. Voici mon <strong>parcours</strong>, mes{" "}
            <strong>skills</strong>et mes <strong>projets</strong>.
          </p>
        </motion.div>

        <motion.div>
          <p className="text-9xl">]</p>
        </motion.div>
      </motion.section>

      {/* 🎯 SECTION "PROJETS" */}
      <motion.section
        className="relative min-h-screen flex flex-col justify-center p-20 bg-gray-800 text-left
        bg-gradient-to-br from-indigo-700 from-20% to-pink-600 -top-50 rounded-[100px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="items-left">
          <h2 className="text-3xl mb-4">Mon parcours</h2>
          <h3 className="text-5xl font-bold mb-4 ">Mes formations</h3>
        </motion.div>

        <motion.div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mt-10">
          <img src={F1} alt="1" className="w-75 h-auto mb-6 " />
          <img src={F2} alt="2" className="w-75 h-auto mb-6 " />
          <img src={F3} alt="3" className="w-75 h-auto mb-6 " />
        </motion.div>
      </motion.section>

      {/* 🎯 SECTION "COMPÉTENCES" */}
      <motion.section
        className="relative flex items-center justify-center gap-30 z-[-1] bg-center p-10 -top-75"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ backgroundImage: `url(${Competence})` }}
      >
        <motion.div className="relative min-h-screen flex flex-col items-left justify-center text-left box-border size-[40%]">
          <h2 className="text-3xl mb-4">Mes Compétences</h2>
          <h3 className="text-5xl font-bold mb-4 ">Hard Skills</h3>
          <h6 className="text-3xl font-bold mb-4 ">Créatif & Design</h6>
          <h6 className="text-3xl font-bold mb-4 ">Logique & développement</h6>
          <h6 className="text-3xl font-bold mb-4 ">Bureautique</h6>
        </motion.div>

        <motion.div className="text-right">
          <h3 className="text-5xl font-bold mb-4 ">Soft Skills</h3>
          <h6 className="text-3xl font-bold mb-4 ">Adaptabilité</h6>
          <h6 className="text-3xl font-bold mb-4 ">Esprit d’analyse</h6>
          <h6 className="text-3xl font-bold mb-4 ">Écoute et bienveillance</h6>
          <h6 className="text-3xl font-bold mb-4 ">Compréhension contextuelle</h6>
        </motion.div>
      </motion.section>
    </>
  );
};
export default Accueil;
