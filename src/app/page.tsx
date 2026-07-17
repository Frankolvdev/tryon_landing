import { Container } from "@/components/layout/container";
import { HeroSection } from "@/components/landing/hero-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";

export default function HomePage() {
  return (
    <main className="landing-page" id="main-content">
      <span id="top" className="anchor-target" aria-hidden="true" />
      <div className="noise-layer" />
      <HeroSection />

      <Container as="section" id="experiencia" className="system-section landing-preview-section" size="wide">
        <SectionHeading
          eyebrow="EXPERIENCIA TRY-ON"
          title={<>Tecnología que convierte una idea en una <em>vista convincente</em>.</>}
          description="Esta primera estructura prepara el espacio para el comparador interactivo, la selección de prendas y la carga real de imágenes que incorporaremos en los próximos módulos."
        />

        <div className="principles-grid" id="como-funciona">
          <Surface>
            <span className="card-index">01</span>
            <h3>Sube tu imagen</h3>
            <p>Una experiencia guiada y responsive preparada para móvil, tableta y escritorio.</p>
          </Surface>
          <Surface accent>
            <span className="card-index">02</span>
            <h3>Elige tu estilo</h3>
            <p>Explora prendas y opciones disponibles sin romper el flujo de navegación.</p>
          </Surface>
          <Surface>
            <span className="card-index">03</span>
            <h3>Visualiza el resultado</h3>
            <p>Compara el antes y después con controles claros, accesibles y táctiles.</p>
          </Surface>
        </div>
      </Container>
    </main>
  );
}
