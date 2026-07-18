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

export function TryOnWidget() {
  const sliderId = useId();
  const [split, setSplit] = useState(50);
  const [selected, setSelected] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function togglePreview() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    setSplit(14);
    let showAfter = false;
    timerRef.current = setInterval(() => {
      showAfter = !showAfter;
      setSplit(showAfter ? 86 : 14);
    }, 1250);
  }

  return (
    <section className={styles.card} aria-label="Demostración interactiva del antes y después">
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
          <div className={styles.imageCanvas}>
            <Image
              src={`/images/landing/hero/${looks[selected].file}`}
              alt=""
              fill
              sizes="(max-width: 600px) 92vw, 460px"
            />
          </div>
        </div>

        <b className={styles.before}>Antes</b>
        <b className={styles.after}>Después</b>
        <span className={styles.divider} aria-hidden="true">
          <i>↔</i>
        </span>

        <label className={styles.sr} htmlFor={sliderId}>
          Deslizar para comparar el antes y el después
        </label>
        <input
          id={sliderId}
          type="range"
          min="5"
          max="95"
          value={split}
          onChange={(event) => {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
              setIsPlaying(false);
            }
            setSplit(Number(event.target.value));
          }}
        />
      </div>

      <div className={styles.rail} role="list" aria-label="Ejemplos de vestuario">
        {looks.map((look, index) => (
          <button
            key={look.file}
            type="button"
            onClick={() => setSelected(index)}
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
          </button>
        ))}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.previewButton} onClick={togglePreview}>
          {isPlaying ? "Pausar comparación" : "Ver transformación"}
          <b>{isPlaying ? "Ⅱ" : "▶"}</b>
        </button>
        <a className={styles.learnButton} href="#como-funciona">
          Cómo funciona <b>↗</b>
        </a>
      </div>
    </section>
  );
}
