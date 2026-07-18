import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Política de uso aceptable", description: "Reglas para un uso seguro y responsable de TRYON.",
  alternates: { canonical: "/acceptable-use" },
  openGraph: { url: "/acceptable-use" },
};

export default function AcceptableUsePage() {
  return <LegalPage eyebrow="Seguridad y comunidad" title="Política de uso aceptable" description="TRYON debe utilizarse de forma legal, consentida y respetuosa. Estas reglas protegen a usuarios, terceros y la infraestructura del servicio." updatedAt="18 de julio de 2026" sections={[
    { id: "consentimiento", title: "Consentimiento y derechos", content: <p>Solo debes cargar imágenes que te pertenezcan o para las que tengas autorización suficiente. No puedes suplantar, acosar, explotar ni vulnerar la privacidad de terceros.</p> },
    { id: "menores", title: "Protección de menores", content: <p>Está estrictamente prohibido utilizar el servicio para crear, transformar o distribuir contenido sexual, explotador o inapropiado relacionado con menores de edad.</p> },
    { id: "ilegal", title: "Actividades prohibidas", content: <><p>No puedes utilizar TRYON para:</p><ul><li>Violar leyes o derechos de propiedad intelectual.</li><li>Distribuir malware o intentar eludir controles de seguridad.</li><li>Automatizar abusivamente solicitudes o degradar la infraestructura.</li><li>Generar contenido engañoso destinado a fraude, extorsión o daño.</li></ul></> },
    { id: "moderacion", title: "Moderación y medidas", content: <p>Podemos limitar, suspender o cancelar el acceso cuando detectemos incumplimientos, riesgos de seguridad, fraude o exigencias legales.</p> },
    { id: "reportes", title: "Reportes", content: <p>Las vías de reporte y soporte se mostrarán en la plataforma. Las solicitudes se revisarán considerando seguridad, privacidad y obligaciones aplicables.</p> },
  ]} previous={{ href: "/cookies", label: "Política de cookies" }} next={{ href: "/18-plus", label: "Aviso para mayores de edad" }} />;
}
