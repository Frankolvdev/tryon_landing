"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./tryon-widget.module.css";

const looks = [
  { file: "after-red.jpg", label: "Vestido rojo" },
  { file: "look-1.jpg", label: "Look negro" },
  { file: "look-2.jpg", label: "Look blanco" },
  { file: "look-3.jpg", label: "Look editorial" },
  { file: "look-4.jpg", label: "Look nocturno" },
  { file: "look-5.jpg", label: "Look casual" },
];

const AUTO_STEPS = [8, 92, 22, 78, 50];

export function TryOnWidget() {
  const sliderId = useId();
  const [split, setSplit] = useState(50);
  const [selected, setSelected] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [burst, setBurst] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepRef = useRef(0);

  function stopPreview() {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    stepRef.current = 0;
    setIsPlaying(false);
  }

  function scheduleStep() {
    const next = AUTO_STEPS[stepRef.current % AUTO_STEPS.length];
    stepRef.current += 1;
    setSplit(next);
    setBurst((value) => value + 1);

    timerRef.current = setTimeout(() => {
      if (stepRef.current >= AUTO_STEPS.length) {
        timerRef.current = null;
        stepRef.current = 0;
        setIsPlaying(false);
        return;
      }
      scheduleStep();
    }, 1180);
  }

  function togglePreview() {
    if (isPlaying) {
      stopPreview();
      return;
    }

    setIsPlaying(true);
    stepRef.current = 0;
    scheduleStep();
  }

  useEffect(() => stopPreview, []);

  function selectLook(index: number) {
    stopPreview();
    setSelected(index);
    setSplit(50);
    setBurst((value) => value + 1);
  }

  return (
    <section
      className={`${styles.card} ${isPlaying ? styles.isPlaying : ""}`}
      aria-label="Demostración interactiva del antes y después"
    >
      <header>
        <strong>
          Vista comparativa <em>AI</em>
        </strong>
        <span>
          <i /> Demostración
        </span>
      </header>

      <div
        className={styles.stage}
        style={{ "--split": `${split}%` } as React.CSSProperties}
      >
        <div className={styles.ambient} aria-hidden="true" />
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.scanline} aria-hidden="true" />
        <div className={styles.energyArc} aria-hidden="true" />

        <div className={styles.imageCanvas}>
          <Image
            src="/images/landing/hero/before.jpg"
            alt="Modelo antes del cambio virtual de vestuario"
            fill
            priority
            sizes="(max-width: 600px) 92vw, 460px"
          />
        </div>

        <div className={styles.reveal} aria-hidden="true">
          <div
            key={`after-${selected}-${burst}`}
            className={`${styles.imageCanvas} ${styles.afterCanvas} ${isDragging ? styles.isDragging : ""}`}
          >
            <Image
              src={`/images/landing/hero/${looks[selected].file}`}
              alt=""
              fill
              sizes="(max-width: 600px) 92vw, 460px"
            />
          </div>
          <div className={styles.revealTint} />
        </div>

        <div key={`field-${burst}`} className={styles.transitionField} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div key={`burst-${burst}`} className={styles.changeBurst} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <b className={styles.before}>Antes</b>
        <b className={styles.after}>Después</b>
        <span className={styles.divider} aria-hidden="true">
          <span className={styles.dividerGlow} />
          <i>
            <span>‹</span>
            <span>›</span>
          </i>
        </span>

        <div className={styles.hud} aria-hidden="true">
          <span>BODY MAP</span>
          <span>FABRIC MATCH</span>
          <span>REALTIME</span>
        </div>

        <label className={styles.sr} htmlFor={sliderId}>
          Deslizar para comparar el antes y el después
        </label>
        <input
          id={sliderId}
          type="range"
          min="5"
          max="95"
          value={split}
          onPointerDown={() => {
            stopPreview();
            setIsDragging(true);
          }}
          onPointerUp={() => {
            setIsDragging(false);
            setBurst((value) => value + 1);
          }}
          onPointerCancel={() => setIsDragging(false)}
          onKeyUp={() => setBurst((value) => value + 1)}
          onChange={(event) => {
            stopPreview();
            setSplit(Number(event.target.value));
          }}
        />
      </div>

      <div className={styles.rail} role="list" aria-label="Ejemplos de vestuario">
        {looks.map((look, index) => (
          <button
            key={look.file}
            type="button"
            onClick={() => selectLook(index)}
            className={selected === index ? styles.active : ""}
            aria-label={`Mostrar ${look.label}`}
            aria-pressed={selected === index}
          >
            <Image
              src={`/images/landing/hero/${look.file}`}
              alt=""
              fill
              sizes="68px"
            />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.previewButton} onClick={togglePreview}>
          <span className={styles.buttonPulse} aria-hidden="true" />
          {isPlaying ? "Pausar transformación" : "Ver el cambio"}
          <b>{isPlaying ? "Ⅱ" : "▶"}</b>
        </button>
        <a className={styles.learnButton} href="#como-funciona">
          Cómo funciona <b>↗</b>
        </a>
      </div>
    </section>
  );
}
