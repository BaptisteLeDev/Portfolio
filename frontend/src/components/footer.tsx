import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Cody } from "@/components/cody";
import { Divider } from "@/components/ui/divider";

export function Footer() {
  const { t } = useTranslation("common");
  return (
    <footer className="relative bg-bg text-fg py-20">
      <Container size="lg">
        <Divider variant="brackets" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.1em] opacity-60">// Liens</p>
            <ul className="mt-4 space-y-2">
              <li><Link to="/">{t("nav.home")}</Link></li>
              <li><Link to="/portfolio">{t("nav.portfolio")}</Link></li>
              <li><Link to="/bonus">{t("nav.bonus")}</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.1em] opacity-60">// Contact</p>
            <ul className="mt-4 space-y-2">
              <li><a href="mailto:baptiste.dechamp@tomexplore.com">Email</a></li>
              <li><a href="https://github.com/BaptisteLeDev" target="_blank" rel="noreferrer">GitHub</a></li>
            </ul>
          </div>
          <div className="flex md:justify-end">
            <Cody variant="bracket" mood="happy" size={120} />
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
