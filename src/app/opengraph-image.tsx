import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo/site";

export const alt = "TRYON — AI Virtual Try-On";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          alignItems: "center",
          padding: "72px 84px",
          background:
            "radial-gradient(circle at 78% 42%, rgba(144, 24, 51, .55), transparent 28%), linear-gradient(135deg, #020308 0%, #090b13 52%, #17050b 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: "1px solid rgba(255,255,255,.16)",
            borderRadius: 30,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 810 }}>
          <div
            style={{
              display: "flex",
              color: "#ff607c",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 8,
              marginBottom: 24,
            }}
          >
            AI VIRTUAL TRY-ON
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: -5,
            }}
          >
            Visualiza tu próximo look con IA.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 27,
              lineHeight: 1.4,
              color: "rgba(255,255,255,.72)",
            }}
          >
            {siteConfig.description}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 76,
            bottom: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 142,
            height: 142,
            borderRadius: 999,
            border: "3px solid rgba(255,96,124,.8)",
            boxShadow: "0 0 70px rgba(255,40,80,.42)",
            fontSize: 62,
            fontWeight: 900,
          }}
        >
          T
        </div>
      </div>
    ),
    size,
  );
}
