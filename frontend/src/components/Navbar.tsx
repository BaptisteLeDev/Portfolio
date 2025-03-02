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
      <div className="text-xl font-bold">Mon Portfolio</div>
      <div className="space-x-4">
        <Link to="/">Accueil</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/bonus">Bonus</Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
