const SparkIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Z" />
    <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
  </svg>
);

const GarmentIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path d="M8.2 4.5 4 7.1l2 4 2-1V20h8v-9.9l2 1 2-4-4.2-2.6A5.4 5.4 0 0 1 12 6a5.4 5.4 0 0 1-3.8-1.5Z" />
  </svg>
);

export function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Vista conceptual de la experiencia Try-On">
      <div className="hero-visual__halo" aria-hidden="true" />

      <article className="hero-stage">
        <div className="hero-stage__topbar">
          <div>
            <span>LIVE PREVIEW</span>
            <strong>AI Try-On Studio</strong>
          </div>
          <span className="hero-stage__status"><i /> IA lista</span>
        </div>

        <div className="hero-stage__canvas">
          <div className="fashion-frame fashion-frame--before">
            <span>ANTES</span>
            <div className="fashion-silhouette" aria-hidden="true">
              <div className="fashion-silhouette__head" />
              <div className="fashion-silhouette__body" />
            </div>
          </div>

          <div className="fashion-divider" aria-hidden="true">
            <span>↔</span>
          </div>

          <div className="fashion-frame fashion-frame--after">
            <span>DESPUÉS</span>
            <div className="fashion-silhouette fashion-silhouette--styled" aria-hidden="true">
              <div className="fashion-silhouette__head" />
              <div className="fashion-silhouette__body" />
              <div className="fashion-silhouette__garment" />
            </div>
          </div>
        </div>

        <div className="hero-stage__footer">
          <div className="hero-stage__metric"><span>Procesamiento</span><strong>Alta fidelidad</strong></div>
          <div className="hero-stage__metric"><span>Privacidad</span><strong>Diseñada para protegerte</strong></div>
        </div>
      </article>

      <aside className="hero-floating-card hero-floating-card--garment">
        <span className="hero-floating-card__icon"><GarmentIcon /></span>
        <div><small>PRENDA SELECCIONADA</small><strong>Look editorial</strong></div>
      </aside>

      <aside className="hero-floating-card hero-floating-card--ai">
        <span className="hero-floating-card__icon"><SparkIcon /></span>
        <div><small>MOTOR DE IA</small><strong>Ajuste inteligente</strong></div>
      </aside>

      <div className="hero-visual__orbit hero-visual__orbit--one" aria-hidden="true" />
      <div className="hero-visual__orbit hero-visual__orbit--two" aria-hidden="true" />
    </div>
  );
}
