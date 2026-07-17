"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styles from "./how-it-works-section.module.css";

const steps = [
  {
    number: "1",
    title: "Sube",
    detail: "Carga tu foto de forma segura",
    icon: "↑",
    signal: "Imagen preparada",
  },
  {
    number: "2",
    title: "Elige",
    detail: "Selecciona el outfit que prefieras",
    icon: "◇",
    signal: "Look seleccionado",
  },
  {
    number: "3",
    title: "IA procesa",
    detail: "El motor analiza pose, luz y tejido",
    icon: "✦",
    signal: "Análisis visual activo",
  },
  {
    number: "4",
    title: "Disfruta",
    detail: "Compara, guarda o comparte el resultado",
    icon: "♡",
    signal: "Resultado listo",
  },
] as const;

const looks = [
  { src: "/images/landing/look-1.jpg", label: "Noir" },
  { src: "/images/landing/look-2.jpg", label: "Ivory" },
  { src: "/images/landing/look-3.jpg", label: "Crimson" },
  { src: "/images/landing/look-4.jpg", label: "Lace" },
  { src: "/images/landing/look-5.jpg", label: "Denim" },
] as const;

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeLook, setActiveLook] = useState(2);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length);
    }, 3400);

    return () => window.clearInterval(timer);
  }, [paused]);

  const currentStep = steps[activeStep];
  const currentLook = useMemo(() => looks[activeLook], [activeLook]);

  return (
    <section
      className={styles.section}
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.redWave} aria-hidden="true" />
      <div className={styles.blueGlow} aria-hidden="true" />

      <div className={styles.mainGrid}>
        <div className={styles.workflowColumn}>
          <p className={styles.kicker}>CÓMO FUNCIONA</p>

          <div className={styles.steps} role="tablist" aria-label="Pasos del proceso Try-On">
            <div className={styles.connector} aria-hidden="true">
              <span style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }} />
            </div>

            {steps.map((step, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeStep === index}
                aria-controls="how-it-works-visual"
                className={`${styles.step} ${activeStep === index ? styles.stepActive : ""}`}
                key={step.title}
                onClick={() => setActiveStep(index)}
              >
                <span className={styles.iconRing} aria-hidden="true">
                  <span>{step.icon}</span>
                </span>
                <span className={styles.stepTitle}>
                  <b>{step.number}</b> {step.title}
                </span>
                <span className={styles.stepDetail}>{step.detail}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.quoteColumn} aria-live="polite">
          <blockquote>
            “El futuro de la moda está <em>aquí.</em>”
          </blockquote>
          <p>Pruébalo tú mismo.</p>
          <span className={styles.quoteLine} />
          <div className={styles.liveSignal}>
            <i aria-hidden="true" />
            {currentStep.signal}
          </div>
        </div>

        <div className={styles.stage} id="how-it-works-visual" role="tabpanel" tabIndex={0}>
          <div className={styles.ceilingRing} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className={styles.floorRing} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className={styles.lightBeam} aria-hidden="true" />
          <div className={styles.scanLine} aria-hidden="true" />

          <div className={styles.modelCard}>
            <Image
              src={currentLook.src}
              alt={`Modelo adulta con el estilo ${currentLook.label} en una demostración SFW de virtual try-on`}
              fill
              sizes="(max-width: 780px) 78vw, 360px"
              priority={false}
            />
            <div className={styles.modelShade} aria-hidden="true" />
          </div>

          <div className={styles.orbitCards} aria-label="Selecciona un look de demostración">
            {looks.map((look, index) => (
              <button
                type="button"
                className={`${styles.lookCard} ${activeLook === index ? styles.lookCardActive : ""}`}
                style={{ "--look-index": index } as React.CSSProperties}
                key={look.label}
                onClick={() => setActiveLook(index)}
                aria-pressed={activeLook === index}
                aria-label={`Seleccionar estilo ${look.label}`}
              >
                <Image src={look.src} alt="" fill sizes="80px" />
                <span>{look.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.ctaPanel}>
        <ul aria-label="Beneficios principales">
          <li>Resultados ultrarrealistas</li>
          <li>Cualquier tipo de cuerpo</li>
          <li>Cualquier outfit</li>
          <li>Privacidad primero</li>
          <li>Rápido y sencillo</li>
          <li>Mejora continua</li>
        </ul>

        <div className={styles.ctaCopy}>
          <h3>¿Listo para ver la magia?</h3>
          <p>Descubre los planes disponibles y prepara tu primera experiencia.</p>
        </div>

        <a className={styles.ctaButton} href="#pricing">
          Comenzar ahora <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
