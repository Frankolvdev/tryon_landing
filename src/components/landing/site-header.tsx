"use client";

import { useState } from "react";

const links = [
  ["Características", "#features"],
  ["Cómo funciona", "#how-it-works"],
  ["Galería", "#gallery"],
  ["Precios", "#pricing"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="siteHeader">
      <a className="brand" href="#top" aria-label="TRYON inicio">
        <span>TRY</span><strong>ON</strong><small>AI VIRTUAL TRY-ON</small>
      </a>
      <nav className={open ? "mainNav isOpen" : "mainNav"} aria-label="Navegación principal">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <div className="headerActions">
        <a className="loginLink" href="#login">Iniciar sesión</a>
        <a className="primaryButton compact" href="#register">Comenzar <span>→</span></a>
      </div>
      <button className="menuButton" type="button" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(v => !v)}>
        <span/><span/><span/>
      </button>
    </header>
  );
}
