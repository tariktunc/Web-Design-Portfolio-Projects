import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Security headers applied to every response
// ---------------------------------------------------------------------------
const SECURITY_HEADERS: Record<string, string> = {
  "Content-Security-Policy":
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https: blob:; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com; " +
    "frame-ancestors 'none'",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security":
    "max-age=63072000; includeSubDomains; preload",
  "Cross-Origin-Opener-Policy": "same-origin",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function applySecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

/** Paths that should skip URL normalisation (static assets, internal Next files). */
function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/public") ||
    pathname.startsWith("/api/health") ||
    /\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|css|js|woff|woff2|ttf|eot|json|xml|txt|webmanifest|map)$/i.test(
      pathname
    )
  );
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // --------------------------------------------------
  // 1. Maintenance Mode
  // --------------------------------------------------
  const maintenanceMode = process.env.MAINTENANCE_MODE === "true";

  if (maintenanceMode && !isStaticAsset(pathname)) {
    // Allow bypass with secret query param
    const bypassSecret = request.nextUrl.searchParams.get(
      "MAINTENANCE_BYPASS_SECRET"
    );
    if (
      bypassSecret &&
      bypassSecret === process.env.MAINTENANCE_BYPASS_SECRET
    ) {
      // Bypass – continue normally
    } else if (pathname !== "/maintenance") {
      const url = request.nextUrl.clone();
      url.pathname = "/maintenance";
      return applySecurityHeaders(NextResponse.redirect(url, 307));
    }
  }

  // --------------------------------------------------
  // 2. URL Normalization (skip static assets)
  // --------------------------------------------------
  if (!isStaticAsset(pathname)) {
    const lowered = pathname.toLowerCase();
    const trimmed =
      lowered.length > 1 && lowered.endsWith("/")
        ? lowered.slice(0, -1)
        : lowered;

    if (trimmed !== pathname) {
      const url = request.nextUrl.clone();
      url.pathname = trimmed;
      return applySecurityHeaders(
        NextResponse.redirect(url, 301)
      );
    }
  }

  // --------------------------------------------------
  // 3. Security Headers (all responses)
  // --------------------------------------------------
  const response = NextResponse.next();
  return applySecurityHeaders(response);
}

// ---------------------------------------------------------------------------
// Matcher – exclude static files, _next internals, and favicon
// ---------------------------------------------------------------------------
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico
     * - public folder assets (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2|ttf|eot|json|xml|txt|webmanifest|map)$).*)",
  ],
};
