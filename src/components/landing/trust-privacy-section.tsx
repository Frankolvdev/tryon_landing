"use client";

import { useState } from "react";
import styles from "./trust-privacy-section.module.css";
import { HolographicFashionScene } from "./holographic-fashion-scene";

type TrustItem = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  icon: string;
};

const trustItems: TrustItem[] = [
  {
    id: "privacy",
    eyebrow: "PRIVACIDAD",
    title: "Tus imágenes, bajo tu control.",
    description: "Una experiencia clara sobre carga, procesamiento y administración de resultados.",
    detail: "La interfaz queda preparada para enlazar las políticas definitivas de conservación, eliminación y tratamiento de imágenes cuando se publique el módulo legal.",
    icon: "◇",
  },
  {
    id: "quality",
    eyebrow: "CALIDAD VISUAL",
    title: "Diseñado para resultados creíbles.",
    description: "La presentación prioriza pose, proporción, caída de la prenda y consistencia visual.",
    detail: "No mostramos porcentajes de precisión inventados. Las métricas públicas solo aparecerán cuando el backend proporcione datos verificables.",
    icon: "✦",
  },
  {
    id: "devices",
    eyebrow: "MULTIDISPOSITIVO",
    title: "La misma experiencia en cada pantalla.",
    description: "Controles táctiles, navegación por teclado y composiciones adaptadas a móvil.",
    detail: "Cada módulo de la landing se construye y valida de forma responsive, en lugar de limitarse a reducir el diseño de escritorio.",
    icon: "⌁",
  },
  {
    id: "platform",
    eyebrow: "PLATAFORMA REAL",
    title: "Preparado para conectarse al SaaS.",
    description: "Planes, registro y operaciones importantes usarán únicamente endpoints reales.",
    detail: "Los valores configurables desde el BackOffice no se duplicarán de forma fija en la landing. Se consumirán desde la API en sus módulos de integración.",
    icon: "◎",
  },
];

export function TrustPrivacySection() {
  const [activeId, setActiveId] = useState(trustItems[0].id);
  const activeItem = trustItems.find((item) => item.id === activeId) ?? trustItems[0];

  return (
    <section className={styles.section} id="security" aria-labelledby="trust-title">
      <div className={styles.ambient} aria-hidden="true" />

      <div className={styles.heading}>
        <p>CONFIANZA DESDE EL PRIMER CLIC</p>
        <h2 id="trust-title">
          Tecnología avanzada. <em>Experiencia responsable.</em>
        </h2>
        <div className={styles.trustIntro}>
          <div className={styles.trustVisual} aria-hidden="true">
            <div className={styles.holoBackdrop} />
            <HolographicFashionScene />
            <div className={styles.sceneBadge}>
              <span /> Profundidad 3D real
            </div>
          </div>
          <p>
            La landing explica con claridad qué es demostrativo y qué estará conectado al sistema real,
            sin métricas, testimonios ni promesas técnicas inventadas.
          </p>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.tabs} role="tablist" aria-label="Principios de la plataforma">
          {trustItems.map((item, index) => {
            const active = item.id === activeId;
            return (
              <button
                className={active ? styles.tabActive : styles.tab}
                id={`trust-tab-${item.id}`}
                key={item.id}
                onClick={() => setActiveId(item.id)}
                role="tab"
                aria-controls={`trust-panel-${item.id}`}
                aria-selected={active}
                type="button"
              >
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.tabIcon} aria-hidden="true">{item.icon}</span>
                <span className={styles.tabCopy}>
                  <small>{item.eyebrow}</small>
                  <strong>{item.title}</strong>
                </span>
                <span className={styles.arrow} aria-hidden="true">→</span>
              </button>
            );
          })}
        </div>

        <div
          className={styles.panel}
          id={`trust-panel-${activeItem.id}`}
          role="tabpanel"
          aria-labelledby={`trust-tab-${activeItem.id}`}
          key={activeItem.id}
        >
          <div className={styles.panelGrid} aria-hidden="true" />
          <div className={styles.orbit} aria-hidden="true">
            <span />
            <span />
            <span />
            <b>{activeItem.icon}</b>
          </div>
          <div className={styles.panelCopy}>
            <small>{activeItem.eyebrow}</small>
            <h3>{activeItem.title}</h3>
            <p>{activeItem.description}</p>
            <div>{activeItem.detail}</div>
          </div>
          <div className={styles.statusRow}>
            <span><i /> Arquitectura modular</span>
            <span><i /> Responsive</span>
            <span><i /> API real</span>
          </div>
        </div>
      </div>
    </section>
  );
}
