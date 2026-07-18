"use client";

import { useState } from "react";
import styles from "./trust-privacy-section.module.css";

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
            <div className={styles.hudGrid} />
            <div className={styles.scanLine} />
            <div className={styles.holoStage}>
              <span className={styles.stageRing} />
              <span className={styles.stageRingInner} />
              <span className={styles.stageBeam} />
            </div>

            <div className={styles.holoWoman}>
              <svg viewBox="0 0 220 430" role="presentation">
                <defs>
                  <linearGradient id="womanStroke" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#4e9dff" />
                    <stop offset=".48" stopColor="#ff4964" />
                    <stop offset="1" stopColor="#9b3dff" />
                  </linearGradient>
                </defs>
                <g fill="none" stroke="url(#womanStroke)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="111" cy="46" rx="28" ry="34" />
                  <path d="M86 42c8-25 43-31 55-6 6 12 3 28-5 39" />
                  <path d="M94 74c-5 14-7 27-4 43l-18 61 20 76-6 122" />
                  <path d="M129 76c8 18 9 31 5 47l19 54-17 80 9 118" />
                  <path d="M91 111c14 12 31 13 45 1" />
                  <path d="M83 129c22 17 58 19 77 0" />
                  <path d="M90 176c16 12 37 13 53 0" />
                  <path d="M91 254c15 10 31 10 46 0" />
                  <path d="M83 377l-16 30h26l8-30" />
                  <path d="M145 375l10 32h25l-21-32" />
                  <path d="M74 176 48 261l15 13 24-68" />
                  <path d="M153 176l25 80-14 14-23-64" />
                  <path d="M98 36c9 6 18 8 30 6" />
                </g>
              </svg>
              <span className={styles.bodyScan} />
              <span className={styles.bodyGlow} />
            </div>

            <div className={`${styles.outfitCard} ${styles.outfitDress}`}>
              <svg viewBox="0 0 90 110" role="presentation"><path d="M36 10h18l5 18 17 50-31 20-31-20 17-50z" /></svg>
              <span>Vestido</span>
            </div>
            <div className={`${styles.outfitCard} ${styles.outfitTop}`}>
              <svg viewBox="0 0 90 110" role="presentation"><path d="M29 16l16-8 16 8 16 15-12 14-6-8v49H31V37l-6 8-12-14z" /></svg>
              <span>Top</span>
            </div>
            <div className={`${styles.outfitCard} ${styles.outfitShorts}`}>
              <svg viewBox="0 0 90 110" role="presentation"><path d="M20 20h50l-4 58-21-10-21 10zM45 20v48" /></svg>
              <span>Shorts</span>
            </div>
            <div className={`${styles.outfitCard} ${styles.outfitJacket}`}>
              <svg viewBox="0 0 90 110" role="presentation"><path d="M29 14l16-7 16 7 15 20-10 11-8-10v53H32V35l-8 10-10-11zM45 14v74" /></svg>
              <span>Chaqueta</span>
            </div>

            <span className={`${styles.dataTag} ${styles.tagPrivacy}`}>Privacidad</span>
            <span className={`${styles.dataTag} ${styles.tagReal}`}>Tecnología real</span>
            <span className={`${styles.dataTag} ${styles.tagClear}`}>Transparencia</span>
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
