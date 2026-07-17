"use client";

import { useEffect, useState } from "react";
import { Brand } from "@/components/layout/brand";
import { Container } from "@/components/layout/container";
import { BackendStatus } from "@/components/system/backend-status";
import { ButtonLink } from "@/components/ui/button-link";

const navigation = [
  { href: "/#principles", label: "Tecnología" },
  { href: "/#components", label: "Experiencia" },
  { href: "/#plans", label: "Planes", pending: true },
  { href: "/#faq", label: "FAQ", pending: true },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <Container className="site-header__inner" size="wide">
        <Brand />

        <nav className="desktop-navigation" aria-label="Navegación principal">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.pending ? undefined : item.href}
              aria-disabled={item.pending || undefined}
              title={item.pending ? "Esta sección se incorporará en un próximo módulo" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <BackendStatus />
          <ButtonLink href="/#components" size="small">Comenzar</ButtonLink>
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
              <a
                key={item.label}
                href={item.pending ? undefined : item.href}
                aria-disabled={item.pending || undefined}
                onClick={item.pending ? undefined : closeMenu}
              >
                <span>0{index + 1}</span>
                {item.label}
                {item.pending ? <small>Próximamente</small> : <b aria-hidden="true">↗</b>}
              </a>
            ))}
          </nav>
          <ButtonLink href="/#components" size="large" onClick={closeMenu}>Crear mi experiencia</ButtonLink>
        </Container>
      </div>
    </header>
  );
}
