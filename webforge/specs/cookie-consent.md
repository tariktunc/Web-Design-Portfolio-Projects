# Cookie Consent Implementation Specification

## User Flow

### First Visit
```
┌─────────────────────────────────────────────────────┐
│  🍪 Bu site cerezleri kullanmaktadir.               │
│                                                      │
│  Deneyiminizi iyilestirmek icin cerez kullaniyoruz.  │
│  Detaylar icin Cerez Politikamizi inceleyebilirsiniz.│
│                                                      │
│  [Tumunu Kabul Et]  [Tumunu Reddet]  [Tercihler]    │
└─────────────────────────────────────────────────────┘
```

### Preferences Modal
```
┌─────────────────────────────────────────────────────┐
│  Cerez Tercihleri                              [X]  │
│                                                      │
│  ◉ Zorunlu Cerezler (devre disi birakilamaz)        │
│    Sitenin duzgun calismasi icin gerekli cerezler.   │
│                                                      │
│  ○ Analitik Cerezler                                │
│    Ziyaretci istatistikleri toplama amaciyla          │
│    kullanilir.                                       │
│                                                      │
│  ○ Pazarlama Cerezleri                              │
│    Kisisellestirilmis reklam gosterimi icin          │
│    kullanilir.                                       │
│                                                      │
│  ○ Fonksiyonel Cerezler                             │
│    Tercih ve ayarlarinizi hatirlama amaciyla         │
│    kullanilir.                                       │
│                                                      │
│  [Secimleri Kaydet]                [Tumunu Kabul Et] │
└─────────────────────────────────────────────────────┘
```

### Return Visit (consent already given)
- Banner does NOT appear
- Footer link "Cerez Tercihleri" opens preferences modal
- User can change preferences at any time

### Consent Version Change
- If `version` in consent cookie doesn't match current version → re-show banner
- This handles policy updates

## Technical Architecture

### Consent State
```typescript
// src/lib/consent/types.ts
export type ConsentCategory = 'essential' | 'analytics' | 'marketing' | 'functional';

export interface ConsentState {
  essential: true;        // Always true, cannot be disabled
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: string;      // ISO 8601
  version: string;        // e.g., "1.0" — bump when policy changes
}

export const CONSENT_COOKIE_NAME = 'cookie_consent';
export const CONSENT_VERSION = '1.0';
export const CONSENT_EXPIRY_DAYS = 365;
```

### Consent Manager
```typescript
// src/lib/consent/index.ts
import { ConsentState, ConsentCategory, CONSENT_COOKIE_NAME, CONSENT_VERSION } from './types';

export function getConsent(category: ConsentCategory): boolean {
  if (category === 'essential') return true;
  const state = getConsentState();
  if (!state) return false;
  return state[category] ?? false;
}

export function hasConsent(category: ConsentCategory): boolean {
  return getConsent(category);
}

export function getConsentState(): ConsentState | null {
  if (typeof document === 'undefined') return null;
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${CONSENT_COOKIE_NAME}=`));
  if (!cookie) return null;
  try {
    const state = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
    if (state.version !== CONSENT_VERSION) return null; // Version mismatch → re-consent
    return state;
  } catch { return null; }
}

export function setConsentState(state: Omit<ConsentState, 'essential' | 'timestamp' | 'version'>): void {
  const fullState: ConsentState = {
    essential: true,
    ...state,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(fullState))}; expires=${expires}; path=/; SameSite=Lax; Secure`;

  // Fire Google Consent Mode update
  updateGoogleConsent(fullState);

  // Initialize analytics if consent granted
  if (fullState.analytics) initAnalytics();
}

export function acceptAll(): void {
  setConsentState({ analytics: true, marketing: true, functional: true });
}

export function rejectAll(): void {
  setConsentState({ analytics: false, marketing: false, functional: false });
}
```

### Google Consent Mode v2
```typescript
// src/lib/consent/google-consent.ts

// This MUST fire in <head> BEFORE GTM/GA4
export function initGoogleConsentDefault(): string {
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'functionality_storage': 'denied',
      'personalization_storage': 'denied',
      'security_storage': 'granted',
      'wait_for_update': 500
    });
  `;
}

export function updateGoogleConsent(state: ConsentState): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    'ad_storage': state.marketing ? 'granted' : 'denied',
    'ad_user_data': state.marketing ? 'granted' : 'denied',
    'ad_personalization': state.marketing ? 'granted' : 'denied',
    'analytics_storage': state.analytics ? 'granted' : 'denied',
    'functionality_storage': state.functional ? 'granted' : 'denied',
    'personalization_storage': state.functional ? 'granted' : 'denied',
    'security_storage': 'granted',
  });
}
```

### Root Layout Integration
```tsx
// src/app/layout.tsx
import { initGoogleConsentDefault } from '@/lib/consent/google-consent';

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Google Consent Mode v2 — MUST be FIRST script */}
        <script dangerouslySetInnerHTML={{ __html: initGoogleConsentDefault() }} />
        {/* GTM loads AFTER consent default is set */}
        <script dangerouslySetInnerHTML={{ __html: `/* GTM script */` }} />
      </head>
      <body>
        <ThemeProvider>
          <SkipNav />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CookieBanner />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Accessibility Requirements for Cookie Banner

1. Banner has `role="dialog"` and `aria-label="Cerez onayi"`
2. When banner appears, focus moves to it
3. Keyboard: Tab through buttons, Enter/Space to activate
4. Escape key closes preferences modal (but NOT the banner itself)
5. Preferences modal has focus trap (Tab cycles within modal)
6. When modal closes, focus returns to trigger button
7. Category toggles are accessible switches with labels
8. Screen reader announces when consent is saved (aria-live region)
9. All text meets color contrast requirements
10. Banner works in both light and dark mode
