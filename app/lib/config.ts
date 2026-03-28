const SITE_URL = "https://tariktunc.com";

export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // Production Vercel deployment → sabit domain kullan
  if (process.env.VERCEL_ENV === "production") {
    return SITE_URL;
  }

  // Preview/development deployments → Vercel URL kullan
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return SITE_URL;
}
