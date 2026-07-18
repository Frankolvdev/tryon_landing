import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Política de cookies", description: "Información sobre cookies y tecnologías similares utilizadas por TRYON." };

export default function CookiesPage() {
  return <LegalPage eyebrow="Preferencias del navegador" title="Política de cookies" description="Detallamos cómo pueden utilizarse cookies y tecnologías similares para que el sitio funcione de forma segura y eficiente." updatedAt="18 de julio de 2026" sections={[
    { id: "definicion", title: "Qué son las cookies", content: <p>Las cookies son pequeños archivos o identificadores almacenados por el navegador que permiten recordar información durante una sesión o entre visitas.</p> },
    { id: "necesarias", title: "Cookies necesarias", content: <p>Son esenciales para funciones como seguridad, inicio de sesión, navegación, prevención de fraude y conservación de preferencias indispensables.</p> },
    { id: "preferencias", title: "Preferencias y experiencia", content: <p>Pueden recordar opciones como idioma, interfaz o consentimiento para ofrecer una experiencia coherente.</p> },
    { id: "analitica", title: "Analítica", content: <p>Cuando esté habilitada y permitida, la analítica ayuda a comprender el rendimiento y el uso agregado del sitio. No se utilizará antes de obtener el consentimiento cuando este sea exigible.</p> },
    { id: "control", title: "Cómo controlarlas", content: <p>Podrás administrar tus preferencias desde el banner o panel de cookies que incorporará el sitio, además de los controles disponibles en tu navegador.</p> },
  ]} previous={{ href: "/terms", label: "Términos de uso" }} next={{ href: "/acceptable-use", label: "Uso aceptable" }} />;
}
