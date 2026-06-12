import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { ProjectType } from "@/data/projects";

type Filter = "all" | ProjectType;

const FILTERS: Filter[] = ["all", "web", "mobile", "desktop", "fullstack", "design"];

export function ProjectFilters({
  active,
  onChange,
}: {
  active: Filter;
  onChange: (f: Filter) => void;
}) {
  const { t } = useTranslation("portfolio");
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((f) => (
        <Button
          key={f}
          size="sm"
          variant={active === f ? "solid-cream" : "glass-cream"}
          onClick={() => onChange(f)}
        >
          {t(`filters.${f}`)}
        </Button>
      ))}
    </div>
  );
}

export type { Filter };
