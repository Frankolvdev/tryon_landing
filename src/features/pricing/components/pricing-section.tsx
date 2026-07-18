"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./pricing-section.module.css";

const promises = [
  {
    icon: "∞",
    title: "Sin compra mínima",
    text: "Empieza con los tokens que realmente necesitas, sin paquetes inflados.",
  },
  {
    icon: "◌",
    title: "Sin mensualidad forzosa",
    text: "Tu saldo queda listo para usar cuando llegue tu siguiente idea.",
  },
  {
    icon: "↗",
    title: "Crece a tu ritmo",
    text: "Recarga cuando quieras y adapta tu consumo a cada proyecto.",
  },
];

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % promises.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const section = sectionRef.current;
    if (!section) return;

    const bounds = section.getBoundingClientRect();
    section.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    section.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="pricing"
      aria-labelledby="token-title"
      onPointerMove={handlePointerMove}
    >
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>TOKENS A TU MANERA</span>
          <h2 id="token-title">
            Compra solo lo que necesitas.
            <strong> Nada más.</strong>
          </h2>
          <p className={styles.lead}>
            Sin planes que te obliguen a pagar de más. Tú decides cuántos tokens
            agregar y cuándo utilizarlos para crear tus próximos looks.
          </p>

          <div className={styles.promiseRail} role="list" aria-label="Ventajas del sistema de tokens">
            {promises.map((promise, index) => (
              <button
                type="button"
                role="listitem"
                className={`${styles.promise} ${active === index ? styles.promiseActive : ""}`}
                key={promise.title}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
              >
                <span className={styles.promiseIcon} aria-hidden="true">{promise.icon}</span>
                <span>
                  <strong>{promise.title}</strong>
                  <small>{promise.text}</small>
                </span>
              </button>
            ))}
          </div>

          <div className={styles.actions}>
            <a className={styles.primary} href="#register">
              Explorar opciones de tokens
              <span aria-hidden="true">↗</span>
            </a>
            <span className={styles.microcopy}>Sin renovación automática obligatoria</span>
          </div>
        </div>

        <div className={styles.visual} aria-label="Representación animada de tokens flexibles">
          <div className={styles.orbitStage}>
            <div className={styles.outerOrbit} aria-hidden="true">
              <i className={styles.tokenA}>T</i>
              <i className={styles.tokenB}>T</i>
              <i className={styles.tokenC}>T</i>
            </div>
            <div className={styles.middleOrbit} aria-hidden="true" />
            <div className={styles.core}>
              <span className={styles.coreHalo} aria-hidden="true" />
              <span className={styles.coreLabel}>TU SALDO</span>
              <strong>Flexible</strong>
              <small>Recarga cuando lo necesites</small>
            </div>
            <div className={styles.scan} aria-hidden="true" />
          </div>

          <div className={styles.flowCard}>
            <span>Tu flujo</span>
            <div className={styles.flowSteps}>
              <strong>Elige</strong>
              <i aria-hidden="true">→</i>
              <strong>Recarga</strong>
              <i aria-hidden="true">→</i>
              <strong>Crea</strong>
            </div>
            <p>Sin comprometerte con más de lo que vas a usar.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
