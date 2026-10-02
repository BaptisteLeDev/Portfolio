import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, m } from "motion/react";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import {
  Cody,
  useCodyBroadcast,
  type CodyMood,
  type CodyBrackets,
} from "@/components/cody";
import { Divider } from "@/components/ui/divider";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/data/site";

const R = (mood: CodyMood, brackets: CodyBrackets) => ({ mood, brackets });

function FooterLink({
  children,
  reaction,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  reaction: { mood: CodyMood; brackets: CodyBrackets };
}) {
  const bind = useCodyBroadcast(reaction);
  return (
    <a
      {...props}
      {...bind}
      className="opacity-85 hover:opacity-100 transition-opacity"
    >
      {children}
    </a>
  );
}

function FooterRouterLink({
  to,
  reaction,
  children,
}: {
  to: string;
  reaction: { mood: CodyMood; brackets: CodyBrackets };
  children: React.ReactNode;
}) {
  const bind = useCodyBroadcast(reaction);
  return (
    <Link to={to} {...bind} className="opacity-85 hover:opacity-100 transition-opacity">
      {children}
    </Link>
  );
}

// 1st click copies, 2nd click lets the mailto through.
function CopyEmailLink() {
  const { t } = useTranslation("common");
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(false);
  const bind = useCodyBroadcast(R("mail", "round"));

  const onClick = (e: React.MouseEvent) => {
    if (copied) return;
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL).then(
      () => {
        setCopied(true);
        setToast(true);
        setTimeout(() => setToast(false), 2000);
      },
      () => (window.location.href = `mailto:${EMAIL}`),
    );
  };

  return (
    <span className="relative inline-block">
      <a
        href={`mailto:${EMAIL}`}
        onClick={onClick}
        {...bind}
        className="opacity-85 hover:opacity-100 transition-opacity"
      >
        {copied ? EMAIL : "Email"}
      </a>
      <span aria-live="polite" className="absolute left-0 bottom-full mb-2 pointer-events-none">
        <AnimatePresence>
          {toast && (
            <m.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="block whitespace-nowrap rounded-full bg-cream text-bg px-3 py-1 font-mono text-xs"
            >
              {t("contact.copied")}
            </m.span>
          )}
        </AnimatePresence>
      </span>
    </span>
  );
}

export function Footer() {
  const { t } = useTranslation("common");
  return (
    <footer className="relative bg-bg text-fg py-20">
      <Container size="lg">
        <Divider variant="brackets" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.1em] opacity-60">Liens</p>
            <ul className="mt-4 space-y-2">
              <li><FooterRouterLink to="/" reaction={R("curious", "square")}>{t("nav.home")}</FooterRouterLink></li>
              <li><FooterRouterLink to="/portfolio" reaction={R("star", "square")}>{t("nav.portfolio")}</FooterRouterLink></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.1em] opacity-60">Contact</p>
            <ul className="mt-4 space-y-2">
              <li>
                <CopyEmailLink />
              </li>
              <li>
                <FooterLink
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  reaction={R("code", "angle")}
                >
                  GitHub
                </FooterLink>
              </li>
              <li>
                <FooterLink
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  reaction={R("happy", "round")}
                >
                  LinkedIn
                </FooterLink>
              </li>
            </ul>
          </div>

          <div className="flex md:justify-end">
            <Cody mood="happy" brackets="square" variant="bracket" size={140} listen />
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between text-xs opacity-60 font-mono">
          <span>{t("footer.year")}</span>
          <span>{t("footer.signature")}</span>
        </div>
      </Container>
    </footer>
  );
}
