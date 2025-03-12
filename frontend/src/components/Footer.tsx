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
      <input
        type="text"
        placeholder="Mon message ..."
        required
        className="px-5 py-0 w-full bg-amber-50 border-none h-[42px] rounded-[100px] focus:outline-none focus:ring-2 focus:ring-pink-600"
        aria-label="Message"
      />
      <div className="flex gap-6">
        <button
          type="submit"
          className="text-xl font-bold bg-amber-50 border-none h-[42px] rounded-[100px] text-stone-900 w-[140px] hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
};

const SocialIcon: React.FC<{ image: string; name: string }> = ({
  image,
  name,
}) => {
  return (
    <a
      href={`#${name.toLowerCase()}`}
      className="text-center group"
      aria-label={`Visit ${name}`}
    >
      <img
        src={image}
        alt={name}
        className="mb-4 rounded-full h-[100px] w-[100px] transition-transform group-hover:transform group-hover:scale-110"
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
      initial={{ y: 50, opacity: 0 }} // Démarre en bas avec opacité 0
      animate={{ y: 0, opacity: 1 }} // Remonte et devient visible
      transition={{ duration: 0.5, ease: "easeOut" }} // Animation fluide
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
                image="https://cdn.builder.io/api/v1/image/assets/TEMP/6c3f0aeebc1b94669d693c7723f85a1f8b7ae0d4"
                name="Linkedin"
              />
              <SocialIcon
                image="https://cdn.builder.io/api/v1/image/assets/TEMP/6c3f0aeebc1b94669d693c7723f85a1f8b7ae0d4"
                name="GitHub"
              />
              <SocialIcon
                image="https://cdn.builder.io/api/v1/image/assets/TEMP/6c3f0aeebc1b94669d693c7723f85a1f8b7ae0d4"
                name="Mail"
              />
              <SocialIcon
                image="https://cdn.builder.io/api/v1/image/assets/TEMP/6c3f0aeebc1b94669d693c7723f85a1f8b7ae0d4"
                name="Bento.me"
              />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="mb-5 text-5xl text-amber-50 max-sm:text-4xl">
              Formulaire
            </h2>
            <ContactForm />
          </div>
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
