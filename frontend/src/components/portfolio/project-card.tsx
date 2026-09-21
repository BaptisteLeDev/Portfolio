import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLayoutEffect, useRef, useState } from "react";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { AnimatedGradient } from "@/components/effects/animated-gradient";
import type { Project } from "@/data/projects";

const TAG_GAP = 8;
const MORE_WIDTH = 48;

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation("portfolio");
  const typesLabel = project.types.map((ty) => t(`filters.${ty}`)).join(" · ");
  const isLive = project.status === "live";
  const stackRow = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(project.stack.length);

  useLayoutEffect(() => {
    const el = stackRow.current;
    if (!el) return;
    const measure = () => {
      const tags = Array.from(el.children) as HTMLElement[];
      let w = 0;
      let count = 0;
      for (let i = 0; i < tags.length; i++) {
        const tw = tags[i].offsetWidth + (i > 0 ? TAG_GAP : 0);
        const need = i < tags.length - 1 ? MORE_WIDTH : 0;
        if (w + tw + need > el.clientWidth) break;
        w += tw;
        count++;
      }
      setVisible(count);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Link to={`/portfolio/${project.id}`} className="block">
      <Card tone="outline" radius="lg" interactive className="text-bg bg-bg/5 border-bg/10">
        <div className="relative aspect-[4/3] overflow-hidden">
          {project.thumbnail.kind === "gradient" ? (
            <AnimatedGradient palette={project.thumbnail.palette} />
          ) : (
            <img src={project.thumbnail.src} alt="" loading="lazy" className="size-full object-cover" />
          )}
          <div className="absolute inset-0 bg-bg/30" />
          {isLive && (
            <span
              role="img"
              aria-label="Live"
              className="absolute top-4 right-4 size-2.5 rounded-full bg-success"
              style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
            />
          )}
          <div className="absolute bottom-4 left-4 right-4">
          <div ref={stackRow} aria-hidden="true" className="absolute inset-0 flex gap-2 flex-nowrap overflow-hidden invisible">
            {project.stack.map((s) => (
              <Tag key={s} noise className="bg-bg/85 backdrop-blur-sm text-fg border-fg/15 whitespace-nowrap shrink-0">
                {s}
              </Tag>
            ))}
          </div>
          <div className="flex gap-2 flex-nowrap overflow-hidden">
            {project.stack.slice(0, visible).map((s) => (
              <Tag key={s} noise className="bg-bg/85 backdrop-blur-sm text-fg border-fg/15 whitespace-nowrap shrink-0">
                {s}
              </Tag>
            ))}
            {visible < project.stack.length && (
              <Tag noise className="bg-bg/85 backdrop-blur-sm text-fg border-fg/15 whitespace-nowrap shrink-0">
                +{project.stack.length - visible}
              </Tag>
            )}
          </div>
        </div>
        </div>
        <CardBody>
          <p className="font-mono text-xs uppercase tracking-[0.1em] opacity-55 mb-2">{typesLabel}</p>
          <CardTitle>{project.title}</CardTitle>
          <p className="mt-2 opacity-75 text-sm">{project.tagline}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
