/**
 * Esquema simplificado del archipiélago (no cartográfico).
 * Coordenadas aproximadas lon/lat proyectadas a un plano. Solo para comunicar zonas.
 */
type Island = { name: string; pts: [number, number][]; status: "piloto" | "futuro" };

const islands: Island[] = [
  { name: "El Hierro", status: "futuro", pts: [[-18.16, 27.76], [-18.0, 27.84], [-17.9, 27.82], [-17.88, 27.74], [-17.98, 27.66], [-18.06, 27.7]] },
  { name: "La Palma", status: "futuro", pts: [[-17.96, 28.8], [-17.8, 28.85], [-17.72, 28.7], [-17.76, 28.55], [-17.84, 28.46], [-17.88, 28.58], [-17.98, 28.68]] },
  { name: "La Gomera", status: "futuro", pts: [[-17.34, 28.14], [-17.26, 28.21], [-17.12, 28.18], [-17.08, 28.1], [-17.14, 28.02], [-17.26, 28.03]] },
  { name: "Tenerife", status: "futuro", pts: [[-16.92, 28.37], [-16.6, 28.42], [-16.32, 28.52], [-16.12, 28.57], [-16.2, 28.48], [-16.4, 28.3], [-16.52, 28.1], [-16.66, 28.0], [-16.8, 28.1], [-16.88, 28.25]] },
  { name: "Gran Canaria", status: "piloto", pts: [[-15.7, 28.17], [-15.48, 28.15], [-15.38, 28.0], [-15.42, 27.84], [-15.58, 27.74], [-15.74, 27.8], [-15.84, 27.95], [-15.8, 28.08]] },
  { name: "Fuerteventura", status: "futuro", pts: [[-13.88, 28.75], [-13.84, 28.45], [-13.92, 28.24], [-14.2, 28.12], [-14.48, 28.06], [-14.36, 28.16], [-14.1, 28.32], [-14.02, 28.55], [-14.0, 28.74]] },
  { name: "Lanzarote", status: "futuro", pts: [[-13.44, 29.22], [-13.42, 29.02], [-13.6, 28.9], [-13.86, 28.86], [-13.84, 28.98], [-13.72, 29.08], [-13.56, 29.2]] },
];

const proj = ([lon, lat]: [number, number]): [number, number] => [(lon + 18.35) * 200, (29.4 - lat) * 228];

export function CanaryMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 420" className={className} role="img" aria-labelledby="map-title map-desc">
      <title id="map-title">Esquema de las Islas Canarias</title>
      <desc id="map-desc">Gran Canaria aparece destacada como zona propuesta para el piloto. El resto de islas se indican como expansión futura.</desc>
      {/* retícula */}
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 100} x2={i * 100} y1={0} y2={420} stroke="currentColor" strokeOpacity="0.08" />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={`h${i}`} y1={i * 100} y2={i * 100} x1={0} x2={1000} stroke="currentColor" strokeOpacity="0.08" />
      ))}
      {islands.map((isl) => {
        const p = isl.pts.map(proj);
        const cx = p.reduce((a, b) => a + b[0], 0) / p.length;
        const cy = p.reduce((a, b) => a + b[1], 0) / p.length;
        const pilot = isl.status === "piloto";
        return (
          <g key={isl.name}>
            <polygon
              points={p.map((q) => q.join(",")).join(" ")}
              fill={pilot ? "#EB2F33" : "transparent"}
              stroke={pilot ? "#EB2F33" : "#8DB8D8"}
              strokeWidth={2}
              strokeDasharray={pilot ? undefined : "6 5"}
              strokeLinejoin="round"
            />
            {pilot && <circle cx={cx} cy={cy + 34} r={6} fill="#F5F4F0" />}
            <text
              x={cx}
              y={cy - (pilot ? 52 : 40)}
              textAnchor="middle"
              className="fill-current font-sans"
              fontSize={pilot ? 22 : 16}
              fontWeight={pilot ? 800 : 600}
              opacity={pilot ? 1 : 0.75}
            >
              {isl.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
