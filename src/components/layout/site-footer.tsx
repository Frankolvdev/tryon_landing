import Link from "next/link";
import type { Route } from "next";
import { Brand } from "@/components/layout/brand";
import { Container } from "@/components/layout/container";
import { CookiePreferencesLink } from "@/components/privacy/cookie-preferences-link";

const footerGroups = [
  {
    title: "Producto",
    links: [
      { label: "Tecnología", href: "/#features" },
      { label: "Cómo funciona", href: "/#como-funciona" },
      { label: "Galería", href: "/#gallery" },
      { label: "Planes", href: "/#pricing" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Preguntas frecuentes", href: "/#faq" },
      { label: "Privacidad y seguridad", href: "/#security" },
      { label: "Comenzar", href: "/#pricing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidad", href: "/privacy" },
      { label: "Términos de uso", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "Uso aceptable", href: "/acceptable-use" },
      { label: "Mayores de 18", href: "/18-plus" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__glow" aria-hidden="true" />
      <Container size="wide">
        <div className="site-footer__top">
          <div className="site-footer__identity">
            <Brand compact />
            <p>Prueba virtual de prendas impulsada por inteligencia artificial, diseñada para una experiencia rápida, privada y personalizada.</p>
            <div className="site-footer__status"><i /> Plataforma en desarrollo activo</div>
          </div>

          <div className="site-footer__navigation">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2>{group.title}</h2>
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href as Route}>{link.label}</Link>
                ))}
                {group.title === "Legal" && <CookiePreferencesLink />}
              </div>
            ))}
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} TRYON. Todos los derechos reservados.</p>
          <p>AI Virtual Try-On Platform · México</p>
        </div>
      </Container>
    </footer>
  );
}
