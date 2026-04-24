import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/cn";

export function NavBar() {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/portfolio", label: t("nav.portfolio") },
    { to: "/bonus", label: t("nav.bonus") },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 backdrop-blur-md bg-bg/60 border-b border-fg/10 rounded-b-[12px]">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <Link to="/" className="font-mono text-lg font-bold tracking-tight">
            _baptiste
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "font-body text-sm transition-opacity",
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-100",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button size="sm" variant="solid-cream" asChild>
              <a href="mailto:baptiste.dechamp@tomexplore.com">{t("nav.contact")}</a>
            </Button>
          </div>
          <button
            className="md:hidden font-mono text-sm"
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
