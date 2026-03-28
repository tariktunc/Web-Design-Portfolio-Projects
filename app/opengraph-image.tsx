import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tarık Tunç — Full Stack Geliştirici";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0d17",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#e2e8f0",
              letterSpacing: "-0.02em",
            }}
          >
            Tarık Tunç
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#818cf8",
              fontWeight: 500,
            }}
          >
            Full Stack Geliştirici
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#94a3b8",
              marginTop: "10px",
            }}
          >
            React • Next.js • TypeScript • Node.js
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 16,
            color: "#818cf8",
            opacity: 0.7,
          }}
        >
          tariktunc.com
        </div>
      </div>
    ),
    { ...size }
  );
}
