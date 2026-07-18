"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./social-proof-section.module.css";

type ProofCard = {
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
};

const proofCards: ProofCard[] = [
  {
    eyebrow: "PARA COMERCIO",
    title: "Convierte la duda en decisión",
    description:
      "Presenta una experiencia de prueba visual antes de enviar al usuario al flujo de registro o compra.",
    detail: "Ideal para catálogos, campañas y páginas de producto.",
  },
  {
    eyebrow: "PARA CREADORES",
    title: "Explora estilos con menos fricción",
    description:
      "Permite comparar looks, descubrir combinaciones y preparar nuevas ideas desde una experiencia clara y rápida.",
    detail: "Pensado para contenido, styling y experimentación visual.",
  },
  {
    eyebrow: "PARA MARCAS",
    title: "Una vitrina digital más inmersiva",
    description:
      "Integra una capa visual avanzada sin convertir la landing en una aplicación pesada ni confusa.",
    detail: "Diseño adaptable a móvil, tableta y escritorio.",
  },
];

const trustItems = [
  { label: "Datos comerciales", value: "Desde el backend" },
  { label: "Planes y precios", value: "Actualización dinámica" },
  { label: "Experiencia", value: "Responsive" },
  { label: "Contenido", value: "SFW" },
];

export function SocialProofSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCard = proofCards[activeIndex];

  const statusText = useMemo(
    () => `${String(activeIndex + 1).padStart(2, "0")} / ${String(proofCards.length).padStart(2, "0")}`,
    [activeIndex],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % proofCards.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className={styles.section} id="confianza" aria-labelledby="social-proof-title">
      <div className={styles.glow} aria-hidden="true" />
      <span className={styles.lightSweep} aria-hidden="true" />

      <div className={styles.header}>
        <div>
          <span className="sectionKicker">DISEÑADO PARA CONVERTIR</span>
          <h2 id="social-proof-title">
            Una experiencia visual que se siente <em>lista para producción.</em>
          </h2>
        </div>
        <p>
          Esta sección comunica valor sin inventar testimonios, alianzas ni cifras. Los casos reales podrán
          publicarse cuando existan datos verificables.
        </p>
      </div>

      <div className={styles.layout}>
        <div className={styles.cardStage} aria-live="polite">
          <div className={styles.cardTopline}>
            <span>{activeCard.eyebrow}</span>
            <small>{statusText}</small>
          </div>
          <h3>{activeCard.title}</h3>
          <p>{activeCard.description}</p>
          <div className={styles.detail}>{activeCard.detail}</div>

          <div className={styles.controls} aria-label="Cambiar escenario">
            {proofCards.map((card, index) => (
              <button
                aria-label={`Mostrar ${card.title}`}
                aria-pressed={index === activeIndex}
                className={index === activeIndex ? styles.activeDot : undefined}
                key={card.title}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            ))}
          </div>
        </div>

        <div className={styles.trustPanel}>
          <span className={styles.panelLabel}>SEÑALES DE CONFIANZA</span>
          <div className={styles.trustGrid}>
            {trustItems.map((item) => (
              <article key={item.label}>
                <small>{item.label}</small>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
          <div className={styles.disclaimer}>
            <span aria-hidden="true">✓</span>
            <p>
              No mostramos marcas asociadas, reseñas ni métricas hasta contar con evidencia real y autorización
              para publicarlas.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.workflowRail} aria-label="Flujos compatibles">
        <span>ECOMMERCE</span>
        <span>FASHION BRANDS</span>
        <span>CREATORS</span>
        <span>PERSONAL STYLING</span>
        <span>CAMPAIGNS</span>
      </div>
    </section>
  );
}
