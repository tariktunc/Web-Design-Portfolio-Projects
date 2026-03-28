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
          backgroundColor: "#0b0d17",
          color: "#94a3b8",
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
              color: "#818cf8",
              marginBottom: "1rem",
            }}
          >
            500
          </p>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#e2e8f0",
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
              border: "1px solid rgba(129, 140, 248, 0.3)",
              backgroundColor: "transparent",
              color: "#818cf8",
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
