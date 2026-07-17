"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";

type Look = {
  file: string;
  label: string;
  tone: string;
};

const looks: Look[] = [
  { file: "look-1.jpg", label: "Negro clásico", tone: "#111827" },
  { file: "look-2.jpg", label: "Blanco editorial", tone: "#f4f4f5" },
  { file: "look-3.jpg", label: "Rojo intenso", tone: "#ef123f" },
  { file: "look-4.jpg", label: "Encaje negro", tone: "#24141d" },
  { file: "look-5.jpg", label: "Denim casual", tone: "#315b88" },
];

export function TryOnWidget() {
  const sliderId = useId();
  const intensityId = useId();
  const [selected, setSelected] = useState(2);
  const [split, setSplit] = useState(52);
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [intensity, setIntensity] = useState(86);

  const activeLook = useMemo(() => looks[selected], [selected]);

  return (
    <section className="tryonWidget" aria-label="Demostración interactiva del probador virtual">
      <div className="widgetTop">
        <strong>
          Live Try-On <em>AI</em>
        </strong>
        <span>
          <i /> Vista interactiva
        </span>
      </div>

      <div className="comparisonStage" style={{ "--split": `${split}%` } as React.CSSProperties}>
        <Image
          className="comparisonBase"
          src="/images/landing/widget-before.jpg"
          alt="Vista de la modelo antes del cambio de vestuario"
          fill
          priority
          sizes="(max-width: 760px) 90vw, 360px"
        />
        <div className="comparisonReveal" aria-hidden="true">
          <Image
            src={`/images/landing/${activeLook.file}`}
            alt=""
            fill
            sizes="(max-width: 760px) 90vw, 360px"
          />
        </div>
        <span className="comparisonLabel comparisonLabelBefore">Antes</span>
        <span className="comparisonLabel comparisonLabelAfter">Después</span>
        <span className="comparisonDivider" aria-hidden="true">
          <b>↔</b>
        </span>
        <label className="srOnly" htmlFor={sliderId}>
          Comparar imagen antes y después
        </label>
        <input
          id={sliderId}
          className="comparisonRange"
          type="range"
          min="8"
          max="92"
          value={split}
          onChange={(event) => setSplit(Number(event.target.value))}
          aria-valuetext={`${split}% de la vista posterior visible`}
        />
      </div>

      <div className="selectedLookMeta" aria-live="polite">
        <span className="lookSwatch" style={{ background: activeLook.tone }} />
        <div>
          <small>Estilo seleccionado</small>
          <strong>{activeLook.label}</strong>
        </div>
        <span className="dragHint">Desliza para comparar</span>
      </div>

      <div className="lookRail" role="list" aria-label="Seleccionar un estilo para la demostración">
        {looks.map((item, index) => (
          <button
            key={item.file}
            className={selected === index ? "selected" : ""}
            onClick={() => setSelected(index)}
            aria-label={`Seleccionar ${item.label}`}
            aria-pressed={selected === index}
          >
            <Image src={`/images/landing/${item.file}`} alt="" fill sizes="52px" />
          </button>
        ))}
      </div>

      {showAdjustments && (
        <div className="widgetAdjustments">
          <div>
            <label htmlFor={intensityId}>Intensidad visual</label>
            <output htmlFor={intensityId}>{intensity}%</output>
          </div>
          <input
            id={intensityId}
            type="range"
            min="50"
            max="100"
            value={intensity}
            onChange={(event) => setIntensity(Number(event.target.value))}
          />
          <p>Este control modifica únicamente la demostración visual de la landing.</p>
        </div>
      )}

      <div className="widgetActions">
        <a className="generateButton" href="#register">
          Probar con mi foto <span>✦</span>
        </a>
        <button
          className="adjustButton"
          type="button"
          onClick={() => setShowAdjustments((current) => !current)}
          aria-expanded={showAdjustments}
        >
          Ajustar <span>{showAdjustments ? "×" : "☷"}</span>
        </button>
      </div>
    </section>
  );
}
