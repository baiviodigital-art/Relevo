import { ImageResponse } from "next/og";

export const alt = "Relevo · Tu vivienda. Nuestro relevo.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#03203D" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: 720 }}>
          <div style={{ display: "flex", color: "#F5F4F0", fontSize: 40, fontWeight: 800 }}>
            relevo<span style={{ color: "#EB2F33" }}>.</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 900, lineHeight: 0.9, letterSpacing: -3 }}>
            <span style={{ color: "#F5F4F0" }}>TU VIVIENDA.</span>
            <span style={{ color: "#EB2F33" }}>NUESTRO RELEVO.</span>
          </div>
          <div style={{ display: "flex", color: "#8DB8D8", fontSize: 26 }}>Servicios para viviendas vacacionales · Canarias</div>
        </div>
        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <div style={{ display: "flex", flex: 1, background: "#F5F4F0" }} />
          <div style={{ display: "flex", height: 180, background: "#639CC5" }} />
        </div>
      </div>
    ),
    size,
  );
}
