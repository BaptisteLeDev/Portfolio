import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Accueil = () => {
    return (
        <motion.section
            className="min-h-screen flex flex-col items-center justify-center"
            style={{ backgroundImage: 'url(/assets/background_portfolio.png)' }}  // Utilisation correcte du chemin
        >
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mb-4">Bienvenue sur mon Portfolio 0000</h1>
                <p className="text-lg mb-6">Découvrez mes projets et réalisations.</p>
                <Button variant="link">En savoir plus</Button>
                <Button>button</Button>
            </div>
        </motion.section>
    );
};

export default Accueil;
