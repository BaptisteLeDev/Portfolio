import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';


const Accueil = () => {

    return (
        <motion.section
            className="min-h-screen flex flex-col items-center justify-center bg-stone-900"
            initial={{ transform: "translateX(-100px)" }}
            animate={{ transform: "translateX(0px)" }}
            transition={{ type: "spring" }}
        >
            <h1 className="text-4xl font-bold mb-4">Bienvenue sur mon Portfolio</h1>
            <p className="text-lg mb-6">Découvrez mes projets et réalisations.</p>
            <Button variant="ghost">En savoir plus</Button>
        </motion.section>


    );
};

export default Accueil;

