import styles from "./final-cta-section.module.css";

const assurances = [
  "Planes sincronizados con el backend",
  "Experiencia responsive",
  "Privacidad desde el diseño",
  "Sin instalaciones",
];

export function FinalCtaSection() {
  return (
    <section className={styles.section} aria-labelledby="final-cta-title">
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.grid} />
        <span className={styles.scan} />
      </div>

      <div className={styles.shell}>
        <div className={styles.assuranceGrid} aria-label="Ventajas principales">
          {assurances.map((item) => (
            <span key={item}>
              <i aria-hidden="true">✓</i>
              {item}
            </span>
          ))}
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.copy}>
          <span className={styles.kicker}>TU PRÓXIMO LOOK EMPIEZA AQUÍ</span>
          <h2 id="final-cta-title">¿Listo para ver la magia?</h2>
          <p>
            Revisa los planes disponibles y crea tu cuenta cuando estés listo para comenzar.
          </p>
        </div>

        <div className={styles.actions}>
          <a className={styles.primary} href="#pricing">
            Ver planes <span aria-hidden="true">→</span>
          </a>
          <a className={styles.secondary} href="#register">
            Crear cuenta
          </a>
          <small>Los precios se obtienen directamente del backend.</small>
        </div>
      </div>
    </section>
  );
}
