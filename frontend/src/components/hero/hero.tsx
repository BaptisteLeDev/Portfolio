import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { AnimatedGradient } from "@/components/effects/animated-gradient";
import { FluidBlobs } from "@/components/effects/fluid-blobs";
import { NoiseOverlay } from "@/components/effects/noise-overlay";
import { Typewriter } from "@/components/effects/typewriter";
import { Cody, type CodyMood } from "@/components/cody";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useTranslation("home");
  const { t: tc } = useTranslation("common");
  const [hoverMood, setHoverMood] = useState<CodyMood | null>(null);

  const starOnEnter = () => setHoverMood("star");
  const clearHover = () => setHoverMood(null);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center rounded-b-[100px] max-md:rounded-b-[64px] px-8 py-28">
      <AnimatedGradient palette="hero" />
      <FluidBlobs />
      <NoiseOverlay />
      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] items-center gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] opacity-70 mb-5">
              ~/baptiste-dev $ run hello.tsx
            </p>

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
              <Button
                variant="gradient"
                size="lg"
                asChild
                onMouseEnter={starOnEnter}
                onMouseLeave={clearHover}
                onFocus={starOnEnter}
                onBlur={clearHover}
              >
                <Link to="/portfolio">{tc("cta.see_projects")} →</Link>
              </Button>
              <Button
                variant="glass-cream"
                size="lg"
                asChild
                onMouseEnter={starOnEnter}
                onMouseLeave={clearHover}
                onFocus={starOnEnter}
                onBlur={clearHover}
              >
                <Link to="/bonus">{tc("cta.curriculum")}</Link>
              </Button>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center text-fg">
            <Cody mood={hoverMood ?? "curious"} variant="portfolio" size={340} />
          </div>
        </div>
      </Container>
    </section>
  );
}
