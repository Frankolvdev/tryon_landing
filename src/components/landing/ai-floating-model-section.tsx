"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./ai-floating-model-section.module.css";

const modes = [
  { id: "body", label: "Body mapping", value: "Pose + silhouette" },
  { id: "fabric", label: "Fabric response", value: "Drape + texture" },
  { id: "light", label: "Light matching", value: "Scene aware" },
] as const;

const garments = [
  { src: "/images/landing/look-1.jpg", label: "Noir set" },
  { src: "/images/landing/look-2.jpg", label: "Ivory dress" },
  { src: "/images/landing/look-4.jpg", label: "Lace look" },
];

export function AiFloatingModelSection() {
  const [activeMode, setActiveMode] = useState<(typeof modes)[number]["id"]>("body");
  const [activeGarment, setActiveGarment] = useState(1);

  const currentMode = useMemo(
    () => modes.find((mode) => mode.id === activeMode) ?? modes[0],
    [activeMode],
  );

  return (
    <section className={styles.section} id="ai-engine" aria-labelledby="ai-engine-title">
      <div className={styles.backgroundGrid} aria-hidden="true" />
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>AI ENGINE SHOWCASE</span>
          <h2 id="ai-engine-title">
            La IA que entiende <em>cómo debe caer cada prenda.</em>
          </h2>
          <p>
            Un sistema visual que analiza pose, proporciones, iluminación y comportamiento del tejido para construir una vista previa coherente antes de generar el resultado final.
          </p>

          <div className={styles.modeList} role="tablist" aria-label="Capacidades del motor visual">
            {modes.map((mode) => (
              <button
                className={mode.id === activeMode ? styles.modeActive : styles.mode}
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                role="tab"
                aria-selected={mode.id === activeMode}
                type="button"
              >
                <span>{mode.label}</span>
                <small>{mode.value}</small>
              </button>
            ))}
          </div>

          <div className={styles.liveStatus} aria-live="polite">
            <span className={styles.statusDot} />
            <div>
              <strong>{currentMode.label}</strong>
              <span>{currentMode.value}</span>
            </div>
          </div>
        </div>

        <div className={styles.stage}>
          <div className={styles.halo} aria-hidden="true" />
          <div className={styles.orbitOne} aria-hidden="true" />
          <div className={styles.orbitTwo} aria-hidden="true" />
          <div className={styles.scanLine} aria-hidden="true" />
          <div className={styles.modelFrame}>
            <Image
              src="/images/landing/look-3.jpg"
              alt="Modelo adulta usando un vestido rojo en una demostración visual SFW de virtual try-on"
              fill
              sizes="(max-width: 800px) 82vw, 430px"
              priority={false}
            />
            <div className={styles.modelOverlay} aria-hidden="true" />
            <span className={`${styles.trackingPoint} ${styles.pointHead}`} />
            <span className={`${styles.trackingPoint} ${styles.pointShoulder}`} />
            <span className={`${styles.trackingPoint} ${styles.pointWaist}`} />
            <span className={`${styles.trackingPoint} ${styles.pointHip}`} />
          </div>

          <div className={styles.metricCard}>
            <span>Visual analysis</span>
            <strong>4 layers active</strong>
            <small>Pose · shape · fabric · light</small>
          </div>

          <div className={styles.garmentRail} aria-label="Looks de demostración">
            {garments.map((garment, index) => (
              <button
                type="button"
                key={garment.label}
                onClick={() => setActiveGarment(index)}
                className={index === activeGarment ? styles.garmentActive : styles.garment}
                aria-pressed={index === activeGarment}
                aria-label={`Seleccionar ${garment.label}`}
              >
                <Image src={garment.src} alt="" fill sizes="72px" />
                <span>{garment.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
