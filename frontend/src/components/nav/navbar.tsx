import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Cody,
  useCodyBroadcast,
  type CodyMood,
  type CodyBrackets,
} from "@/components/cody";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/cn";

type NavKey = "home" | "portfolio" | "contact";

const reactions: Record<NavKey, { mood: CodyMood; brackets: CodyBrackets }> = {
  home:      { mood: "curious", brackets: "square" },
  portfolio: { mood: "star",    brackets: "square" },
  contact:   { mood: "mail",    brackets: "round"  },
};

function NavItem({
  to,
  reactKey,
  label,
  end,
}: {
  to: string;
  reactKey: NavKey;
  label: string;
  end?: boolean;
}) {
  const bind = useCodyBroadcast(reactions[reactKey]);
  return (
    <NavLink
      to={to}
      end={end}
      {...bind}
      className={({ isActive }) =>
        cn(
          "font-body text-sm transition-opacity",
          isActive ? "opacity-100" : "opacity-60 hover:opacity-100",
        )
      }
    >
      {label}
    </NavLink>
  );
}

function ContactButton({ label }: { label: string }) {
  const bind = useCodyBroadcast(reactions.contact);
  return (
    <Button size="sm" variant="solid-cream" asChild {...bind}>
      <a href="mailto:baptiste.dechamp@tomexplore.com">{label}</a>
    </Button>
  );
}

export function NavBar() {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav.home"), key: "home" as const },
    { to: "/portfolio", label: t("nav.portfolio"), key: "portfolio" as const },
  ];

  return (
    <>
      <header className="fixed top-4 inset-x-4 z-40 flex justify-center pointer-events-none">
        <nav className="pointer-events-auto backdrop-blur-md bg-bg/70 border border-fg/10 rounded-full px-3 md:px-5 h-14 flex items-center gap-1 md:gap-4 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]">
          <Link
            to="/"
            aria-label="Baptiste Dechamp — Accueil"
            className="shrink-0 rounded-full pl-2 pr-3 py-1 flex items-center gap-2 hover:opacity-100 opacity-85 transition-opacity"
          >
            <Cody
              mood="brand"
              brackets="round"
              variant="bracket"
              size={70}
              clickable={false}
              listen
              className="shrink-0"
            />
          </Link>

          <div className="hidden md:flex items-center gap-5 px-2">
            {links.map((l) => (
              <NavItem key={l.to} to={l.to} reactKey={l.key} label={l.label} end={l.to === "/"} />
            ))}
          </div>

          <div className="hidden md:block">
            <ContactButton label={t("nav.contact")} />
          </div>

          <button
            className="md:hidden font-mono text-sm px-3"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            [menu]
          </button>
        </nav>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} />
    </>
  );
}
