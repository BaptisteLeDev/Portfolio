import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { AnimatedGradient } from "@/components/effects/animated-gradient";
import { NoiseOverlay } from "@/components/effects/noise-overlay";
import { Typewriter } from "@/components/effects/typewriter";
import { Cody, useCodyBroadcast } from "@/components/cody";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useTranslation("home");
  const { t: tc } = useTranslation("common");
  const projectsBind = useCodyBroadcast({ mood: "star", brackets: "square" });

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center rounded-b-[100px] max-md:rounded-b-[64px] px-8 py-28">
      <AnimatedGradient palette="hero" />
      <NoiseOverlay />
      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] items-center gap-12">
          <div>
            <h1
              className="font-display font-black leading-[0.95] tracking-[-0.04em] text-balance"
              style={{ fontSize: "clamp(2.5rem, 7.5vw, 5.5rem)" }}
            >
              <span className="opacity-55">_</span>
              <Typewriter text={t("hero.greeting_text")} speed={55} startDelay={300} caret={false} />
              <br />
              je suis{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, var(--color-cream) 0%, color-mix(in oklch, var(--color-pink) 60%, var(--color-cream)) 100%)",
                }}
              >
                <Typewriter text="Baptiste." speed={80} startDelay={1100} caret={false} />
              </span>
            </h1>

            <p className="mt-7 max-w-[48ch] text-lg md:text-xl opacity-90">
              {t("hero.subtitle")}
            </p>

            <div className="mt-10 flex gap-4 flex-wrap">
              <Button variant="gradient" size="lg" asChild className="group" {...projectsBind}>
                <Link to="/portfolio">
                  {tc("cta.see_projects")}
                  <span
                    className="ml-1 flex size-6 items-center justify-center rounded-full bg-bg/15 transition-transform duration-300 ease-[var(--ease-signature)] group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center text-fg">
            <Cody mood="curious" variant="portfolio" brackets="square" size={340} listen />
          </div>
        </div>
      </Container>
    </section>
  );
}
