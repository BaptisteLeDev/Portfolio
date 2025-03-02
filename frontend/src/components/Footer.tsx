import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }} // Démarre en bas avec opacité 0
      animate={{ y: 0, opacity: 1 }} // Remonte et devient visible
      transition={{ duration: 0.5, ease: "easeOut" }} // Animation fluide
      className="bg-gray-900 text-white py-6 px-4 text-center mt-10"
    >
      <div className="container mx-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} Mon Portfolio. Tous droits réservés.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
