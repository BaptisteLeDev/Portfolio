import { useRef, useState } from "react";
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
import { contactLinks } from "@/data/site";

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

// Native popover: Esc + outside click + top layer for free.
function ContactMenu({ label }: { label: string }) {
  const bind = useCodyBroadcast(reactions.contact);
  const menu = useRef<HTMLDivElement>(null);

  const place = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    menu.current?.style.setProperty("top", `${r.bottom + 12}px`);
    menu.current?.style.setProperty("right", `${window.innerWidth - r.right}px`);
  };

  return (
    <>
      <Button size="sm" variant="solid-cream" popoverTarget="contact-menu" onClick={place} {...bind}>
        {label}
      </Button>
      <div
        id="contact-menu"
        ref={menu}
        popover="auto"
        className="fixed m-0 [inset:auto] rounded-2xl border border-fg/10 bg-bg/95 backdrop-blur-md p-2 text-fg shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]"
      >
        <ul className="flex flex-col">
          {contactLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                {...(l.external && { target: "_blank", rel: "noreferrer" })}
                className="block rounded-xl px-4 py-2 font-mono text-sm opacity-85 hover:opacity-100 hover:bg-fg/10 focus-visible:bg-fg/10"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
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
            aria-label="Baptiste Dechamp - Accueil"
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
            <ContactMenu label={t("nav.contact")} />
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
