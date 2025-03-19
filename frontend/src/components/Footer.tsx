import React from "react";
import { motion } from "framer-motion";
{
  /*const ContactForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du formulaire ici
    alert("Message envoyé avec succès!");
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-black">
      <input
        type="email"
        placeholder="E-mail *"
        required
        className="px-5 py-0 w-full bg-amber-50 border-none h-[42px] rounded-[100px] focus:outline-none focus:ring-2 focus:ring-pink-600 transition-all"
        aria-label="Email address"
      />
      <input
        type="text"
        placeholder="Objet *"
        required
        className="px-5 py-0 w-full bg-amber-50 border-none h-[42px] rounded-[100px] focus:outline-none focus:ring-2 focus:ring-pink-600 transition-all"
        aria-label="Subject"
      />
      <textarea
        placeholder="Mon message ..."
        required
        rows={4}
        className="px-5 py-3 w-full bg-amber-50 border-none rounded-[20px] resize-none focus:outline-none focus:ring-2 focus:ring-pink-600 transition-all"
        aria-label="Message"
      ></textarea>
      <div className="flex gap-6">
        <button
          type="submit"
          className="text-xl font-bold bg-amber-50 border-none h-[42px] px-6 rounded-[100px] text-stone-900 hover:bg-pink-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-600 transition-all"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
};
*/
}
// Définition des icônes sociales avec des URL spécifiques
const socialIcons = {
  Linkedin: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
  GitHub: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
  Mail: "https://cdn-icons-png.flaticon.com/512/561/561127.png",
};
// Définition des liens vers les réseaux sociaux (à personnaliser)
const socialLinks = {
  Linkedin: "www.linkedin.com/in/baptiste-dechamp",
  GitHub: "https://github.com/BaptisteLeDev",
  Mail: "mailto:baptiste.dechamp@outlook.fr",
};
interface SocialIconProps {
  image: string;
  name: string;
}
const SocialIcon: React.FC<SocialIconProps> = ({ image, name }) => {
  return (
    <motion.a
      href={socialLinks[name as keyof typeof socialLinks]}
      className="text-center group"
      aria-label={`Visiter ${name}`}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="mb-4 rounded-full h-[100px] w-[100px] bg-amber-50 p-4 flex items-center justify-center overflow-hidden shadow-md hover:shadow-pink-600/30 transition-all">
        <img
          src={socialIcons[name as keyof typeof socialIcons] || image}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="text-xl text-amber-50 group-hover:text-pink-600 transition-colors">
        {name}
      </div>
    </motion.a>
  );
};
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-white text-left"
    >
      <section className="px-10 lg:px-52 py-24 border-solid bg-stone-900 border-y-[22px] border-y-pink-600 rounded-[100px] max-md:px-5 max-md:py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <div className="flex-1">
            <h2 className="mb-5 text-5xl text-amber-50 font-medium max-sm:text-4xl">
              Mes réseaux
            </h2>
            <h3 className="mb-8 text-4xl text-amber-50 font-light max-sm:text-3xl">
              Contact
            </h3>
            <div className="flex flex-wrap gap-12 max-sm:justify-center">
              <SocialIcon image={socialIcons.Linkedin} name="Linkedin" />
              <SocialIcon image={socialIcons.GitHub} name="GitHub" />
              <SocialIcon image={socialIcons.Mail} name="Mail" />
            </div>
          </div>
          {/* Formulaire de contact - Décommentez pour l'activer */}
          {/* 
          <div className="flex-1">
            <h2 className="mb-5 text-5xl text-amber-50 font-medium max-sm:text-4xl">
              Formulaire
            </h2>
            <h3 className="mb-8 text-4xl text-amber-50 font-light max-sm:text-3xl">
              Me contacter
            </h3>
            <ContactForm />
          </div>
          */}
        </div>
      </section>
      <div className="px-4 py-12 text-center">
        <div className="text-amber-50 max-w-7xl mx-auto">
          <h2 className="mb-5 text-xl font-bold">by Baptiste D</h2>
          <nav className="mx-0 my-4 text-lg md:text-2xl flex flex-wrap justify-center gap-x-3 gap-y-2">
            <a
              href="/site-story"
              className="hover:text-pink-600 transition-colors"
            >
              Site-story
            </a>
            <span className="text-amber-300">|</span>
            <a href="/legal" className="hover:text-pink-600 transition-colors">
              Mentions légales
            </a>
            <span className="text-amber-300">|</span>
            <a
              href="/privacy"
              className="hover:text-pink-600 transition-colors"
            >
              Politique de confidentialité
            </a>
          </nav>
          <p className="mx-0 my-4 text-lg md:text-2xl">
            © {currentYear} BaptisteLeDev.fr - Tous droits réservés
          </p>
        </div>
      </div>
    </motion.footer>
  );
};
export default Footer;
