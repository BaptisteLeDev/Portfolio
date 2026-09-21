import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { Tag } from "@/components/ui/tag";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bracket } from "@/components/ui/bracket";
import { Divider } from "@/components/ui/divider";
import { AnimatedGradient } from "@/components/effects/animated-gradient";
import { NoiseOverlay } from "@/components/effects/noise-overlay";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Footer } from "@/components/footer";
import { projects, type SitemapNode } from "@/data/projects";
import { GalleryCarousel } from "@/components/portfolio/gallery-carousel";

const statusLabel: Record<string, string> = {
  live: "En production",
  wip: "En développement",
  archived: "Archivé",
};

function SitemapTree({ nodes, depth = 0 }: { nodes: SitemapNode[]; depth?: number }) {
  return (
    <ul className={depth === 0 ? "space-y-4" : "space-y-2 border-l border-fg/15 pl-4 ml-1"}>
      {nodes.map((node) => (
        <li key={node.path}>
          <div className="flex flex-wrap gap-x-3">
            <span className="font-mono text-xs uppercase tracking-[0.1em]">{node.label}</span>
            <span className="font-mono text-xs opacity-40">{node.path}</span>
          </div>
          {node.children && <SitemapTree nodes={node.children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const { t } = useTranslation("project");
  const { t: tp } = useTranslation("portfolio");
  const idx = projects.findIndex((p) => p.id === id);

  if (idx === -1) return <Navigate to="/404" replace />;

  const project = projects[idx];
  const typesLabel = project.types.map((ty) => tp(`filters.${ty}`)).join(" · ");
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const palette = project.thumbnail.kind === "gradient" ? project.thumbnail.palette : "chaud";

  return (
    <>
      {/* Hero projet - centré vertical, hauteur adaptée */}
      <section className="relative overflow-hidden flex items-center pt-24 pb-24 md:pt-28 md:pb-32 px-6 md:px-8">
        <AnimatedGradient palette={palette} />
        <div className="absolute inset-0 bg-bg/45" aria-hidden="true" />
        <NoiseOverlay />
        <Container size="lg" className="relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Label>{typesLabel}</Label>
            <span
              className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] px-3 py-1 rounded-full border ${
                project.status === "live"
                  ? "bg-success/15 border-success/40 text-success"
                  : project.status === "wip"
                    ? "bg-warn/15 border-warn/40 text-warn"
                    : "bg-fg/10 border-fg/20 text-fg/70"
              }`}
            >
              {project.status === "live" && (
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-success"
                  style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
                />
              )}
              {statusLabel[project.status]}
            </span>
          </div>
          <h1
            className="font-display font-black"
            style={{
              fontSize: "var(--text-display-xl)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
            }}
          >
            {project.title}
          </h1>
          <p className="mt-5 text-xl md:text-2xl opacity-95 max-w-2xl leading-snug">
            {project.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
            <span>
              <span className="opacity-60">{t("role")} · </span>
              <span className="opacity-95">{project.role}</span>
            </span>
            <span>
              <span className="opacity-60">{t("period")} · </span>
              <span className="opacity-95">{project.period}</span>
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Tag key={s} className="bg-bg/55 text-fg border-fg/20">{s}</Tag>
            ))}
          </div>
          {project.links && (project.links.live || project.links.repo) && (
            <div className="mt-8 flex gap-3 flex-wrap">
              {project.links.live && (
                <Button variant="gradient" size="md" asChild className="group">
                  <a href={project.links.live} target="_blank" rel="noreferrer">
                    {t("view_live")}
                    <span
                      className="ml-1 flex size-6 items-center justify-center rounded-full bg-bg/15 transition-transform duration-300 ease-[var(--ease-signature)] group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </a>
                </Button>
              )}
              {project.links.repo && (
                <Button variant="glass-cream" size="md" asChild className="group">
                  <a href={project.links.repo} target="_blank" rel="noreferrer">
                    {t("view_repo")}
                  </a>
                </Button>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* Description - floating cream panel, inset from edges */}
      <Section tone="cream" rounded="xl" overlap className="mx-4 md:mx-10 py-16 md:py-20">
        <Container size="md" className="relative text-bg">
          <Bracket side="left" size="giant" float className="left-[-3rem] top-[-2rem] opacity-15 text-bg" />
          <ScrollReveal effect="rise">
            <Label className="text-bg">À PROPOS DU PROJET</Label>
            <p className="mt-5 max-w-[62ch] text-lg md:text-xl leading-[1.7]">{project.description}</p>
          </ScrollReveal>
          {project.brief && (
            <ScrollReveal effect="rise" delay={120}>
              <Label className="text-bg mt-12">{t("brief_note")}</Label>
              <iframe
                src={project.brief.src}
                title={project.brief.title}
                className="mt-6 w-full h-[640px] rounded-[16px] border-0 bg-bg/5"
                loading="lazy"
              />
            </ScrollReveal>
          )}
        </Container>
      </Section>

      {/* Problem / Solution / Outcome */}
      {(project.problem || project.solution || project.outcome) && (
        <Section tone="dark" rounded="none" className="py-20">
          <Container size="lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.problem && (
                <ScrollReveal effect="rise">
                  <Card tone="glass" radius="lg" className="h-full">
                    <CardBody>
                      <Label>{t("problem")}</Label>
                      <p className="mt-4 leading-relaxed">{project.problem}</p>
                    </CardBody>
                  </Card>
                </ScrollReveal>
              )}
              {project.solution && (
                <ScrollReveal effect="rise" delay={80}>
                  <Card tone="glass" radius="lg" className="h-full">
                    <CardBody>
                      <Label>{t("solution")}</Label>
                      <p className="mt-4 leading-relaxed">{project.solution}</p>
                    </CardBody>
                  </Card>
                </ScrollReveal>
              )}
              {project.outcome && (
                <ScrollReveal effect="rise" delay={160}>
                  <Card tone="glass" radius="lg" className="h-full">
                    <CardBody>
                      <Label>{t("outcome")}</Label>
                      <p className="mt-4 leading-relaxed">{project.outcome}</p>
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
        <Section tone="gradient" rounded="2xl" overlap className="py-20">
          <AnimatedGradient palette="hero" className="opacity-30" />
          <Container size="lg" className="relative z-10">
            <Label>{t("versions")}</Label>
            <h2
              className="mt-3 font-display font-black"
              style={{ fontSize: "var(--text-h2)", lineHeight: 1, letterSpacing: "-0.02em" }}
            >
              Évolution technique
            </h2>
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
                      <p className="mt-4 opacity-85 leading-relaxed">{v.note}</p>
                    </CardBody>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
            {project.team && (
              <ScrollReveal effect="rise">
                <Label className="mt-12">{t("team")}</Label>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {project.team.map((m) => (
                    <a
                      key={m.url}
                      href={m.url}
                      target="_blank"
                      rel="noreferrer"
                      className="opacity-85 hover:opacity-100 transition-opacity"
                    >
                      {m.name} →
                    </a>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </Container>
        </Section>
      )}

      {/* SEO sitemap */}
      {project.sitemap && project.sitemap.length > 0 && (
        <Section tone="dark" rounded="none" className="py-20">
          <Container size="lg">
            <Label>{t("sitemap")}</Label>
            <div className="mt-8">
              <SitemapTree nodes={project.sitemap} />
            </div>
          </Container>
        </Section>
      )}

      {/* Gallery */}
      {((project.screenshots?.length ?? 0) + (project.videos?.length ?? 0) > 0) && (
        <Section tone="cream" rounded="none" className="py-20">
          <Container size="xl" className="text-bg">
            <Label className="text-bg">{t("gallery")}</Label>
            {project.videos && project.videos.length > 0 && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.videos.map((src) => (
                  <video key={src} src={src} controls preload="metadata" className="w-full rounded-[24px]" />
                ))}
              </div>
            )}
            {project.screenshots && project.screenshots.length > 0 && (
              <GalleryCarousel
                images={project.screenshots}
                label={t("gallery")}
                expandLabel={t("expand_image")}
                zoomLabel={t("zoom_view")}
              />
            )}
          </Container>
        </Section>
      )}

      {/* Prev / Next nav */}
      <Section tone="dark" rounded="none" className="py-12 md:py-16">
        <Container size="lg">
          <Divider variant="brackets" className="mb-10" />
          <div className="flex flex-wrap justify-between gap-6">
            <Link to={`/portfolio/${prev.id}`} className="group max-w-[45%]">
              <p className="font-mono text-xs uppercase tracking-[0.12em] opacity-50">
                ← {t("prev")}
              </p>
              <p className="mt-2 font-display font-bold text-2xl group-hover:opacity-80 transition-opacity">
                {prev.title}
              </p>
            </Link>
            <Link to={`/portfolio/${next.id}`} className="group text-right max-w-[45%]">
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
