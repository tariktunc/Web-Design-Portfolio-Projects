// ===== Google Consent Mode v2 =====

import type { ConsentState } from "./consent";

type ConsentArg = "granted" | "denied";

interface GtagConsentParams {
  ad_storage: ConsentArg;
  ad_user_data: ConsentArg;
  ad_personalization: ConsentArg;
  analytics_storage: ConsentArg;
  functionality_storage: ConsentArg;
  personalization_storage: ConsentArg;
  security_storage: ConsentArg;
}

// Global gtag fonksiyonu icin tip tanimlari
declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    gtag: (...args: [string, ...unknown[]]) => void;
  }
}

/**
 * gtag fonksiyonunu baslat (dataLayer uzerinden).
 */
function gtag(...args: [string, ...unknown[]]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(Object.fromEntries(args.map((a, i) => [i.toString(), a])));
}

/**
 * Google Consent Mode v2 icin varsayilan denied durumunu ayarlar.
 * Bu fonksiyon, GTM/GA scriptleri yuklenmeden ONCE cagrilmalidir.
 */
export function initGoogleConsent(): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  // gtag fonksiyonunu tanimla
  window.gtag = function (...args: [string, ...unknown[]]) {
    window.dataLayer.push(arguments as unknown as Record<string, unknown>);
  };

  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
  } satisfies GtagConsentParams);
}

/**
 * Kullanicinin consent tercihlerine gore Google Consent Mode'u gunceller.
 */
export function updateGoogleConsent(state: ConsentState): void {
  if (typeof window === "undefined" || !window.gtag) return;

  const toConsent = (val: boolean): ConsentArg => (val ? "granted" : "denied");

  window.gtag("consent", "update", {
    ad_storage: toConsent(state.marketing),
    ad_user_data: toConsent(state.marketing),
    ad_personalization: toConsent(state.marketing),
    analytics_storage: toConsent(state.analytics),
    functionality_storage: toConsent(state.functional),
    personalization_storage: toConsent(state.functional),
    security_storage: "granted", // Her zaman acik
  } satisfies GtagConsentParams);
}
