import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { Tag } from "@/components/ui/tag";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { AnimatedGradient } from "@/components/effects/animated-gradient";
import { NoiseOverlay } from "@/components/effects/noise-overlay";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Footer } from "@/components/footer";
import { projects } from "@/data/projects";

export default function ProjectPage() {
  const { id } = useParams();
  const { t } = useTranslation("project");
  const idx = projects.findIndex((p) => p.id === id);

  if (idx === -1) return <Navigate to="/404" replace />;

  const project = projects[idx];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const palette = project.thumbnail.kind === "gradient" ? project.thumbnail.palette : "chaud";

  return (
    <>
      {/* Hero projet */}
      <section className="relative min-h-[70vh] overflow-hidden flex items-end pt-32 pb-16 px-8">
        <AnimatedGradient palette={palette} />
        <NoiseOverlay />
        <Container size="lg" className="relative z-10">
          <Label>// {project.type}</Label>
          <h1
            className="mt-4 font-display font-black"
            style={{
              fontSize: "var(--text-display-xl)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
            }}
          >
            {project.title}
          </h1>
          <p className="mt-5 text-xl md:text-2xl opacity-90 max-w-2xl">{project.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm opacity-80">
            <span>
              <span className="opacity-60">{t("role")} · </span>
              {project.role}
            </span>
            <span>
              <span className="opacity-60">{t("period")} · </span>
              {project.period}
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
          {project.links && (
            <div className="mt-8 flex gap-3 flex-wrap">
              {project.links.live && (
                <Button variant="gradient" size="md" asChild>
                  <a href={project.links.live} target="_blank" rel="noreferrer">
                    {t("view_live")} →
                  </a>
                </Button>
              )}
              {project.links.repo && (
                <Button variant="glass-cream" size="md" asChild>
                  <a href={project.links.repo} target="_blank" rel="noreferrer">
                    {t("view_repo")}
                  </a>
                </Button>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* Description */}
      <Section tone="cream" rounded="2xl" overlap>
        <Container size="md" className="text-bg">
          <ScrollReveal effect="rise">
            <p className="text-xl leading-relaxed">{project.description}</p>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Problem / Solution / Outcome */}
      {(project.problem || project.solution || project.outcome) && (
        <Section tone="dark" rounded="none">
          <Container size="lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.problem && (
                <ScrollReveal effect="rise">
                  <Card tone="glass" radius="lg">
                    <CardBody>
                      <Label>{t("problem")}</Label>
                      <p className="mt-4">{project.problem}</p>
                    </CardBody>
                  </Card>
                </ScrollReveal>
              )}
              {project.solution && (
                <ScrollReveal effect="rise" delay={80}>
                  <Card tone="glass" radius="lg">
                    <CardBody>
                      <Label>{t("solution")}</Label>
                      <p className="mt-4">{project.solution}</p>
                    </CardBody>
                  </Card>
                </ScrollReveal>
              )}
              {project.outcome && (
                <ScrollReveal effect="rise" delay={160}>
                  <Card tone="glass" radius="lg">
                    <CardBody>
                      <Label>{t("outcome")}</Label>
                      <p className="mt-4">{project.outcome}</p>
                    </CardBody>
                  </Card>
                </ScrollReveal>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* Versions (Amigaru) */}
      {project.versions && project.versions.length > 0 && (
        <Section tone="gradient" rounded="2xl" overlap>
          <AnimatedGradient palette="hero" className="opacity-30" />
          <Container size="lg" className="relative z-10">
            <Label>{t("versions")}</Label>
            <div className="mt-10 space-y-6">
              {project.versions.map((v, i) => (
                <ScrollReveal key={v.label} effect="rise" delay={i * 80}>
                  <Card tone="glass" radius="lg">
                    <CardBody>
                      <div className="flex flex-wrap items-baseline justify-between gap-4">
                        <CardTitle>{v.label}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          {v.stack.map((s) => (
                            <Tag key={s}>{s}</Tag>
                          ))}
                        </div>
                      </div>
                      <p className="mt-4 opacity-85">{v.note}</p>
                    </CardBody>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Gallery */}
      {project.screenshots && project.screenshots.length > 0 && (
        <Section tone="cream" rounded="none">
          <Container size="xl" className="text-bg">
            <Label className="text-bg">{t("gallery")}</Label>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.screenshots.map((src) => (
                <img key={src} src={src} alt="" loading="lazy" className="w-full rounded-[24px]" />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Prev / Next nav */}
      <Section tone="dark" rounded="none" className="py-16">
        <Container size="lg">
          <Divider variant="brackets" className="mb-10" />
          <div className="flex flex-wrap justify-between gap-6">
            <Link to={`/portfolio/${prev.id}`} className="group">
              <p className="font-mono text-xs uppercase tracking-[0.12em] opacity-50">
                ← {t("prev")}
              </p>
              <p className="mt-2 font-display font-bold text-2xl group-hover:opacity-80 transition-opacity">
                {prev.title}
              </p>
            </Link>
            <Link to={`/portfolio/${next.id}`} className="group text-right">
              <p className="font-mono text-xs uppercase tracking-[0.12em] opacity-50">
                {t("next")} →
              </p>
              <p className="mt-2 font-display font-bold text-2xl group-hover:opacity-80 transition-opacity">
                {next.title}
              </p>
            </Link>
          </div>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
