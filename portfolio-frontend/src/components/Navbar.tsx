import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      className="bg-gray-800 text-white p-4 flex justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-lg font-bold">Mon Portfolio</div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-300">Accueil</Link>
        <Link to="/portfolio" className="hover:text-gray-300">Portfolio</Link>
        <Link to="/bonus" className="hover:text-gray-300">Bonus</Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
