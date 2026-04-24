import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import {
  Cody,
  useCodyBroadcast,
  type CodyMood,
  type CodyBrackets,
} from "@/components/cody";
import { Divider } from "@/components/ui/divider";

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

export function Footer() {
  const { t } = useTranslation("common");
  return (
    <footer className="relative bg-bg text-fg py-20">
      <Container size="lg">
        <Divider variant="brackets" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.1em] opacity-60">// Liens</p>
            <ul className="mt-4 space-y-2">
              <li><FooterRouterLink to="/" reaction={R("curious", "square")}>{t("nav.home")}</FooterRouterLink></li>
              <li><FooterRouterLink to="/portfolio" reaction={R("star", "square")}>{t("nav.portfolio")}</FooterRouterLink></li>
              <li><FooterRouterLink to="/bonus" reaction={R("wow", "curly")}>{t("nav.bonus")}</FooterRouterLink></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.1em] opacity-60">// Contact</p>
            <ul className="mt-4 space-y-2">
              <li>
                <FooterLink href="mailto:baptiste.dechamp@tomexplore.com" reaction={R("mail", "round")}>
                  Email
                </FooterLink>
              </li>
              <li>
                <FooterLink
                  href="https://github.com/BaptisteLeDev"
                  target="_blank"
                  rel="noreferrer"
                  reaction={R("code", "angle")}
                >
                  GitHub
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
