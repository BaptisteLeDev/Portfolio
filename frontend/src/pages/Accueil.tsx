import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Accueil = () => {
    return (
        <motion.section
            className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
            initial={{ x: "100%" }}
  animate={{ x: "calc(100vw - 50%)" }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col items-center justify-center min-h-svh">
                <h1 className="text-4xl font-bold mb-4">Bienvenue sur mon Portfolio</h1>
                <p className="text-lg mb-6">Découvrez mes projets et réalisations.</p>
                <Button variant="link">En savoir plus</Button>
                <Button>button</Button></div>
        </motion.section>

    );
};

export default Accueil;
