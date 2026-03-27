"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="tr">
      <body
        style={{
          backgroundColor: "#0a192f",
          color: "#8892b0",
          fontFamily: "Inter, system-ui, sans-serif",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <main style={{ textAlign: "center", padding: "2rem" }}>
          <p
            style={{
              fontSize: "3.75rem",
              fontWeight: 700,
              color: "#64ffda",
              marginBottom: "1rem",
            }}
          >
            500
          </p>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#ccd6f6",
              marginBottom: "0.75rem",
            }}
          >
            Kritik Hata
          </h1>
          <p
            style={{
              maxWidth: "28rem",
              margin: "0 auto 2rem",
              lineHeight: 1.6,
            }}
          >
            Uygulama düzeyinde bir hata oluştu. Lütfen sayfayı yenileyin.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "0.625rem 1.25rem",
              borderRadius: "0.5rem",
              border: "1px solid rgba(100, 255, 218, 0.3)",
              backgroundColor: "transparent",
              color: "#64ffda",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Sayfayı Yenile
          </button>
        </main>
      </body>
    </html>
  );
}
