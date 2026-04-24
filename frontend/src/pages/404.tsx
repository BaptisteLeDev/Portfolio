import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Bracket } from "@/components/ui/bracket";
import { Button } from "@/components/ui/button";
import { Cody } from "@/components/cody";

export default function NotFound() {
  const { t } = useTranslation("common");
  return (
    <Section tone="dark" rounded="none" className="min-h-screen flex items-center">
      <Container size="md" className="text-center">
        <div className="flex items-center justify-center gap-4">
          <Bracket side="left" size="giant" className="opacity-40" />
          <span
            className="font-display font-black"
            style={{
              fontSize: "var(--text-display-xxl)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            404
          </span>
          <Bracket side="right" size="giant" className="opacity-40" />
        </div>
        <h1
          className="mt-6 font-display font-black"
          style={{ fontSize: "var(--text-h2)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          Page introuvable
        </h1>
        <p className="mt-4 text-lg opacity-80 max-w-md mx-auto">
          Cette page s'est perdue entre deux commits. Cody cherche encore.
        </p>
        <div className="mt-10 flex justify-center">
          <Cody mood="confused" variant="portfolio" size={200} />
        </div>
        <div className="mt-10">
          <Button variant="gradient" size="lg" asChild>
            <Link to="/">{t("cta.back_home")} →</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
