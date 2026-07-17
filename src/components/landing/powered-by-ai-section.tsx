"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

const looks = [
  { src: "/images/landing/look-1.jpg", label: "Editorial", description: "Composición de moda con acabado editorial." },
  { src: "/images/landing/look-2.jpg", label: "Minimal", description: "Estilo limpio para destacar corte y textura." },
  { src: "/images/landing/look-3.jpg", label: "Signature", description: "Una propuesta intensa y cinematográfica." },
  { src: "/images/landing/look-4.jpg", label: "Evening", description: "Presentación elegante para looks nocturnos." },
  { src: "/images/landing/look-5.jpg", label: "Casual", description: "Una visualización natural para uso cotidiano." },
] as const;

const capabilities = [
  ["Multiestilo", "Looks y prendas"],
  ["Responsive", "Cualquier pantalla"],
  ["Privacidad", "Flujo protegido"],
  ["Escalable", "Arquitectura SaaS"],
] as const;

export function PoweredByAiSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const selectLook = useCallback((index: number) => {
    setActiveIndex((index + looks.length) % looks.length);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectLook(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectLook(activeIndex + 1);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`poweredAiSection${isVisible ? " isVisible" : ""}`}
      id="features"
      aria-labelledby="powered-ai-title"
    >
      <div className="poweredAiBackdrop" aria-hidden="true">
        <span className="aiOrb aiOrbOne" />
        <span className="aiOrb aiOrbTwo" />
        <span className="aiGrid" />
      </div>

      <div className="poweredAiCopy">
        <p className="eyebrow">EXPERIENCIA DE NUEVA GENERACIÓN</p>
        <h2 id="powered-ai-title">
          Impulsado por IA.<br />Diseñado para <em>ti.</em>
        </h2>
        <p className="poweredAiLead">
          Explora distintos estilos en una experiencia visual creada para sentirse rápida,
          clara y premium desde cualquier dispositivo.
        </p>

        <div className="capabilityGrid" aria-label="Capacidades de la plataforma">
          {capabilities.map(([title, description]) => (
            <article key={title}>
              <span aria-hidden="true">✦</span>
              <div>
                <strong>{title}</strong>
                <small>{description}</small>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="showcaseColumn">
        <div
          className="aiLookCarousel"
          id="gallery"
          role="region"
          aria-label="Galería interactiva de estilos"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <button
            className="carouselArrow carouselArrowPrev"
            type="button"
            aria-label="Mostrar estilo anterior"
            onClick={() => selectLook(activeIndex - 1)}
          >
            ‹
          </button>

          <div className="aiLookTrack">
            {looks.map((look, index) => {
              const offset = index - activeIndex;
              const normalizedOffset =
                Math.abs(offset) > looks.length / 2
                  ? offset > 0
                    ? offset - looks.length
                    : offset + looks.length
                  : offset;
              const isActive = index === activeIndex;

              return (
                <button
                  key={look.src}
                  type="button"
                  className={`aiLookCard${isActive ? " isActive" : ""}`}
                  style={{ "--card-offset": normalizedOffset, "--card-distance": Math.abs(normalizedOffset) } as CSSProperties}
                  aria-label={`Ver estilo ${look.label}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => selectLook(index)}
                >
                  <Image
                    src={look.src}
                    alt={`Ejemplo visual del estilo ${look.label}`}
                    fill
                    sizes="(max-width: 760px) 76vw, (max-width: 1100px) 34vw, 18vw"
                    priority={isActive}
                  />
                  <span className="lookCardShade" />
                  <span className="lookCardLabel">
                    <small>LOOK {String(index + 1).padStart(2, "0")}</small>
                    <strong>{look.label}</strong>
                  </span>
                </button>
              );
            })}
          </div>

          <button
            className="carouselArrow carouselArrowNext"
            type="button"
            aria-label="Mostrar estilo siguiente"
            onClick={() => selectLook(activeIndex + 1)}
          >
            ›
          </button>
        </div>

        <div className="activeLookInfo" aria-live="polite">
          <div>
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <div>
              <strong>{looks[activeIndex].label}</strong>
              <p>{looks[activeIndex].description}</p>
            </div>
          </div>
          <div className="carouselDots" aria-label="Seleccionar estilo">
            {looks.map((look, index) => (
              <button
                key={look.label}
                type="button"
                className={index === activeIndex ? "isActive" : ""}
                aria-label={`Ir al estilo ${look.label}`}
                aria-pressed={index === activeIndex}
                onClick={() => selectLook(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
