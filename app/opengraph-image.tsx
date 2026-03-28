import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tarık Tunç — Full Stack Developer & Vibe Coder";
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
          backgroundColor: "#0a0a0f",
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
              color: "#e5e5e5",
              letterSpacing: "-0.02em",
            }}
          >
            Tarık Tunç
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#3b82f6",
              fontWeight: 500,
            }}
          >
            Full Stack Developer &amp; Vibe Coder
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#a3a3a3",
              marginTop: "10px",
            }}
          >
            796+ Blog Yazısı • React • Next.js • TypeScript
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 16,
            color: "#3b82f6",
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
