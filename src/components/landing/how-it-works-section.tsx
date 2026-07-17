"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./how-it-works-section.module.css";

const STEP_DURATION_MS = 2000;

const steps = [
  {
    number: "1",
    title: "Sube",
    detail: "Carga tu foto de forma segura",
    icon: "upload",
    signal: "Foto cargada",
    lookIndex: 4,
  },
  {
    number: "2",
    title: "Elige",
    detail: "Selecciona el outfit que prefieras",
    icon: "hanger",
    signal: "Outfit seleccionado",
    lookIndex: 0,
  },
  {
    number: "3",
    title: "IA procesa",
    detail: "La IA adapta pose, luz y tejido",
    icon: "ai",
    signal: "Procesamiento de IA",
    lookIndex: 2,
  },
  {
    number: "4",
    title: "Disfruta",
    detail: "Compara, guarda o comparte tu look",
    icon: "heart",
    signal: "Resultado preparado",
    lookIndex: 4,
  },
] as const;

const looks = [
  { src: "/images/landing/look-1.jpg", label: "Look negro" },
  { src: "/images/landing/look-2.jpg", label: "Look claro" },
  { src: "/images/landing/look-3.jpg", label: "Vestido rojo" },
  { src: "/images/landing/look-4.jpg", label: "Look editorial" },
  { src: "/images/landing/look-5.jpg", label: "Look denim" },
] as const;

function StepIcon({ type }: { type: (typeof steps)[number]["icon"] }) {
  if (type === "upload") {
    return <span className={styles.iconUpload} aria-hidden="true">↑</span>;
  }
  if (type === "hanger") {
    return <span className={styles.iconHanger} aria-hidden="true">⌁</span>;
  }
  if (type === "ai") {
    return <span className={styles.iconAi} aria-hidden="true">✦</span>;
  }
  return <span className={styles.iconHeart} aria-hidden="true">♡</span>;
}

function distinctPanels(activeIndex: number, seed: number) {
  const pool = looks.map((_, index) => index).filter((index) => index !== activeIndex);
  const rotated = pool.map((_, index) => pool[(index + seed) % pool.length]);
  return rotated.slice(0, 3);
}

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);

  const activeLookIndex = steps[activeStep].lookIndex;
  const activeLook = looks[activeLookIndex];
  const panelIndexes = useMemo(
    () => distinctPanels(activeLookIndex, cycle % 4),
    [activeLookIndex, cycle],
  );

  const advance = useCallback(() => {
    setActiveStep((current) => (current + 1) % steps.length);
    setCycle((current) => current + 1);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(advance, STEP_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [advance, paused]);

  useEffect(() => () => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
  }, []);

  const chooseStep = (index: number) => {
    setActiveStep(index);
    setCycle((current) => current + 1);
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), STEP_DURATION_MS);
  };

  const currentStep = steps[activeStep];

  return (
    <section id="como-funciona" className={styles.section} aria-labelledby="how-title">
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.topGrid}>
        <div className={styles.processArea}>
          <p className={styles.eyebrow} id="how-title">CÓMO FUNCIONA</p>

          <div className={styles.timeline} role="tablist" aria-label="Pasos del proceso Try-On">
            <div className={styles.timelineRail} aria-hidden="true">
              <span
                className={styles.timelineFill}
                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              />
              <span
                className={styles.timelinePulse}
                style={{ left: `${(activeStep / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                role="tab"
                aria-selected={activeStep === index}
                className={`${styles.step} ${activeStep === index ? styles.stepActive : ""}`}
                onClick={() => chooseStep(index)}
              >
                <span className={styles.stepCircle}>
                  <span className={styles.stepOrbit} aria-hidden="true" />
                  <StepIcon type={step.icon} />
                </span>
                <span className={styles.stepTitleRow}>
                  <strong>{step.number}</strong>
                  <b>{step.title}</b>
                </span>
                <span className={styles.stepDetail}>{step.detail}</span>
                {activeStep === index && (
                  <span className={styles.stepTimer} aria-hidden="true" key={`timer-${cycle}-${index}`} />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.quoteBlock}>
          <blockquote>
            “El futuro de<br />la moda está <em>aquí.</em>”
          </blockquote>
          <p>Pruébalo tú mismo.</p>
          <span className={styles.quoteLine} aria-hidden="true" />
          <span className={styles.liveSignal}>{currentStep.signal}</span>
        </div>

        <div
          className={styles.hologramStage}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className={styles.ceilingRing} aria-hidden="true">
            <span /><span /><span />
          </div>
          <div className={styles.lightBeam} aria-hidden="true" />
          <div className={styles.scanLine} aria-hidden="true" key={`scan-${cycle}`} />

          <div className={styles.modelWrap} key={`model-${activeStep}-${cycle}`}>
            <Image
              src={activeLook.src}
              alt={`Modelo adulta con ${activeLook.label}, demostración SFW`}
              fill
              priority={false}
              sizes="(max-width: 760px) 72vw, 360px"
              className={styles.modelImage}
            />
            <div className={styles.modelHologram} aria-hidden="true" />
          </div>

          {panelIndexes.map((lookIndex, index) => {
            const look = looks[lookIndex];
            return (
              <button
                key={`${cycle}-${lookIndex}-${index}`}
                type="button"
                className={`${styles.holoCard} ${styles[`holoCard${index + 1}`]}`}
                onClick={() => chooseStep((activeStep + index + 1) % steps.length)}
                aria-label={`Vista holográfica: ${look.label}`}
              >
                <Image src={look.src} alt="" fill sizes="100px" className={styles.holoImage} />
                <span aria-hidden="true" />
              </button>
            );
          })}

          <div className={styles.dataParticles} aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => <i key={index} />)}
          </div>

          <div className={styles.floorRings} aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <div className={styles.stageReflection} aria-hidden="true" />

          <div className={styles.stepDots} aria-label="Paso actual">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                aria-label={`Ir al paso ${step.number}: ${step.title}`}
                aria-pressed={activeStep === index}
                className={activeStep === index ? styles.dotActive : ""}
                onClick={() => chooseStep(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.ctaBar}>
        <ul className={styles.benefits}>
          <li>Resultados ultrarrealistas</li>
          <li>Cualquier tipo de cuerpo</li>
          <li>Cualquier outfit</li>
          <li>Privacidad primero</li>
          <li>Rápido y sencillo</li>
          <li>Mejora continua</li>
        </ul>
        <div className={styles.ctaCopy}>
          <h2>¿Listo para ver la magia?</h2>
          <p>Descubre los planes disponibles y prepara tu primera experiencia.</p>
        </div>
        <a href="#precios" className={styles.ctaButton}>Comenzar ahora <span>→</span></a>
      </div>
    </section>
  );
}
