# TRYON Frontend — ZIP 01A

Base técnica del frontend público en Next.js.

## Incluye

- Next.js 16 + React 19 + TypeScript estricto.
- Diseño inicial responsive negro, grafito y rojo profundo.
- Variables de entorno públicas validadas.
- Cliente HTTP reusable con timeout y manejo de errores.
- Integración real de comprobación con `GET /health`.
- Estructura preparada para módulos de planes, autenticación y Try-On.

## Configuración

1. Copia `.env.example` como `.env.local`.
2. Ajusta `NEXT_PUBLIC_API_BASE_URL` si tu backend usa otra dirección.
3. Ejecuta `npm install` la primera vez.

Este ZIP no incluye una carpeta raíz. Debe descomprimirse directamente dentro de la carpeta vacía `frontend`.
