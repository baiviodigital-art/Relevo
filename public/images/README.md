# Fotografías

Esta carpeta está vacía a propósito: el proyecto aún no tiene fotografías con derechos de uso.

Mientras tanto, cada hueco de imagen muestra una composición SVG de marca (`src/components/ui/SceneArt.tsx`).
Para sustituirla por una foto real:

1. Guarda la imagen aquí (JPG/WebP, mínimo 2000 px en el lado largo), p. ej. `hero-villa.jpg`.
2. Pasa la ruta al componente: `<SceneArt scene="hero" src="/images/hero-villa.jpg" alt="…" />`.

next/image la servirá optimizada (AVIF/WebP, tamaños responsive, lazy loading).

Fotos prioritarias: hero (vivienda vacacional canaria, arquitectura blanca + cielo), limpieza, mantenimiento,
check-in (puerta/llaves), lavandería, reposición, piscina/jardín, pack, y una para "Quiénes somos" (paisaje del sur de Gran Canaria).
