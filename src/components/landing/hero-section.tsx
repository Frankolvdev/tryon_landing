import { Container } from "@/components/layout/container";
import { HeroVisual } from "@/components/landing/hero-visual";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";

const ArrowIcon = () => <span aria-hidden="true">→</span>;
const PlayIcon = () => <span aria-hidden="true">▶</span>;

const trustItems = [
  "Resultados de alta fidelidad",
  "Experiencia completamente responsive",
  "Integración real con tu cuenta",
];

export function HeroSection() {
  return (
    <section className="landing-hero" id="inicio" aria-labelledby="hero-title">
      <Container className="landing-hero__grid" size="wide">
        <div className="landing-hero__content">
          <Badge>AI VIRTUAL TRY-ON · NUEVA GENERACIÓN</Badge>
          <h1 id="hero-title">
            Descubre cómo se ve <em>antes de vestirlo.</em>
          </h1>
          <p>
            Prueba prendas y estilos con inteligencia artificial desde cualquier dispositivo.
            Una experiencia visual rápida, privada y creada para ayudarte a elegir con confianza.
          </p>

          <div className="landing-hero__actions">
            <ButtonLink href="#experiencia" size="large" icon={<ArrowIcon />}>
              Probar la experiencia
            </ButtonLink>
            <ButtonLink href="#como-funciona" size="large" variant="secondary" icon={<PlayIcon />}>
              Ver cómo funciona
            </ButtonLink>
          </div>

          <ul className="landing-hero__trust" aria-label="Características principales">
            {trustItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <HeroVisual />
      </Container>

      <div className="landing-hero__marquee" aria-hidden="true">
        <span>FASHION INTELLIGENCE</span>
        <i />
        <span>PERSONAL FIT</span>
        <i />
        <span>AI EXPERIENCE</span>
        <i />
        <span>TRY BEFORE YOU WEAR</span>
      </div>
    </section>
  );
}
