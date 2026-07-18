"use client";

import { useState } from "react";
import styles from "./faq-section.module.css";

type FaqItem = {
  question: string;
  answer: string;
  eyebrow: string;
};

const faqs: FaqItem[] = [
  {
    eyebrow: "RESULTADOS",
    question: "¿Qué tipo de fotografías funcionan mejor?",
    answer:
      "Las fotografías nítidas, bien iluminadas y con el cuerpo visible producen la experiencia más consistente. La plataforma está diseñada para admitir distintas poses y tipos de cuerpo, pero una imagen frontal clara facilita el análisis visual.",
  },
  {
    eyebrow: "PRIVACIDAD",
    question: "¿Mis imágenes se mantienen privadas?",
    answer:
      "La landing no procesa archivos por sí sola. El flujo real de carga y generación se conectará exclusivamente a los endpoints de tu plataforma, respetando autenticación, permisos, almacenamiento y políticas configuradas en el backend.",
  },
  {
    eyebrow: "PLANES",
    question: "¿Los precios mostrados están actualizados?",
    answer:
      "Sí. La sección de precios consulta los planes públicos y activos del backend. Los cambios de precio, moneda, tokens, beneficios, límites y disponibilidad realizados desde el BackOffice se reflejan en la landing.",
  },
  {
    eyebrow: "DISPOSITIVOS",
    question: "¿Funciona en teléfonos y tabletas?",
    answer:
      "Sí. Toda la experiencia se construye con diseño responsive, controles táctiles, navegación por teclado y estados accesibles para escritorio, tabletas y teléfonos.",
  },
  {
    eyebrow: "CUENTA",
    question: "¿Necesito una cuenta para probar el servicio?",
    answer:
      "La exploración de la landing es pública. Para ejecutar generaciones reales, administrar tokens, historial y suscripciones, el usuario deberá iniciar sesión o registrarse mediante el flujo conectado al backend.",
  },
  {
    eyebrow: "TECNOLOGÍA",
    question: "¿La demostración visual ya genera resultados reales?",
    answer:
      "Los widgets de la landing explican la experiencia de forma interactiva. No simulan llamadas de generación. El procesamiento real se habilitará únicamente mediante los endpoints existentes del backend y el frontend de la aplicación SaaS.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-title">
      <div className={styles.glow} aria-hidden="true" />
      <span className={styles.lightSweep} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.headingBlock}>
          <span className={styles.kicker}>PREGUNTAS FRECUENTES</span>
          <h2 id="faq-title">
            Todo claro antes de <em>probar tu próximo look.</em>
          </h2>
          <p>
            Respuestas directas sobre fotografías, privacidad, planes y el funcionamiento real de la plataforma.
          </p>
          <div className={styles.supportCard}>
            <span className={styles.supportIcon} aria-hidden="true">?</span>
            <div>
              <strong>¿Necesitas más información?</strong>
              <p>El centro de ayuda y el contacto comercial se conectarán en sus módulos correspondientes.</p>
            </div>
          </div>
        </div>

        <div className={styles.list}>
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <article className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`} key={item.question}>
                <button
                  id={buttonId}
                  className={styles.trigger}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.questionWrap}>
                    <small>{item.eyebrow}</small>
                    <strong>{item.question}</strong>
                  </span>
                  <span className={styles.toggle} aria-hidden="true">
                    <i />
                    <i />
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={styles.answerGrid}
                >
                  <div className={styles.answerInner}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
