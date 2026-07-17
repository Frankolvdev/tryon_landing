"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styles from "./how-it-works-section.module.css";

const ROTATION_MS = 4200;

const steps = [
  { number: "1", title: "Sube", detail: "Carga tu foto de forma segura", icon: "↑", signal: "Imagen preparada" },
  { number: "2", title: "Elige", detail: "Selecciona el outfit que prefieras", icon: "◇", signal: "Look seleccionado" },
  { number: "3", title: "IA procesa", detail: "El motor analiza pose, luz y tejido", icon: "✦", signal: "Análisis visual activo" },
  { number: "4", title: "Disfruta", detail: "Compara, guarda o comparte el resultado", icon: "♡", signal: "Resultado listo" },
] as const;

const looks = [
  { src: "/images/landing/look-1.jpg", label: "Noir" },
  { src: "/images/landing/look-2.jpg", label: "Ivory" },
  { src: "/images/landing/look-3.jpg", label: "Crimson" },
  { src: "/images/landing/look-4.jpg", label: "Lace" },
  { src: "/images/landing/look-5.jpg", label: "Denim" },
] as const;

function nextDifferentIndex(current: number, length: number) {
  if (length < 2) return 0;
  const offset = 1 + Math.floor(Math.random() * (length - 1));
  return (current + offset) % length;
}

function shuffledIndexes(excluded: number) {
  return looks
    .map((_, index) => index)
    .filter((index) => index !== excluded)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
}

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeLook, setActiveLook] = useState(2);
  const [panelIndexes, setPanelIndexes] = useState([0, 1, 4]);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length);
      setActiveLook((current) => {
        const next = nextDifferentIndex(current, looks.length);
        setPanelIndexes(shuffledIndexes(next));
        return next;
      });
      setCycle((current) => current + 1);
    }, ROTATION_MS);

    return () => window.clearInterval(timer);
  }, [paused]);

  const currentStep = steps[activeStep];
  const currentLook = useMemo(() => looks[activeLook], [activeLook]);

  const selectStep = (index: number) => {
    setActiveStep(index);
    setCycle((current) => current + 1);
  };

  const selectLook = (index: number) => {
    setActiveLook(index);
    setPanelIndexes(shuffledIndexes(index));
    setCycle((current) => current + 1);
  };

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
          <p className={styles.kicker} id="how-it-works-title">CÓMO FUNCIONA</p>

          <div className={styles.steps} role="tablist" aria-label="Pasos del proceso Try-On">
            <div className={styles.connector} aria-hidden="true">
              <span style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }} />
              {!paused && <i key={cycle} className={styles.timelineRunner} />}
            </div>

            {steps.map((step, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeStep === index}
                aria-controls="how-it-works-visual"
                className={`${styles.step} ${activeStep === index ? styles.stepActive : ""}`}
                key={step.title}
                onClick={() => selectStep(index)}
              >
                <span className={styles.iconRing} aria-hidden="true"><span>{step.icon}</span></span>
                <span className={styles.stepTitle}><b>{step.number}</b> {step.title}</span>
                <span className={styles.stepDetail}>{step.detail}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.quoteColumn} aria-live="polite">
          <blockquote>“El futuro de la moda está <em>aquí.</em>”</blockquote>
          <p>Pruébalo tú mismo.</p>
          <span className={styles.quoteLine} />
          <div className={styles.liveSignal}><i aria-hidden="true" />{currentStep.signal}</div>
        </div>

        <div className={styles.stage} id="how-it-works-visual" role="tabpanel" tabIndex={0}>
          <div className={styles.ceilingRing} aria-hidden="true"><span /><span /><span /></div>
          <div className={styles.floorRing} aria-hidden="true"><span /><span /><span /></div>
          <div className={styles.lightBeam} aria-hidden="true" />
          <div className={styles.scanLine} aria-hidden="true" />
          <div className={styles.dataParticles} aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ "--particle": index } as React.CSSProperties} />)}</div>

          <div className={styles.modelCard} key={currentLook.src}>
            <Image
              src={currentLook.src}
              alt={`Modelo adulta con el estilo ${currentLook.label} en una demostración SFW de virtual try-on`}
              fill
              sizes="(max-width: 780px) 78vw, 360px"
            />
            <div className={styles.modelShade} aria-hidden="true" />
            <div className={styles.modelHologram} aria-hidden="true" />
          </div>

          <div className={styles.hologramPanels} aria-label="Looks holográficos de demostración">
            {panelIndexes.map((lookIndex, panelIndex) => {
              const look = looks[lookIndex];
              return (
                <button
                  type="button"
                  className={styles.hologramPanel}
                  data-position={panelIndex}
                  key={`${cycle}-${look.label}-${panelIndex}`}
                  onClick={() => selectLook(lookIndex)}
                  aria-label={`Cambiar al estilo ${look.label}`}
                >
                  <Image src={look.src} alt="" fill sizes="110px" />
                  <span>{look.label}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.lookDots} aria-label="Selecciona una variante">
            {looks.map((look, index) => (
              <button
                type="button"
                className={activeLook === index ? styles.lookDotActive : ""}
                key={look.label}
                onClick={() => selectLook(index)}
                aria-label={`Seleccionar estilo ${look.label}`}
                aria-pressed={activeLook === index}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.ctaPanel}>
        <ul aria-label="Beneficios principales">
          <li>Resultados ultrarrealistas</li><li>Cualquier tipo de cuerpo</li><li>Cualquier outfit</li>
          <li>Privacidad primero</li><li>Rápido y sencillo</li><li>Mejora continua</li>
        </ul>
        <div className={styles.ctaCopy}><h3>¿Listo para ver la magia?</h3><p>Descubre los planes disponibles y prepara tu primera experiencia.</p></div>
        <a className={styles.ctaButton} href="#pricing">Comenzar ahora <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}
