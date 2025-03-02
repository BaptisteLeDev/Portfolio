import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Accueil = () => {
  return (
    <motion.section 
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur mon Portfolio</h1>
      <p className="text-lg mb-6">Découvrez mes projets et réalisations.</p>
      <Button variant="secondary">En savoir plus</Button>
    </motion.section>
  );
};

export default Accueil;
