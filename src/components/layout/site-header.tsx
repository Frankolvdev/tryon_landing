"use client";

import { useEffect, useState } from "react";
import { Brand } from "@/components/layout/brand";
import { Container } from "@/components/layout/container";

const navigation = [
  { href: "/#features", label: "Tecnología" },
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#gallery", label: "Galería" },
  { href: "/#tokens", label: "Tokens" },
  { href: "/#pricing", label: "Planes" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
      <Container className="site-header__inner" size="wide">
        <Brand />

        <nav className="desktop-navigation" aria-label="Navegación principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a className="site-header__login" href="/#login">Iniciar sesión</a>
          <a className="site-header__cta" href="/#pricing">Comenzar <span aria-hidden="true">→</span></a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </Container>

      <div className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}>
        <Container>
          <nav id="mobile-navigation" aria-label="Navegación móvil">
            {navigation.map((item, index) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                <span>0{index + 1}</span>
                {item.label}
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </nav>
          <div className="mobile-menu__actions">
            <a href="/#login" onClick={closeMenu}>Iniciar sesión</a>
            <a href="/#pricing" onClick={closeMenu}>Crear mi experiencia</a>
          </div>
        </Container>
      </div>
    </header>
  );
}
