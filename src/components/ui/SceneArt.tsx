import Image from "next/image";
import type { Scene } from "@/data/services";

/**
 * Composición arquitectónica en SVG que ocupa el lugar de una fotografía.
 *
 * Motivo: el proyecto todavía no dispone de fotografías propias con derechos de uso.
 * En lugar de usar fotos de stock genéricas, cada hueco muestra una composición geométrica
 * con la paleta de marca. Cuando existan fotos reales, basta con pasar `src`
 * (p. ej. "/images/hero-villa.jpg") y el componente las sirve optimizadas con next/image.
 */

type ExtendedScene = Scene | "hero" | "dunes" | "remote";

interface Props {
  scene: ExtendedScene;
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

const C = {
  ink: "#03203D",
  ink2: "#0A2C4F",
  stone: "#639CC5",
  stone2: "#8DB8D8",
  red: "#EB2F33",
  paper: "#F5F4F0",
  white: "#FFFFFF",
};

export function SceneArt({ scene, src, alt, className = "", priority, sizes = "(min-width: 1024px) 50vw, 100vw" }: Props) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
    );
  }
  return (
    <div className={`grain relative overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={alt}
      >
        {renderScene(scene)}
      </svg>
    </div>
  );
}

function Palm({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={C.ink} fill="none" strokeWidth={3} strokeLinecap="round">
      <path d="M0 0 C 4 -60, 10 -110, 18 -160" />
      <path d="M18 -160 C -10 -175, -40 -170, -62 -150" />
      <path d="M18 -160 C 0 -190, -18 -200, -40 -205" />
      <path d="M18 -160 C 30 -195, 52 -205, 72 -200" />
      <path d="M18 -160 C 50 -170, 76 -160, 92 -138" />
      <path d="M18 -160 C 24 -140, 20 -120, 10 -104" />
    </g>
  );
}

function renderScene(scene: ExtendedScene) {
  switch (scene) {
    case "hero":
      return (
        <>
          <rect width="400" height="500" fill={C.stone} />
          {/* sol */}
          <circle cx="300" cy="118" r="46" fill={C.paper} />
          {/* horizonte marino */}
          <rect y="300" width="400" height="200" fill={C.ink2} />
          {[318, 336, 354].map((y, i) => (
            <line key={y} x1={40 + i * 30} x2={400} y1={y} y2={y} stroke={C.stone2} strokeWidth="1.5" opacity={0.6 - i * 0.15} />
          ))}
          {/* volúmenes de vivienda canaria */}
          <rect x="34" y="196" width="186" height="174" fill={C.white} />
          <rect x="132" y="146" width="128" height="104" fill={C.paper} />
          <rect x="220" y="250" width="146" height="120" fill={C.white} />
          {/* sombras arquitectónicas */}
          <rect x="132" y="146" width="18" height="104" fill={C.stone2} opacity="0.5" />
          <rect x="220" y="250" width="22" height="120" fill={C.stone2} opacity="0.45" />
          {/* huecos */}
          <rect x="58" y="226" width="48" height="66" fill={C.ink} />
          <rect x="166" y="174" width="70" height="40" fill={C.ink} />
          <path d="M262 370 V306 a26 26 0 0 1 52 0 V370 Z" fill={C.ink} />
          <rect x="130" y="296" width="64" height="74" fill={C.ink} />
          <line x1="162" x2="162" y1="296" y2="370" stroke={C.stone} strokeWidth="2" />
          {/* piscina */}
          <rect x="34" y="388" width="250" height="44" fill={C.stone} />
          <path d="M48 404 q 14 -6 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0" stroke={C.paper} strokeWidth="2" fill="none" opacity="0.8" />
          {/* toldo rojo: único acento */}
          <rect x="300" y="236" width="66" height="10" fill={C.red} />
          <Palm x={350} y={386} s={0.92} />
        </>
      );
    case "villa":
      return (
        <>
          <rect width="400" height="500" fill={C.paper} />
          <rect y="0" width="400" height="230" fill={C.stone} />
          <circle cx="86" cy="96" r="34" fill={C.paper} />
          <rect x="60" y="170" width="290" height="200" fill={C.white} />
          <rect x="60" y="170" width="290" height="16" fill={C.stone2} />
          <rect x="88" y="214" width="70" height="96" fill={C.ink} />
          <rect x="190" y="214" width="130" height="58" fill={C.ink} />
          <rect x="0" y="370" width="400" height="130" fill={C.ink} />
          <rect x="40" y="398" width="320" height="60" fill={C.stone} />
          <rect x="300" y="300" width="50" height="8" fill={C.red} />
          <Palm x={360} y={372} s={0.8} />
        </>
      );
    case "apartment":
      return (
        <>
          <rect width="400" height="500" fill={C.stone} />
          <rect x="70" y="40" width="260" height="460" fill={C.paper} />
          {Array.from({ length: 5 }).map((_, r) =>
            [0, 1].map((c) => (
              <g key={`${r}-${c}`}>
                <rect x={92 + c * 124} y={66 + r * 86} width="92" height="54" fill={C.ink} />
                <rect x={86 + c * 124} y={120 + r * 86} width="104" height="8" fill={C.stone2} />
              </g>
            )),
          )}
          {/* una toalla roja tendida: detalle humano, único acento */}
          <rect x="230" y="290" width="22" height="34" fill={C.red} />
        </>
      );
    case "tools":
      return (
        <>
          <rect width="400" height="500" fill={C.paper} />
          {Array.from({ length: 8 }).map((_, r) =>
            Array.from({ length: 6 }).map((__, c) => (
              <rect key={`${r}-${c}`} x={c * 68 + 2} y={r * 64 + 2} width="64" height="60" fill="none" stroke={C.stone} strokeWidth="1.5" />
            )),
          )}
          <path d="M-10 330 H170 V140 H410" stroke={C.ink} strokeWidth="18" fill="none" />
          <circle cx="170" cy="236" r="26" fill={C.red} />
          <rect x="158" y="196" width="24" height="14" fill={C.ink} />
          <circle cx="170" cy="236" r="8" fill={C.paper} />
        </>
      );
    case "keys":
      return (
        <>
          <rect width="400" height="500" fill={C.ink} />
          <rect x="0" y="380" width="400" height="120" fill={C.ink2} />
          <path d="M110 420 V200 a90 90 0 0 1 180 0 V420 Z" fill={C.paper} />
          <path d="M140 420 V210 a60 60 0 0 1 120 0 V420 Z" fill={C.stone} />
          <line x1="200" x2="200" y1="150" y2="420" stroke={C.ink} strokeWidth="3" />
          <circle cx="232" cy="300" r="7" fill={C.ink} />
          <g transform="translate(250 312) rotate(18)">
            <line x1="0" y1="0" x2="0" y2="44" stroke={C.paper} strokeWidth="3" />
            <rect x="-14" y="44" width="28" height="40" fill={C.red} />
          </g>
          <rect x="60" y="440" width="280" height="10" fill={C.stone} opacity="0.5" />
        </>
      );
    case "linen":
      return (
        <>
          <rect width="400" height="500" fill={C.stone} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <rect x={70 + (i % 2) * 8} y={110 + i * 52} width="260" height="46" fill={i === 3 ? C.ink : C.paper} />
              <line x1={90 + (i % 2) * 8} x2={310 + (i % 2) * 8} y1={133 + i * 52} y2={133 + i * 52} stroke={i === 3 ? C.stone : C.stone2} strokeWidth="2" />
            </g>
          ))}
          <rect x="300" y="110" width="30" height="46" fill={C.red} />
        </>
      );
    case "supplies":
      return (
        <>
          <rect width="400" height="500" fill={C.paper} />
          <rect x="0" y="300" width="400" height="200" fill={C.ink} />
          <rect x="30" y="292" width="340" height="12" fill={C.stone} />
          {[
            [60, 180, 44, 112, C.stone],
            [120, 150, 40, 142, C.ink],
            [176, 200, 56, 92, C.stone2],
            [248, 170, 36, 122, C.red],
            [300, 210, 48, 82, C.stone],
          ].map(([x, y, w, h, f], i) => (
            <g key={i}>
              <rect x={x as number} y={y as number} width={w as number} height={h as number} rx={8} fill={f as string} />
              <rect x={(x as number) + (w as number) / 2 - 8} y={(y as number) - 18} width={16} height={18} fill={C.ink} />
            </g>
          ))}
        </>
      );
    case "pool":
      return (
        <>
          <rect width="400" height="500" fill={C.paper} />
          <rect x="40" y="60" width="320" height="300" fill={C.stone} />
          {[100, 140, 180, 220, 260, 300].map((y) => (
            <path key={y} d={`M60 ${y} q 20 -8 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0`} stroke={C.stone2} strokeWidth="3" fill="none" />
          ))}
          <rect x="40" y="380" width="70" height="100" fill={C.ink} />
          <rect x="130" y="380" width="70" height="100" fill={C.ink} />
          <rect x="130" y="380" width="70" height="16" fill={C.red} />
          <circle cx="300" cy="430" r="44" fill={C.ink2} />
          <circle cx="300" cy="430" r="44" fill="none" stroke={C.stone} strokeWidth="2" strokeDasharray="6 6" />
        </>
      );
    case "pack":
      return (
        <>
          <rect width="400" height="500" fill={C.ink} />
          <rect x="40" y="40" width="150" height="190" fill={C.stone} />
          <rect x="210" y="40" width="150" height="120" fill={C.paper} />
          <rect x="210" y="180" width="150" height="160" fill={C.ink2} stroke={C.stone} strokeWidth="2" />
          <rect x="40" y="250" width="150" height="210" fill={C.paper} />
          <rect x="210" y="360" width="150" height="100" fill={C.red} />
          <path d="M70 140 l40 40 l60 -80" stroke={C.ink} strokeWidth="10" fill="none" strokeLinecap="square" />
        </>
      );
    case "dunes":
      return (
        <>
          <rect width="400" height="500" fill={C.stone} />
          <circle cx="290" cy="130" r="54" fill={C.paper} />
          <path d="M0 320 C 80 250, 160 250, 220 300 S 340 340, 400 280 V500 H0 Z" fill={C.paper} />
          <path d="M0 380 C 90 330, 170 340, 250 380 S 360 400, 400 370 V500 H0 Z" fill={C.white} />
          <path d="M0 440 C 120 410, 240 420, 400 440 V500 H0 Z" fill={C.ink} />
          <rect x="300" y="300" width="6" height="40" fill={C.ink} />
          <rect x="296" y="292" width="14" height="10" fill={C.red} />
        </>
      );
    case "remote":
      return (
        <>
          <rect width="400" height="500" fill={C.ink} />
          <circle cx="200" cy="250" r="160" fill="none" stroke={C.stone} strokeWidth="1.5" opacity="0.5" />
          <circle cx="200" cy="250" r="110" fill="none" stroke={C.stone} strokeWidth="1.5" opacity="0.5" />
          <circle cx="200" cy="250" r="60" fill="none" stroke={C.stone} strokeWidth="1.5" opacity="0.5" />
          <circle cx="200" cy="250" r="10" fill={C.red} />
          <line x1="0" x2="400" y1="250" y2="250" stroke={C.stone} strokeWidth="1" opacity="0.4" />
          <line x1="200" x2="200" y1="0" y2="500" stroke={C.stone} strokeWidth="1" opacity="0.4" />
        </>
      );
  }
}
