import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { AnimatedGradient } from "@/components/effects/animated-gradient";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const isLive = project.status === "live";
  return (
    <Link to={`/portfolio/${project.id}`} className="block">
      <Card tone="glass" radius="lg" interactive>
        <div className="relative aspect-[4/3] overflow-hidden">
          {project.thumbnail.kind === "gradient" ? (
            <AnimatedGradient palette={project.thumbnail.palette} />
          ) : (
            <img src={project.thumbnail.src} alt="" loading="lazy" className="size-full object-cover" />
          )}
          <div className="absolute inset-0 bg-bg/30" />
          {isLive && (
            <span
              aria-label="Live"
              className="absolute top-4 right-4 size-2.5 rounded-full bg-success"
              style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
            />
          )}
          <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
            {project.stack.slice(0, 3).map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
        <CardBody>
          <p className="font-mono text-xs uppercase tracking-[0.1em] opacity-60 mb-2">
            // {project.type}
          </p>
          <CardTitle>{project.title}</CardTitle>
          <p className="mt-2 opacity-80 text-sm">{project.tagline}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
