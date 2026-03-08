import Link from 'next/link';

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor">
      <path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z" />
      <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z" />
    </svg>
  );
}

type FooterLinkProperties = {
  href: string;
  children: React.ReactNode;
};

function FooterExternalLink({ href, children }: FooterLinkProperties) {
  return (
    <li>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium
          text-white underline-offset-4
          transition-colors duration-150
          hover:bg-secondary hover:no-underline
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
        ">
        <span>{children}</span>
        <ExternalLinkIcon />
        <span className="sr-only">(abre em nova aba)</span>
      </Link>
    </li>
  );
}

export function Footer() {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="w-full border-t border-neutral-800 bg-content-bg text-white mt-5xl">
      <div className="mx-auto grid w-full max-w-content-desktop grid-cols-1 gap-8 px-5 py-8 sm:grid-cols-3">
        <h2 id="footer-heading" className="sr-only">
          Rodapé do site
        </h2>

        <section aria-labelledby="footer-contribute-title" className="space-y-3">
          <h3 id="footer-contribute-title" className="text-center text-lg font-bold sm:text-left">
            Contribua
          </h3>

          <nav aria-label="Links para contribuir">
            <ul className="space-y-1">
              <FooterExternalLink href="https://github.com/gabrielogregorio/valorant-tips/issues/new">
                Reportar bugs
              </FooterExternalLink>

              <FooterExternalLink href="https://github.com/gabrielogregorio/valorant-tips/issues/new">
                Solicitar agentes e mapas
              </FooterExternalLink>

              <FooterExternalLink href="https://github.com/gabrielogregorio/vavatips-backend">
                Backend em Node.js
              </FooterExternalLink>

              <FooterExternalLink href="https://github.com/gabrielogregorio/vavatips-frontend">
                Frontend com Next.js
              </FooterExternalLink>
            </ul>
          </nav>
        </section>

        <section aria-labelledby="footer-project-title" className="space-y-3 text-center sm:text-left">
          <h3 id="footer-project-title" className="text-lg font-bold">
            Projeto
          </h3>

          <p className="text-base leading-7 text-white">
            Esse é um projeto feito por fãs de Valorant, com a intenção de ajudar a melhorar a qualidade das gameplays
            do nosso cenário.
          </p>
        </section>

        <section aria-labelledby="footer-about-title" className="space-y-3 text-center sm:text-left">
          <h3 id="footer-about-title" className="text-lg font-bold">
            Sobre
          </h3>

          <p className="text-base leading-7 text-white">
            <span className="font-semibold">Valorant Tips</span> foi criado seguindo a política do{' '}
            <Link
              href="https://www.riotgames.com/pt-br/juridico"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2 font-bold underline underline-offset-4
                hover:no-underline
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
              ">
              <span>Lenga-Lenga Jurídico</span>
              <ExternalLinkIcon />
              <span className="sr-only">(abre em nova aba)</span>
            </Link>{' '}
            da Riot Games, com recursos pertencentes à Riot Games. A Riot Games não endossa nem patrocina este projeto.
          </p>
        </section>
      </div>
    </footer>
  );
}
