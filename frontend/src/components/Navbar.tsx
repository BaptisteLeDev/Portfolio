import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from '../assets/Logo.svg';

const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="relative text-white text-sm md:text-base font-medium transition duration-300 
               hover:text-gray-300 after:block after:h-[2px] after:bg-white 
               after:w-0 hover:after:w-full after:transition-all after:duration-300"
  >
    {children}
  </Link>
);

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[70%] 
                 flex justify-between items-center rounded-full bg-black/25
                  backdrop-blur-lg shadow-lg z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <div>
        <Link
          to="/"
          className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white 
                     transition-all duration-300 hover:scale-110 hover:shadow-lg"
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-10 h-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]"
          />
        </Link>
      </div>

      <div className="space-x-6 flex left-25 me-10">
        {/* <a
          href="/TheCV_Baptiste_DECHAMP.pdf"
          download="TheCV_Baptiste_DECHAMP.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="relative text-white text-sm md:text-base font-medium transition duration-300 
                     hover:text-gray-300 after:block after:h-[2px] after:bg-white 
                     after:w-0 hover:after:w-full after:transition-all after:duration-300"
        >
          CV
        </a>*/}
        <NavLink to="/portfolio">Portfolio</NavLink>
        <NavLink to="/bonus">Contact</NavLink>
      </div>
    </motion.nav>
  );
};

export default Navbar;