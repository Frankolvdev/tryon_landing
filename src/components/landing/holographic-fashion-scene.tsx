"use client";

import styles from "./infinite-fashion-flow.module.css";

type FlowItem = {
  image: string;
  title: string;
  meta: string;
  accent: string;
};

const looks: FlowItem[] = [
  { image: "/images/landing/trust/scene/dress.webp", title: "Vestido", meta: "AI FIT", accent: "01" },
  { image: "/images/landing/trust/scene/jacket.webp", title: "Chaqueta", meta: "TEXTURE", accent: "02" },
  { image: "/images/landing/trust/scene/shorts.webp", title: "Shorts", meta: "BODY MAP", accent: "03" },
  { image: "/images/landing/trust/scene/heels.webp", title: "Calzado", meta: "STYLE", accent: "04" },
];

const lanes = [
  [...looks, ...looks],
  [...looks.slice(2), ...looks.slice(0, 2), ...looks.slice(2), ...looks.slice(0, 2)],
  [...looks.slice(1), looks[0], ...looks.slice(1), looks[0]],
];

export function HolographicFashionScene() {
  return (
    <div className={styles.flow} aria-label="Flujo animado de prendas procesadas por inteligencia artificial">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.scan} aria-hidden="true" />

      <div className={styles.stage}>
        {lanes.map((lane, laneIndex) => (
          <div
            className={`${styles.lane} ${styles[`lane${laneIndex + 1}`]}`}
            key={laneIndex}
            aria-hidden={laneIndex !== 1}
          >
            <div className={styles.track}>
              {lane.map((item, itemIndex) => (
                <article className={styles.card} key={`${laneIndex}-${itemIndex}`}>
                  <div className={styles.imageShell}>
                    <img src={item.image} alt={laneIndex === 1 && itemIndex < 4 ? item.title : ""} />
                    <span className={styles.imageGlow} />
                    <span className={styles.corner}>{item.accent}</span>
                  </div>
                  <div className={styles.cardCopy}>
                    <span>{item.meta}</span>
                    <strong>{item.title}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.liveStatus} aria-hidden="true">
        <span />
        <b>AI WARDROBE STREAM</b>
        <i />
      </div>
    </div>
  );
}
