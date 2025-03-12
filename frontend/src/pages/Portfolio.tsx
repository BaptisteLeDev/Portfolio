import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Background from '../assets/background_portfolio.png';
import Cody from '../assets/Cody_Portfolio.svg';

const Portfolio = () => {
  return (
    <>
      {/* 🎯 SECTION HERO */}
      <motion.section
        className="relative bg-cover bg-center p-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 rounded-b-[100px]"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <motion.div className="flex flex-col items-start justify-center min-h-screen text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            _Hello world,
            <br /> je suis Baptiste
          </h1>
          <p className="text-xl md:text-3xl mb-6">
            Jeune développeur en
            <br /> formation à MyDigitalSchool
          </p>
        </motion.div>

        <motion.div>
          <img src={Cody} alt="Cody" className="w-full max-w-xs md:max-w-md h-auto mb-6" />
        </motion.div>
      </motion.section>

      {/* 🎯 SECTION "PORTFOLIO" */}
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center bg-stone-900 p-10 md:p-20"
        initial={{ transform: "translateX(-100px)" }}
        animate={{ transform: "translateX(0px)" }}
        transition={{ type: "spring" }}
      >
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur mon Portfolio</h1>
        <p className="text-lg mb-6">Découvrez mes projets et réalisations.</p>
        <Button variant="ghost">En savoir plus</Button>
      </motion.section>
    </>
  );
};

export default Portfolio;

