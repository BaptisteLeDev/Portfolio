import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Hero } from "@/components/hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Bracket } from "@/components/ui/bracket";
import { Label } from "@/components/ui/label";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { AnimatedGradient } from "@/components/effects/animated-gradient";
import { Footer } from "@/components/footer";
import { formations } from "@/data/formations";
import { hardSkills, softSkills } from "@/data/skills";
import { logiciels, stackStats } from "@/data/stack";
import type { StackItem, StackStat } from "@/data/stack";

export default function Accueil() {
  const { t } = useTranslation();

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. About - cream, rounded-top matching hero bottom, overlap */}
      <Section
        tone="cream"
        rounded="none"
        overlap
        className="rounded-t-[100px] max-md:rounded-t-[64px] max-sm:rounded-t-[32px] relative z-10"
      >
        <Container size="md" className="relative">
          <Bracket side="left" size="giant" float className="left-[-4rem] top-[-3rem] opacity-30 text-bg" />
          <Bracket side="right" size="giant" float className="right-[-4rem] bottom-[-3rem] opacity-30 text-bg" />
          <ScrollReveal effect="rise">
            <h2
              className="font-display font-black text-bg"
              style={{ fontSize: "var(--text-h1)", lineHeight: 1, letterSpacing: "-0.03em" }}
            >
              {t("home:about.title")}
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-bg/85 max-w-prose">
              {t("home:about.body")}
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      {/* 3. Parcours - rounded 2xl, overlap, dark + gradient chaud */}
      <Section tone="dark" rounded="2xl" overlap>
        <AnimatedGradient palette="chaud" className="opacity-30" />
        <Container size="lg" className="relative z-10">
          <h2
            className="font-display font-black"
            style={{ fontSize: "var(--text-h1)", lineHeight: 1, letterSpacing: "-0.03em" }}
          >
            {t("home:parcours.title")}
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {formations.map((f, i) => (
              <ScrollReveal key={f.title} effect="rise" delay={i * 80} className="h-full">
                <Card tone="glass" radius="lg" className="h-full">
                  <CardBody>
                    <Label className="opacity-50">{f.year}</Label>
                    <CardTitle className="mt-3">{f.title}</CardTitle>
                    <p className="mt-2 text-sm opacity-70">{f.school}</p>
                    {f.note && <p className="mt-4 text-sm opacity-80">{f.note}</p>}
                  </CardBody>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Skills - flat, overlap, cream */}
      <Section tone="cream" rounded="none" overlap>
        <Container size="lg" className="text-bg">
          <h2
            className="font-display font-black"
            style={{ fontSize: "var(--text-h1)", lineHeight: 1, letterSpacing: "-0.03em" }}
          >
            {t("home:skills.title")}
          </h2>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">
            {/* Hard - grouped lists, no bars */}
            <div>
              <h3 className="font-display font-bold text-2xl mb-6">{t("home:skills.hard")}</h3>
              <div className="space-y-6">
                {(Object.entries(hardSkills) as [keyof typeof hardSkills, string[]][]).map(([group, items]) => (
                  <div key={group}>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] opacity-50 mb-3">{group}</p>
                    <div className="flex flex-wrap gap-2">
                      {items.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center rounded-full border border-bg/15 bg-bg/5 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-bg/80"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft - numbered cards 01..04 */}
            <div>
              <h3 className="font-display font-bold text-2xl mb-6">{t("home:skills.soft")}</h3>
              <div className="space-y-4">
                {softSkills.map((s, i) => (
                  <div key={s.label} className="rounded-[16px] border border-bg/12 bg-bg/5 p-5">
                    <div className="flex items-baseline justify-between">
                      <span className="font-display font-bold text-lg">{s.label}</span>
                      <span className="font-mono text-xs opacity-50">0{i + 1}</span>
                    </div>
                    <p className="mt-2 text-sm opacity-85">{s.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Logiciels + Stacks - flat dark, giant marquee, click -> detail */}
      <section className="relative bg-bg text-fg py-24 overflow-hidden">
        <MarqueeBlock
          title={t("home:stack.logiciels_title")}
          items={logiciels}
          id="logiciels-detail"
          detailLabel={t("home:stack.detail")}
        />
        <MarqueeBlock
          title={t("home:stack.title")}
          items={stackStats}
          id="stack-detail"
          detailLabel={t("home:stack.detail")}
          withCount
          usesLabel={t("home:stack.uses")}
        />
      </section>

      {/* 6. CTA final - gradient, sans Cody */}
      <Section tone="gradient" rounded="2xl" overlap className="bg-bg">
        <AnimatedGradient palette="hero" className="opacity-40" />
        <Container size="md" className="relative z-10 text-center">
          <h2
            className="font-display font-black"
            style={{ fontSize: "var(--text-display-xl)", lineHeight: 1, letterSpacing: "-0.035em" }}
          >
            Envie de parler d'un projet&nbsp;?
          </h2>
          <p className="mt-6 text-xl opacity-85 max-w-prose mx-auto">
            Je réponds vite, que ce soit une alternance, un freelance ou juste un café.
          </p>
          <div className="mt-10 flex gap-4 justify-center flex-wrap">
            <Button variant="gradient" size="lg" asChild className="group">
              <a href="mailto:baptiste.dechamp@outlook.fr">
                Envoyer un email
                <span
                  className="ml-1 flex size-6 items-center justify-center rounded-full bg-bg/15 transition-transform duration-300 ease-[var(--ease-signature)] group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </Button>
            <Button variant="glass-cream" size="lg" asChild className="group">
              <Link to="/portfolio">{t("common:cta.see_projects")}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Footer />
    </>
  );
}

function MarqueeBlock({
  title,
  items,
  id,
  detailLabel,
  withCount,
  usesLabel,
}: {
  title: string;
  items: (StackItem | StackStat)[];
  id: string;
  detailLabel: string;
  withCount?: boolean;
  usesLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const colors = [
    "var(--color-pink)",
    "var(--color-cream)",
    "color-mix(in oklch, var(--color-fg) 30%, transparent)",
  ];
  return (
    <div className="py-12">
      <Container size="lg">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2
            className="font-display font-black"
            style={{ fontSize: "var(--text-h1)", lineHeight: 1, letterSpacing: "-0.03em" }}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={id}
            className="inline-flex items-center gap-2 rounded-full border border-fg/15 bg-fg/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-fg/80 transition-colors hover:bg-fg/10"
          >
            {detailLabel}
            <span
              aria-hidden="true"
              className={`transition-transform duration-300 ease-[var(--ease-signature)] ${open ? "rotate-45" : ""}`}
            >
              +
            </span>
          </button>
        </div>
      </Container>
      <div className="mt-12 mask-fade-x overflow-hidden">
        <div className="flex gap-8 w-max" style={{ animation: "marquee 40s linear infinite" }}>
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="font-display font-black whitespace-nowrap"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
                color: colors[i % 3],
              }}
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt=""
                  loading="lazy"
                  className="mr-3 inline-block size-[0.85em] align-[-0.12em]"
                  aria-hidden="true"
                />
              )}
              {item.label} <span className="opacity-40">·</span>
            </span>
          ))}
        </div>
      </div>
      <Container size="lg" className="mt-12">
        <ul id={id} hidden={!open} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {items.map((s) => (
            <li
              key={"key" in s ? s.key : s.label}
              className="flex items-center gap-3 rounded-full border border-fg/15 bg-fg/5 px-4 py-2.5"
            >
              {s.icon && (
                <img src={s.icon} alt="" loading="lazy" aria-hidden="true" className="size-5 shrink-0" />
              )}
              <span className="font-mono text-sm uppercase tracking-[0.1em]">{s.label}</span>
              {withCount && (
                <span className="ml-auto font-mono text-xs text-fg/60 shrink-0">
                  ×{(s as StackStat).count} {usesLabel}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
