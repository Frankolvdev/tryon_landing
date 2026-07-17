import { Container } from "@/components/layout/container";
import { BackendStatus } from "@/components/system/backend-status";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";

const ArrowIcon = () => <span aria-hidden="true">→</span>;

export default function HomePage() {
  return (
    <main className="design-system-shell" id="top">
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      <div className="noise-layer" />

      <Container as="header" className="bootstrap-header" size="wide">
        <a className="brand" href="#top" aria-label="TRYON, inicio">
          <span>TRY</span><strong>ON</strong>
          <small>AI VIRTUAL TRY-ON</small>
        </a>
        <BackendStatus />
      </Container>

      <Container as="section" className="design-system-hero" size="wide">
        <Badge>LANDING SYSTEM · ZIP 01B</Badge>
        <h1>Una identidad visual creada para convertir.</h1>
        <p className="lead">
          Tokens, componentes y patrones responsive que mantendrán consistente toda la landing,
          desde el hero hasta planes, autenticación y experiencias conectadas al backend.
        </p>
        <div className="bootstrap-actions">
          <ButtonLink href="#components" icon={<ArrowIcon />}>Explorar sistema</ButtonLink>
          <ButtonLink href="#principles" variant="secondary">Ver principios</ButtonLink>
        </div>
      </Container>

      <Container as="section" id="principles" className="system-section" size="wide">
        <SectionHeading
          eyebrow="BASE VISUAL"
          title={<>Diseñado para verse premium en <em>cada pantalla</em>.</>}
          description="El sistema usa escalas fluidas, superficies cinematográficas, estados accesibles y componentes reutilizables sin agregar dependencias externas."
        />

        <div className="principles-grid">
          <Surface>
            <span className="card-index">01</span>
            <h3>Escala fluida</h3>
            <p>Espaciados y tipografía se adaptan suavemente entre móvil, tableta y escritorio.</p>
          </Surface>
          <Surface accent>
            <span className="card-index">02</span>
            <h3>Contraste premium</h3>
            <p>Negro, grafito y rojo profundo con estados legibles y focos visibles.</p>
          </Surface>
          <Surface>
            <span className="card-index">03</span>
            <h3>Componentes reales</h3>
            <p>Botones, badges, contenedores y tarjetas listos para módulos dinámicos.</p>
          </Surface>
        </div>
      </Container>

      <Container as="section" id="components" className="system-section" size="wide">
        <SectionHeading
          eyebrow="COMPONENTES"
          title="Bloques reutilizables para toda la experiencia."
          align="center"
        />

        <Surface as="div" className="component-showcase" accent>
          <div className="component-showcase__group">
            <span className="component-label">Acciones</span>
            <div className="component-row">
              <ButtonLink href="#top" icon={<ArrowIcon />}>Comenzar ahora</ButtonLink>
              <ButtonLink href="#top" variant="secondary">Ver demostración</ButtonLink>
              <ButtonLink href="#top" variant="ghost" size="small">Más información</ButtonLink>
            </div>
          </div>

          <div className="component-showcase__group">
            <span className="component-label">Estados</span>
            <div className="component-row">
              <Badge>IA TRY-ON</Badge>
              <Badge tone="success">Backend conectado</Badge>
              <Badge tone="neutral">Responsive</Badge>
            </div>
          </div>
        </Surface>
      </Container>

      <Container as="footer" className="bootstrap-footer" size="wide">
        <p>TRYON · AI Virtual Try-On Platform</p>
        <p>Sistema visual listo para recibir el layout global y el hero.</p>
      </Container>
    </main>
  );
}
