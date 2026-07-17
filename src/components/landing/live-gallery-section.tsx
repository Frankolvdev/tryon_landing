"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styles from "./live-gallery-section.module.css";

type Category = "Todos" | "Casual" | "Formal" | "Streetwear" | "Active";

type GalleryItem = {
  id: number;
  title: string;
  category: Exclude<Category, "Todos">;
  image: string;
  accent: string;
};

const galleryItems: GalleryItem[] = [
  { id: 1, title: "Minimal Noir", category: "Formal", image: "/images/landing/look-1.jpg", accent: "Look editorial" },
  { id: 2, title: "Urban Motion", category: "Streetwear", image: "/images/landing/look-2.jpg", accent: "Street ready" },
  { id: 3, title: "Soft Tailoring", category: "Casual", image: "/images/landing/look-3.jpg", accent: "Daily style" },
  { id: 4, title: "Velocity Set", category: "Active", image: "/images/landing/look-4.jpg", accent: "Active fit" },
  { id: 5, title: "Night Structure", category: "Formal", image: "/images/landing/look-5.jpg", accent: "Premium finish" },
  { id: 6, title: "Modern Layers", category: "Casual", image: "/images/landing/widget-after.jpg", accent: "Layered look" },
];

const categories: Category[] = ["Todos", "Casual", "Formal", "Streetwear", "Active"];

const benefits = [
  { icon: "✦", title: "Resultado realista", text: "La experiencia está diseñada para conservar proporciones, pose y presencia visual." },
  { icon: "⌁", title: "Flujo rápido", text: "Sube, selecciona y compara sin perderte en configuraciones innecesarias." },
  { icon: "◎", title: "Responsive real", text: "La galería, filtros y visor funcionan con mouse, teclado y pantallas táctiles." },
  { icon: "◇", title: "Privacidad primero", text: "La arquitectura queda preparada para comunicar claramente el tratamiento de imágenes." },
];

const useCases = [
  { number: "01", title: "Compra personal", text: "Visualiza nuevas combinaciones antes de decidir qué estilo probar." },
  { number: "02", title: "Creadores", text: "Explora propuestas visuales para contenido, campañas y sesiones creativas." },
  { number: "03", title: "Marcas de moda", text: "Presenta prendas de forma más inmersiva dentro de una experiencia digital." },
];

export function LiveGallerySection() {
  const [category, setCategory] = useState<Category>("Todos");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(
    () => galleryItems.filter((item) => category === "Todos" || item.category === category),
    [category],
  );

  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <section className={styles.section} id="gallery" aria-labelledby="gallery-title">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>INSPIRACIÓN EN MOVIMIENTO</p>
          <h2 id="gallery-title">Looks que se sienten <em>reales</em>.</h2>
        </div>
        <p className={styles.intro}>
          Explora una muestra interactiva de estilos SFW. Usa los filtros y abre cualquier resultado para verlo con más detalle.
        </p>
      </div>

      <div className={styles.filters} role="toolbar" aria-label="Filtrar galería por categoría">
        {categories.map((item) => (
          <button
            className={category === item ? styles.filterActive : styles.filter}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
            aria-pressed={category === item}
          >
            {item}
          </button>
        ))}
      </div>

      <div className={styles.gallery} aria-live="polite">
        {filteredItems.map((item, index) => (
          <button
            className={styles.card}
            key={item.id}
            onClick={() => setSelected(item)}
            type="button"
            style={{ "--delay": `${index * 45}ms` } as React.CSSProperties}
            aria-label={`Abrir ${item.title}`}
          >
            <Image src={item.image} alt="" fill sizes="(max-width: 760px) 88vw, (max-width: 1100px) 45vw, 30vw" />
            <span className={styles.cardShade} />
            <span className={styles.cardCopy}>
              <small>{item.accent}</small>
              <strong>{item.title}</strong>
              <span>{item.category} · Ver resultado ↗</span>
            </span>
          </button>
        ))}
      </div>

      <div className={styles.benefits} aria-label="Beneficios principales">
        {benefits.map((benefit) => (
          <article key={benefit.title}>
            <span aria-hidden="true">{benefit.icon}</span>
            <div>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.useCases} id="use-cases">
        <div className={styles.useCasesCopy}>
          <p className={styles.kicker}>UNA EXPERIENCIA, DISTINTAS FORMAS DE USARLA</p>
          <h2>Hecho para descubrir, presentar y decidir mejor.</h2>
          <p>
            Esta sección comunica casos de uso sin afirmar integraciones empresariales que todavía no existen en el backend.
          </p>
        </div>
        <div className={styles.useCaseGrid}>
          {useCases.map((useCase) => (
            <article key={useCase.number}>
              <span>{useCase.number}</span>
              <h3>{useCase.title}</h3>
              <p>{useCase.text}</p>
              <a href="#register">Explorar posibilidad <b>→</b></a>
            </article>
          ))}
        </div>
      </div>

      {selected ? (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setSelected(null)}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={() => setSelected(null)} type="button" aria-label="Cerrar visor">×</button>
            <div className={styles.modalImage}>
              <Image src={selected.image} alt={`Vista ampliada de ${selected.title}`} fill sizes="90vw" priority />
            </div>
            <div className={styles.modalCopy}>
              <small>{selected.category}</small>
              <h3 id="gallery-modal-title">{selected.title}</h3>
              <p>Vista demostrativa SFW de la experiencia visual de TryOn.</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
