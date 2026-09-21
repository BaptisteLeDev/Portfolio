import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ProjectCard, ProjectFilters, type Filter } from "@/components/portfolio";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Footer } from "@/components/footer";
import { projects } from "@/data/projects";

export default function Portfolio() {
  const { t } = useTranslation("portfolio");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all" ? projects : projects.filter((p) => p.types.includes(filter));

  return (
    <>
      <Section tone="dark" rounded="none" className="pt-32 pb-20">
        <Container size="xl">
          <h1
            className="mt-0 font-display font-black"
            style={{
              fontSize: "var(--text-display-xl)",
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
            }}
          >
            {t("title")}
          </h1>
          <p className="mt-6 text-xl md:text-2xl opacity-80 max-w-2xl">{t("subtitle")}</p>
          <div className="mt-10">
            <ProjectFilters active={filter} onChange={setFilter} />
          </div>
        </Container>
      </Section>

      <Section tone="cream" rounded="2xl" overlap>
        <Container size="xl" className="text-bg">
          {filtered.length === 0 ? (
            <p className="text-center opacity-60 py-20">{t("empty")}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project, i) => (
                <ScrollReveal key={project.id} effect="rise" delay={i * 60}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Footer />
    </>
  );
}
