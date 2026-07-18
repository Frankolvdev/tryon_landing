import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Aviso para mayores de edad", description: "Requisitos de edad y reglas aplicables al contenido para adultos en TRYON.",
  alternates: { canonical: "/18-plus" },
  openGraph: { url: "/18-plus" },
};

export default function AdultsOnlyPage() {
  return <LegalPage eyebrow="Acceso responsable" title="Aviso para mayores de edad" description="Determinadas funciones o categorías pueden requerir confirmar que eres una persona adulta y que el contenido se utiliza con consentimiento." updatedAt="18 de julio de 2026" sections={[
    { id: "edad", title: "Requisito de edad", content: <p>Debes tener al menos 18 años, o la mayoría de edad superior exigida en tu jurisdicción, para acceder a cualquier función identificada como exclusiva para adultos.</p> },
    { id: "consentimiento", title: "Personas adultas y consentimiento", content: <p>Todo contenido debe representar únicamente a personas adultas que hayan autorizado su uso. No se permite contenido obtenido sin consentimiento ni imágenes íntimas manipuladas para perjudicar a terceros.</p> },
    { id: "verificacion", title: "Controles de acceso", content: <p>TRYON podrá aplicar confirmaciones de edad, restricciones regionales, moderación, registros de seguridad y otros controles razonables antes de permitir determinadas funciones.</p> },
    { id: "procesamiento", title: "Procesamiento comercial", content: <p>Las opciones de pago y disponibilidad pueden variar según el tipo de contenido, el proveedor de pagos y la normativa aplicable. La plataforma mostrará las opciones habilitadas en cada caso.</p> },
    { id: "cero-tolerancia", title: "Cero tolerancia con menores", content: <p>Cualquier intento de crear o procesar contenido sexual relacionado con menores está prohibido y podrá ocasionar bloqueo inmediato, conservación de evidencias y reporte cuando corresponda.</p> },
  ]} previous={{ href: "/acceptable-use", label: "Uso aceptable" }} />;
}
