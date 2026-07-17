"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Sube tu foto",
    description: "Carga una imagen clara desde tu dispositivo. La interfaz queda preparada para conectar el flujo real de carga del backend.",
    icon: "↑",
    detail: "JPG, PNG o WEBP",
  },
  {
    number: "02",
    title: "Elige tu look",
    description: "Explora prendas y estilos disponibles, selecciona tu favorito y ajusta la experiencia antes de procesar.",
    icon: "◇",
    detail: "Prendas y estilos",
  },
  {
    number: "03",
    title: "Procesa con IA",
    description: "El motor de Try-On analiza pose, proporciones y prenda para preparar un resultado visual coherente.",
    icon: "✦",
    detail: "Flujo automatizado",
  },
  {
    number: "04",
    title: "Guarda el resultado",
    description: "Compara el antes y el después, revisa el resultado final y continúa hacia la experiencia completa.",
    icon: "✓",
    detail: "Vista comparativa",
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.22 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`howItWorksSection${isVisible ? " isVisible" : ""}`}
      id="how-it-works"
      aria-labelledby="how-it-works-title"
    >
      <div className="howItWorksBackdrop" aria-hidden="true">
        <span className="workflowGlow workflowGlowOne" />
        <span className="workflowGlow workflowGlowTwo" />
        <span className="workflowLines" />
      </div>

      <div className="workflowHeader">
        <div>
          <p className="sectionKicker">CÓMO FUNCIONA</p>
          <h2 id="how-it-works-title">
            De tu foto a un nuevo look en <em>cuatro pasos.</em>
          </h2>
        </div>
        <p>
          Una experiencia directa, clara y preparada para conectarse con el flujo real de Try-On del backend cuando implementemos su módulo público.
        </p>
      </div>

      <div className="workflowLayout">
        <div className="workflowSteps" role="tablist" aria-label="Pasos del proceso Try-On">
          {steps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              role="tab"
              aria-selected={activeStep === index}
              aria-controls={`workflow-panel-${index}`}
              id={`workflow-tab-${index}`}
              className={`workflowStep${activeStep === index ? " isActive" : ""}`}
              onClick={() => setActiveStep(index)}
            >
              <span className="workflowStepNumber">{step.number}</span>
              <span className="workflowStepIcon" aria-hidden="true">{step.icon}</span>
              <span className="workflowStepText">
                <strong>{step.title}</strong>
                <small>{step.detail}</small>
              </span>
            </button>
          ))}
        </div>

        <div
          className="workflowPreview"
          role="tabpanel"
          id={`workflow-panel-${activeStep}`}
          aria-labelledby={`workflow-tab-${activeStep}`}
          tabIndex={0}
        >
          <div className="workflowPreviewChrome">
            <span />
            <span />
            <span />
            <small>TRYON WORKFLOW</small>
          </div>

          <div className="workflowPreviewBody">
            <div className="workflowVisual" aria-hidden="true">
              <span className="workflowVisualHalo" />
              <span className="workflowVisualRing workflowVisualRingOne" />
              <span className="workflowVisualRing workflowVisualRingTwo" />
              <span className="workflowVisualCore">{steps[activeStep].icon}</span>
              <span className="workflowVisualScan" />
            </div>

            <div className="workflowPreviewCopy">
              <span>PASO {steps[activeStep].number}</span>
              <h3>{steps[activeStep].title}</h3>
              <p>{steps[activeStep].description}</p>
              <div className="workflowStatus">
                <i aria-hidden="true" />
                Interfaz preparada para integración real
              </div>
            </div>
          </div>

          <div className="workflowProgress" aria-hidden="true">
            {steps.map((step, index) => (
              <span key={step.number} className={index <= activeStep ? "isComplete" : ""} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
