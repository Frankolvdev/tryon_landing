import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo TRYON recopila, utiliza y protege la información de sus usuarios.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacidad y datos"
      title="Política de privacidad"
      description="Explicamos de forma clara qué información puede tratar TRYON, para qué se utiliza y qué controles conservas sobre tus datos."
      updatedAt="18 de julio de 2026"
      sections={[
        { id: "alcance", title: "Alcance", content: <p>Esta política aplica al sitio público, las cuentas de usuario y los servicios de prueba virtual ofrecidos por TRYON.</p> },
        { id: "datos", title: "Información que tratamos", content: <><p>Podemos tratar datos de cuenta, información técnica de uso, preferencias y los archivos que envíes para ejecutar una prueba virtual.</p><ul><li>Datos de registro y acceso.</li><li>Información necesaria para pagos y suscripciones, gestionada junto con proveedores autorizados.</li><li>Fotografías, prendas y resultados procesados por solicitud del usuario.</li></ul></> },
        { id: "uso", title: "Cómo usamos la información", content: <p>La información se utiliza para prestar el servicio, mantener la seguridad, gestionar la cuenta, atender solicitudes, mejorar el rendimiento y cumplir obligaciones aplicables.</p> },
        { id: "imagenes", title: "Fotografías y resultados", content: <p>Los archivos se procesan para generar el resultado solicitado. TRYON no declara propiedad sobre tus fotografías. Los tiempos de conservación dependerán de la configuración del servicio, necesidades operativas y obligaciones legales.</p> },
        { id: "proveedores", title: "Proveedores y transferencias", content: <p>Podemos utilizar infraestructura de alojamiento, almacenamiento, procesamiento, pagos, correo y analítica. Solo se comparte la información necesaria para que dichos proveedores ejecuten su función.</p> },
        { id: "derechos", title: "Tus derechos y contacto", content: <p>Puedes solicitar acceso, corrección o eliminación de información cuando resulte aplicable. Los canales oficiales de contacto se publicarán dentro de la plataforma y sus páginas de soporte.</p> },
      ]}
      next={{ href: "/terms", label: "Términos de uso" }}
    />
  );
}
