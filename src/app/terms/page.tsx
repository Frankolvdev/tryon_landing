import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Términos de uso", description: "Condiciones generales para utilizar TRYON.",
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms" },
};

export default function TermsPage() {
  return <LegalPage eyebrow="Condiciones del servicio" title="Términos de uso" description="Estas condiciones regulan el acceso a TRYON y el uso responsable de sus funciones de prueba virtual." updatedAt="18 de julio de 2026" sections={[
    { id: "aceptacion", title: "Aceptación", content: <p>Al crear una cuenta o utilizar el servicio aceptas estas condiciones y las políticas vinculadas. Si no estás de acuerdo, no debes utilizar TRYON.</p> },
    { id: "cuentas", title: "Cuentas y seguridad", content: <p>Debes proporcionar información válida, proteger tus credenciales y avisar sobre accesos no autorizados. Eres responsable de la actividad realizada desde tu cuenta salvo disposición legal distinta.</p> },
    { id: "servicio", title: "Funcionamiento del servicio", content: <p>TRYON genera simulaciones visuales mediante inteligencia artificial. Los resultados son aproximaciones digitales y pueden variar según calidad, pose, iluminación, prenda y otros factores.</p> },
    { id: "planes", title: "Planes, tokens y pagos", content: <p>Los precios, beneficios, límites, tokens y renovaciones aplicables serán los mostrados por el servicio en el momento de la contratación. Las condiciones comerciales visibles en la plataforma forman parte del acuerdo.</p> },
    { id: "contenido", title: "Contenido del usuario", content: <p>Conservas los derechos que tengas sobre los archivos enviados. Nos autorizas de forma limitada a procesarlos únicamente para operar, proteger y prestar el servicio solicitado.</p> },
    { id: "responsabilidad", title: "Disponibilidad y responsabilidad", content: <p>Trabajamos para mantener un servicio estable, pero no garantizamos disponibilidad ininterrumpida. La responsabilidad se limitará en la medida permitida por la legislación aplicable.</p> },
  ]} previous={{ href: "/privacy", label: "Política de privacidad" }} next={{ href: "/cookies", label: "Política de cookies" }} />;
}
