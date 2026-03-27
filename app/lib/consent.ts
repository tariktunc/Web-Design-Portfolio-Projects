// ===== Cookie Consent Utility Functions =====

export const CONSENT_COOKIE_NAME = "cookie_consent";
export const CONSENT_VERSION = "1.0";

export interface ConsentState {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: string;
  version: string;
}

/**
 * Cookie'den consent state'i okur ve parse eder.
 * Geçersiz veya mevcut değilse null döner.
 */
export function getConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const consentCookie = cookies
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${CONSENT_COOKIE_NAME}=`));

  if (!consentCookie) return null;

  try {
    const value = consentCookie.substring(CONSENT_COOKIE_NAME.length + 1);
    const decoded = decodeURIComponent(value);
    const parsed: ConsentState = JSON.parse(decoded);

    // Temel alan kontrolu
    if (
      typeof parsed.essential !== "boolean" ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean" ||
      typeof parsed.functional !== "boolean" ||
      typeof parsed.timestamp !== "string" ||
      typeof parsed.version !== "string"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

/**
 * Consent state'i cookie'ye yazar.
 * Cookie suresi 1 yil olarak ayarlanir.
 */
export function setConsent(state: ConsentState): void {
  if (typeof document === "undefined") return;

  const value = encodeURIComponent(JSON.stringify(state));
  const maxAge = 365 * 24 * 60 * 60; // 1 yil (saniye)
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

/**
 * Belirli bir cookie kategorisinin kabul edilip edilmedigini kontrol eder.
 */
export function hasConsent(category: string): boolean {
  const consent = getConsent();
  if (!consent) return false;

  if (category in consent) {
    return consent[category as keyof ConsentState] === true;
  }

  return false;
}
