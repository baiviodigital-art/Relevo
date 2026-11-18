# Sistema de diseño · Relevo

Soft brutalism + editorial + Swiss. Tipografía protagonista, bloques de color planos, líneas finas de composición,
numeración editorial grande, flechas dibujadas y un solo acento rojo por bloque.
Referencia: maqueta de hero, paleta y moodboard facilitados por el equipo (estética editorial, fotografía arquitectónica,
tipografía de gran formato, composiciones asimétricas).

## Color
| Token | HEX | Uso | Proporción |
|---|---|---|---|
| `ink` (Egyptian Blue) | #03203D | Fondos principales, navegación, secciones de impacto | ~60 % |
| `stone` (Stone Blue) | #639CC5 | Bloques secundarios, números editoriales, contraste | ~30 % |
| `scarlet` (Scarlet Red) | #EB2F33 | CTA principal, palabras destacadas, flechas, indicadores | ~10 % |
| `paper` (blanco roto) | #F5F4F0 | Secciones claras, texto sobre ink | auxiliar |
| `white` | #FFFFFF | Texto sobre rojo | auxiliar |
| `ink-2` | #0A2C4F | Superficie elevada sobre ink (variación tonal de ink, no color nuevo) | derivado |
| `stone-2` | #8DB8D8 | Etiquetas pequeñas sobre ink (tinte de stone) | derivado |

### Contraste (WCAG 2.2) — reglas que salen de los cálculos
| Combinación | Ratio | Uso permitido |
|---|---|---|
| paper sobre ink | ≈ 15:1 | Todo |
| stone sobre ink / ink sobre stone | ≈ 5.5:1 | Todo |
| stone-2 sobre ink | ≈ 8:1 | Texto pequeño (etiquetas) |
| blanco sobre scarlet | ≈ 4.2:1 | **Solo texto grande** (≥ 19 px bold o ≥ 24 px). Botones usan 19 px extrabold |
| scarlet sobre ink | ≈ 3.9:1 | **Solo titulares display** |
| scarlet sobre paper | ≈ 3.8:1 | **Solo titulares display** |
| ink sobre scarlet | ≈ 3.9:1 | Solo texto grande (marquee) |
| paper sobre stone | ≈ 2.7:1 | **Prohibido** para texto |
| stone sobre paper | ≈ 2.7:1 | **Prohibido** para texto (solo números decorativos `aria-hidden`) |

Errores de formulario: #B5161A sobre paper (≥ 6:1). Foco visible: contorno scarlet 3 px (blanco sobre fondos rojos).

## Tipografía
- **Display:** Anton (Google Fonts vía `next/font`, autoalojada en build). Mayúsculas, `line-height: .92`, tamaños fluidos en `vw`.
- **Texto:** Manrope 400–800.
- `.eyebrow`: 12 px, 700, tracking .18em, mayúsculas. Formato de etiqueta de sección: `02 / Nombre`.
- Palabras destacadas en rojo con `*asteriscos*` en `SplitWords`.
- Texto vertical (`.vertical-text`) solo decorativo y `aria-hidden`.

## Movimiento
| Patrón | Componente | Notas |
|---|---|---|
| Transición de página (cortina roja + azul) | `motion/TransitionProvider`, `TLink` | Respeta cmd/ctrl-clic; sin animación con reduced-motion |
| Tipografía cinética por palabras | `motion/SplitWords` | Máscara por palabra; `aria-label` con el texto completo |
| Revelado escalonado | `motion/Reveal` + `data-reveal` | ScrollTrigger `once` |
| Revelado de imagen + parallax | `motion/ImageReveal` | clip-path + escala |
| Scroll horizontal anclado | `home/ServicesRail` | Solo ≥ 1024 px; móvil = lista vertical |
| Sección sticky con contador | `home/HowItWorks` | |
| Botón magnético | `motion/Magnetic` | Solo `pointer: fine` |
| Marquee | `ui/Marquee` | CSS puro, se pausa en hover |
| Contador del carrito | `layout/Navbar` | Rebote elástico al añadir |

Easing de marca: `expo.out` / `cubic-bezier(.16,1,.3,1)`. Duraciones 0.6–1.4 s. Nada de animación en checkout.

## Imágenes
Sin fotografías con derechos todavía → `ui/SceneArt` dibuja composiciones arquitectónicas SVG con la paleta.
Admite `src` para sustituirlas por fotos reales (ver `public/images/README.md`).

## Componentes
`ui/`: Logo, Button, Arrow (DrawnArrow, ArrowIcon), Marquee, SectionLabel, Notice, SceneArt.
`layout/`: Navbar, MobileMenu, Footer, PageHero, ComingSoon.
`forms/`: fields (TextField, SelectField, TextArea, ChipGroup, PrivacyCheck, Honeypot), ContactForm, ProForm.
