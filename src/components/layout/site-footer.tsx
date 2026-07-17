import { Brand } from "@/components/layout/brand";
import { Container } from "@/components/layout/container";

const footerGroups = [
  {
    title: "Producto",
    links: [
      { label: "Tecnología", href: "/#principles" },
      { label: "Experiencia", href: "/#components" },
      { label: "Planes", pending: true },
    ],
  },
  {
    title: "Compañía",
    links: [
      { label: "Preguntas frecuentes", pending: true },
      { label: "Contacto", pending: true },
      { label: "Estado del servicio", pending: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidad", pending: true },
      { label: "Términos de uso", pending: true },
      { label: "Cookies", pending: true },
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
            <p>
              Prueba virtual de prendas impulsada por inteligencia artificial,
              diseñada para una experiencia rápida, privada y personalizada.
            </p>
          </div>

          <div className="site-footer__navigation">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2>{group.title}</h2>
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.pending ? undefined : link.href}
                    aria-disabled={link.pending || undefined}
                    title={link.pending ? "Disponible en un próximo módulo" : undefined}
                  >
                    {link.label}
                  </a>
                ))}
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
