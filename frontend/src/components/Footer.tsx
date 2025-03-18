import React from "react";
import { motion } from "framer-motion";

const ContactForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-black">
      <input
        type="email"
        placeholder="E-mail *"
        required
        className="px-5 py-0 w-full bg-amber-50 border-none h-[42px] rounded-[100px] focus:outline-none focus:ring-2 focus:ring-pink-600"
        aria-label="Email address"
      />
      <input
        type="text"
        placeholder="Objet *"
        required
        className="px-5 py-0 w-full bg-amber-50 border-none h-[42px] rounded-[100px] focus:outline-none focus:ring-2 focus:ring-pink-600"
        aria-label="Subject"
      />
      <textarea
        placeholder="Mon message ..."
        required
        rows={4}
        className="px-5 py-3 w-full bg-amber-50 border-none rounded-[20px] focus:outline-none focus:ring-2 focus:ring-pink-600"
        aria-label="Message"
      ></textarea>
      <div className="flex gap-6">
        <button
          type="submit"
          className="text-xl font-bold bg-amber-50 border-none h-[42px] rounded-[100px] text-stone-900 w-[140px] hover:bg-pink-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
};

// Définition des icônes sociales avec des URL spécifiques
const socialIcons = {
  Linkedin: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
  GitHub: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
  Mail: "https://cdn-icons-png.flaticon.com/512/561/561127.png",
  "Bento.me": "https://assets.bento.me/static/favicon.png"
};

// Définition des liens vers les réseaux sociaux
const socialLinks = {
  Linkedin: "https://www.linkedin.com/in/votre-profil/",
  GitHub: "https://github.com/votre-profil",
  Mail: "mailto:votre-email@exemple.com",
  "Bento.me": "https://bento.me/votre-profil"
};

const SocialIcon: React.FC<{ image: string; name: string }> = ({
  image,
  name,
}) => {
  return (
    <a
      href={socialLinks[name as keyof typeof socialLinks]}
      className="text-center group"
      aria-label={`Visiter ${name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={socialIcons[name as keyof typeof socialIcons] || image}
        alt={name}
        className="mb-4 rounded-full h-[100px] w-[100px] transition-transform group-hover:transform group-hover:scale-110 bg-amber-50 p-4 object-contain"
      />
      <div className="text-xl text-amber-50 group-hover:text-pink-600">
        {name}
      </div>
    </a>
  );
};

const Footer: React.FC = () => {
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
            <h2 className="mb-5 text-5xl text-amber-50 max-sm:text-4xl">
              Mes réseaux
            </h2>
            <h3 className="mb-5 text-5xl text-amber-50 max-sm:text-4xl">
              Contact
            </h3>
            <div className="flex flex-wrap gap-12 max-sm:justify-center">
              <SocialIcon
                image={socialIcons.Linkedin}
                name="Linkedin"
              />
              <SocialIcon
                image={socialIcons.GitHub}
                name="GitHub"
              />
              <SocialIcon
                image={socialIcons.Mail}
                name="Mail"
              />
              <SocialIcon
                image={socialIcons["Bento.me"]}
                name="Bento.me"
              />
            </div>
          </div>
          {/* Décommentez cette section pour activer le formulaire de contact
          <div className="flex-1">
            <h2 className="mb-5 text-5xl text-amber-50 max-sm:text-4xl">
              Formulaire
            </h2>
            <ContactForm />
          </div>
          */}
        </div>
      </section>

      <div className="px-0 py-12 text-center">
        <div className="text-amber-50 max-sm:text-xl">
          <h2 className="mb-5 text-lg font-bold">by Baptiste D</h2>
          <nav className="mx-0 my-2.5 text-2xl">
            <a href="/sitemap" className="hover:text-amber-200">
              Plan du site
            </a>
            {" | "}
            <a href="/legal" className="hover:text-amber-200">
              Mentions légales
            </a>
            {" | "}
            <a href="/privacy" className="hover:text-amber-200">
              Politique de confidentialité
            </a>
          </nav>
          <p className="mx-0 my-2.5 text-2xl">
            © BaptisteLeDev.fr
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
