import { motion } from "framer-motion";
import Background from "../assets/background_portfolio.png";
import Cody from "../assets/Cody_Portfolio.svg";
import UpArrow from "@/components/ui/UpArrow";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";

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
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur mon Portfolio</h1>
        <p className="text-lg mb-6">Découvrez mes projets et réalisations.</p>
        <Carousel />
      </motion.section>

      {/* UX/UI Design Section */}
      <motion.section
        className="px-10 md:px-20 py-24 bg-stone-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-12">
          <h2 className="text-5xl text-amber-50 font-[350] max-sm:text-4xl">
            Mes Projets
          </h2>
          <h3 className="mt-2.5 text-5xl font-medium text-amber-50 max-sm:text-4xl">
            Ux / Ui & Design
          </h3>
        </header>

        <div className="flex flex-col gap-5">
          <h4 className="text-5xl text-amber-50 font-[350]">Vannes Aglo</h4>
          <h4 className="text-5xl text-amber-50 font-[350]">
            Festival Vibrations
          </h4>
          <h4 className="text-5xl text-amber-50 font-[350]">Erwen&Ewen</h4>
          <h4 className="text-5xl text-amber-50 font-[350]">G-En</h4>
        </div>

        <div className="mt-12 bg-stone-700 h-[678px] rounded-[50px] w-full" />
      </motion.section>

      {/* Portfolio Section */}
      <motion.section
        className="px-10 md:px-20 py-24 bg-stone-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header>
          <h2 className="text-5xl text-amber-50 max-sm:text-4xl">
            Mes Projets
          </h2>
          <h3 className="text-5xl text-amber-50 max-sm:text-4xl">Dossier</h3>
        </header>

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
