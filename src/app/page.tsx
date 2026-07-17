import { BackendStatus } from "@/components/system/backend-status";

export default function HomePage() {
  return (
    <main className="bootstrap-shell">
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />

      <header className="bootstrap-header">
        <a className="brand" href="#top" aria-label="TRYON, inicio">
          <span>TRY</span><strong>ON</strong>
          <small>AI VIRTUAL TRY-ON</small>
        </a>
        <BackendStatus />
      </header>

      <section id="top" className="bootstrap-hero">
        <p className="eyebrow">FRONTEND FOUNDATION · ZIP 01A</p>
        <h1>La base profesional de tu experiencia <em>Try-On</em>.</h1>
        <p className="lead">
          Next.js, TypeScript, diseño responsive y cliente API real preparado para integrar
          planes, precios, autenticación y generación con los endpoints existentes.
        </p>
        <div className="bootstrap-actions">
          <a className="button button--primary" href="#foundation">Ver preparación</a>
          <a className="button button--secondary" href="#api">Revisar API</a>
        </div>
      </section>

      <section id="foundation" className="foundation-grid" aria-label="Base del proyecto">
        <article className="foundation-card">
          <span>01</span>
          <h2>Arquitectura incremental</h2>
          <p>Preparada para recibir cada ZIP sin reescribir módulos anteriores.</p>
        </article>
        <article className="foundation-card">
          <span>02</span>
          <h2>Responsive desde el inicio</h2>
          <p>Escalas, contenedores y composición fluidos para móvil, tableta y escritorio.</p>
        </article>
        <article id="api" className="foundation-card foundation-card--accent">
          <span>03</span>
          <h2>Backend real</h2>
          <p>Cliente tipado, errores controlados, timeout y verificación del endpoint `/health`.</p>
        </article>
      </section>

      <footer className="bootstrap-footer">
        <p>TRYON · AI Virtual Try-On Platform</p>
        <p>La landing completa se incorporará módulo por módulo.</p>
      </footer>
    </main>
  );
}
