import { useState } from "react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { AnimatedGradient } from "@/components/effects/animated-gradient";
import { Cody, type CodyMood } from "@/components/cody";
import { Footer } from "@/components/footer";

const EXPERIMENTS = [
  { title: "Curseur custom", note: "Un curseur inversant les contrastes au passage." },
  { title: "Test WebGL", note: "Shader fragment qui réagit à la musique ambiante." },
  { title: "Générateur de brackets", note: "Des centaines de têtes ASCII possibles. Celle-là n'est pas aléatoire." },
  { title: "Easter egg terminal", note: "Tape `baptiste --help` dans la console et observe." },
];

const CYCLE: CodyMood[] = ["curious", "happy", "thinking", "confused", "idle"];

export default function Bonus() {
  const [moodIdx, setMoodIdx] = useState(0);
  const mood = CYCLE[moodIdx];

  return (
    <>
      <Section tone="dark" rounded="none" className="pt-32 pb-20">
        <AnimatedGradient palette="hero" className="opacity-40" />
        <Container size="lg" className="relative z-10">
          <Label>BONUS</Label>
          <h1
            className="mt-4 font-display font-black"
            style={{
              fontSize: "var(--text-display-xl)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            Bonus.
          </h1>
          <p className="mt-6 text-xl md:text-2xl opacity-80 max-w-2xl">
            Expérimentations, easter eggs, brouillons qui n'ont pas trouvé leur place ailleurs.
          </p>
        </Container>
      </Section>

      <Section tone="cream" rounded="2xl" overlap>
        <Container size="lg" className="text-bg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXPERIMENTS.map((e) => (
              <Card
                key={e.title}
                tone="outline"
                radius="lg"
                className="text-bg bg-bg/5 border-bg/10"
              >
                <CardBody>
                  <CardTitle>{e.title}</CardTitle>
                  <p className="mt-3 opacity-75">{e.note}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark" rounded="none" className="text-center">
        <Container size="md">
          <p className="font-mono text-xs uppercase tracking-[0.12em] opacity-60">
            // Clique sur Cody
          </p>
          <button
            type="button"
            aria-label="Changer l'humeur de Cody"
            onClick={() => setMoodIdx((i) => (i + 1) % CYCLE.length)}
            className="mt-8 mx-auto block"
          >
            <Cody mood={mood} variant="portfolio" size={220} />
          </button>
          <p className="mt-6 font-mono text-sm opacity-70">mood: {mood}</p>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
