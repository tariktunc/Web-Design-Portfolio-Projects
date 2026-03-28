import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tarık Tunç — Full Stack Geliştirici",
    short_name: "Tarık Tunç",
    description:
      "React, Next.js ve TypeScript ile modern web uygulamaları geliştiren Full Stack Developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0d17",
    theme_color: "#0b0d17",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
