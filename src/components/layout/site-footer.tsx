import Link from "next/link";
import type { Route } from "next";
import { Brand } from "@/components/layout/brand";
import { Container } from "@/components/layout/container";

const footerGroups = [
  {
    title: "Producto",
    links: [
      { label: "Tecnología", href: "/#principles" },
      { label: "Cómo funciona", href: "/#how-it-works" },
      { label: "Planes", href: "/#pricing" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Preguntas frecuentes", href: "/#faq" },
      { label: "Privacidad y seguridad", href: "/#privacy" },
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
      <Container size="wide">
        <div className="site-footer__top">
          <div className="site-footer__identity">
            <Brand compact />
            <p>Prueba virtual de prendas impulsada por inteligencia artificial, diseñada para una experiencia rápida, privada y personalizada.</p>
          </div>
          <div className="site-footer__navigation">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2>{group.title}</h2>
                {group.links.map((link) => <Link key={link.href} href={link.href as Route}>{link.label}</Link>)}
              </div>
            ))}
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} TRYON. Todos los derechos reservados.</p>
          <p>AI Virtual Try-On Platform</p>
        </div>
      </Container>
    </footer>
  );
}
