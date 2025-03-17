import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-stone-900 p-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-9xl font-bold mb-4 text-pink-600"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        404
      </motion.h1>
      
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-amber-50">Page not found</h2>
        <p className="text-xl mb-8 text-amber-50">
          Cette page a été supprimée, déplacée ou n'a jamais existé.<br />
          <span className="font-mono bg-stone-800 px-2 py-1 rounded mt-2 inline-block">
            Error: Component 'AwesomePage' failed to render. Check your props or add more coffee.
          </span>
        </p>
        
        <Link 
          to="/"
          className="px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
        >
          &lt; Retour à l'accueil /&gt;
        </Link>
      </motion.div>
      
      <motion.div 
        className="mt-16 text-amber-50/50 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>// TODO: Ne plus égarer les pages du portfolio</p>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;