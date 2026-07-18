import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";
import styles from "./legal-page.module.css";

type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
  previous?: { href: string; label: string };
  next?: { href: string; label: string };
};

export function LegalPage({
  eyebrow,
  title,
  description,
  updatedAt,
  sections,
  previous,
  next,
}: LegalPageProps) {
  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.shell}>
        <header className={styles.hero}>
          <Link className={styles.backLink} href="/">
            ← Volver a TRYON
          </Link>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <small>Última actualización: {updatedAt}</small>
        </header>

        <div className={styles.layout}>
          <aside className={styles.sidebar} aria-label="Contenido de la página">
            <p>En esta página</p>
            <nav>
              {sections.map((section, index) => (
                <a key={section.id} href={`#${section.id}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className={styles.article}>
            {sections.map((section) => (
              <section key={section.id} id={section.id} className={styles.section}>
                <h2>{section.title}</h2>
                <div>{section.content}</div>
              </section>
            ))}

            <div className={styles.notice}>
              <strong>Información importante</strong>
              <p>
                Estas condiciones describen el funcionamiento público de TRYON. Las funciones,
                límites y opciones comerciales concretas que aparezcan dentro de la plataforma
                serán las vigentes en el servicio y en el plan contratado.
              </p>
            </div>

            <nav className={styles.pageNavigation} aria-label="Navegación legal">
              {previous ? (
                <Link href={previous.href as Route}>
                  <span>Anterior</span>
                  {previous.label}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={next.href as Route}>
                  <span>Siguiente</span>
                  {next.label}
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </article>
        </div>
      </div>
    </main>
  );
}
