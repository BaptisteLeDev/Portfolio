import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/footer";
import { EMAIL, SITE_URL } from "@/data/site";
import { useSeo } from "@/lib/seo";
import { pageMeta } from "@/data/pages";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <Label>{title}</Label>
      <div className="mt-4 space-y-3 leading-relaxed opacity-90 max-w-[68ch]">{children}</div>
    </section>
  );
}

export default function MentionsLegales() {
  useSeo(pageMeta("/mentions-legales"));

  return (
    <>
      <Section tone="dark" rounded="none" className="pt-32">
        <Container size="md">
          <h1
            className="font-display font-black"
            style={{ fontSize: "var(--text-h2)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            Mentions légales
          </h1>

          <Block title="Éditeur">
            <p>
              Le site {SITE_URL.replace("https://", "")} est édité par Baptiste Dechamp, à titre
              personnel.
            </p>
            <p>
              Contact :{" "}
              <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
                {EMAIL}
              </a>
            </p>
            <p>Directeur de la publication : Baptiste Dechamp.</p>
          </Block>

          <Block title="Hébergement">
            <p>
              Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis.{" "}
              <a href="https://vercel.com" target="_blank" rel="noreferrer" className="underline underline-offset-4">
                vercel.com
              </a>
            </p>
          </Block>

          <Block title="Propriété intellectuelle">
            <p>
              Les textes, visuels et le code de ce site appartiennent à Baptiste Dechamp, sauf
              mention contraire. Les projets réalisés en équipe restent la propriété de leurs
              auteurs respectifs. Les marques et logos cités appartiennent à leurs détenteurs.
            </p>
          </Block>

          <Block title="Données personnelles et cookies">
            <p>
              Ce site ne dépose aucun cookie, n'utilise aucun outil de mesure d'audience et ne
              collecte aucune donnée personnelle. Aucun bandeau de consentement n'est donc
              nécessaire.
            </p>
            <p>
              L'hébergeur conserve des journaux techniques (dont l'adresse IP) pour assurer le
              fonctionnement et la sécurité du service. Les icônes de la stack sont chargées depuis
              cdn.jsdelivr.net et api.iconify.design, qui reçoivent à ce titre l'adresse IP du
              visiteur.
            </p>
            <p>
              Pour toute question, ou pour exercer vos droits au titre du RGPD, écrivez à{" "}
              <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
                {EMAIL}
              </a>
              . Vous pouvez aussi saisir la CNIL (cnil.fr).
            </p>
          </Block>
        </Container>
      </Section>
      <Footer />
    </>
  );
}
