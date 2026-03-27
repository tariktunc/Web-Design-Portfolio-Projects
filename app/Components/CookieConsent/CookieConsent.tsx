"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  getConsent,
  setConsent,
  CONSENT_VERSION,
  type ConsentState,
} from "@/app/lib/consent";
import {
  initGoogleConsent,
  updateGoogleConsent,
} from "@/app/lib/google-consent";

// ===== Cookie kategorileri =====
interface CookieCategory {
  key: keyof Pick<ConsentState, "essential" | "analytics" | "marketing" | "functional">;
  label: string;
  description: string;
  required: boolean;
}

const CATEGORIES: CookieCategory[] = [
  {
    key: "essential",
    label: "Zorunlu Cookieler",
    description:
      "Web sitesinin temel islevleri icin gereklidir. Bu cookieler olmadan site duzgun calismaz.",
    required: true,
  },
  {
    key: "analytics",
    label: "Analitik Cookieler",
    description:
      "Ziyaretci istatistiklerini toplamamiza ve siteyi gelistirmemize yardimci olur.",
    required: false,
  },
  {
    key: "marketing",
    label: "Pazarlama Cookieleri",
    description:
      "Kisisellestirilmis reklamlar gostermek ve reklam kampanyalarinin etkinligini olcmek icin kullanilir.",
    required: false,
  },
  {
    key: "functional",
    label: "Islevsel Cookieler",
    description:
      "Dil tercihi ve tema gibi kisisel ayarlarinizi hatirlamak icin kullanilir.",
    required: false,
  },
];

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  const bannerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // --- Mount & ilk kontrol ---
  useEffect(() => {
    initGoogleConsent();

    const existing = getConsent();
    if (existing) {
      // Daha once tercih yapilmis, banner gosterme
      updateGoogleConsent(existing);
      setPreferences({
        essential: existing.essential,
        analytics: existing.analytics,
        marketing: existing.marketing,
        functional: existing.functional,
      });
    } else {
      setVisible(true);
    }
    setMounted(true);
  }, []);

  // --- Consent kaydet ---
  const saveConsent = useCallback(
    (prefs: typeof preferences) => {
      const state: ConsentState = {
        ...prefs,
        essential: true, // Her zaman true
        timestamp: new Date().toISOString(),
        version: CONSENT_VERSION,
      };
      setConsent(state);
      updateGoogleConsent(state);
      setVisible(false);
      setShowModal(false);
    },
    []
  );

  const handleAcceptAll = useCallback(() => {
    const all = { essential: true, analytics: true, marketing: true, functional: true };
    setPreferences(all);
    saveConsent(all);
  }, [saveConsent]);

  const handleRejectAll = useCallback(() => {
    const none = { essential: true, analytics: false, marketing: false, functional: false };
    setPreferences(none);
    saveConsent(none);
  }, [saveConsent]);

  const handleSavePreferences = useCallback(() => {
    saveConsent(preferences);
  }, [preferences, saveConsent]);

  // --- Modal ac/kapat ---
  const openModal = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    // Focusu geri ver
    setTimeout(() => {
      previousFocusRef.current?.focus();
    }, 0);
  }, []);

  // --- Modal focus trap ---
  useEffect(() => {
    if (!showModal || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    // Modal acildiginda ilk focusable elemana odaklan
    const focusFirst = () => {
      const firstFocusable = modal.querySelector<HTMLElement>(focusableSelector);
      firstFocusable?.focus();
    };
    // Kucuk gecikme ile odaklan (CSS transition icin)
    const timer = setTimeout(focusFirst, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }

      if (e.key !== "Tab") return;

      const focusableElements = modal.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal, closeModal]);

  // --- Banner Escape tusuna basinca kapat ---
  useEffect(() => {
    if (!visible || showModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleRejectAll();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible, showModal, handleRejectAll]);

  // Render etme: SSR veya tercih yapilmissa
  if (!mounted || !visible) return null;

  return (
    <>
      {/* ===== Banner ===== */}
      {!showModal && (
        <div
          ref={bannerRef}
          role="dialog"
          aria-label="Cookie tercihleri"
          aria-describedby="cookie-banner-desc"
          className="cookie-banner"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            animation: "cookie-slide-up 0.4s ease-out forwards",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              backgroundColor: "var(--navy-light)",
              borderTop: "1px solid var(--navy-lighter, #233554)",
              boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.4)",
            }}
          >
            <p
              id="cookie-banner-desc"
              style={{
                margin: 0,
                color: "var(--slate)",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              Bu web sitesi, deneyiminizi iyilestirmek ve site trafiginizi analiz
              etmek icin cookieler kullanmaktadir. Tercihlerinizi yonetebilir veya
              tum cookieleri kabul/reddetebilirsiniz.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <button
                onClick={handleAcceptAll}
                className="cookie-btn cookie-btn-accept"
              >
                Tumunu Kabul Et
              </button>
              <button
                onClick={handleRejectAll}
                className="cookie-btn cookie-btn-reject"
              >
                Tumunu Reddet
              </button>
              <button
                onClick={openModal}
                className="cookie-btn cookie-btn-manage"
              >
                Tercihleri Yonet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Tercih Modali ===== */}
      {showModal && (
        <>
          {/* Overlay */}
          <div
            onClick={closeModal}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10000,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              animation: "cookie-fade-in 0.2s ease-out forwards",
            }}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            ref={modalRef}
            role="dialog"
            aria-label="Cookie tercihlerini yonet"
            aria-modal="true"
            className="cookie-modal"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10001,
              width: "min(560px, calc(100vw - 32px))",
              maxHeight: "calc(100vh - 48px)",
              overflowY: "auto",
              backgroundColor: "var(--navy-light)",
              border: "1px solid var(--navy-lighter, #233554)",
              borderRadius: "12px",
              boxShadow: "0 8px 48px rgba(0, 0, 0, 0.5)",
              animation: "cookie-modal-in 0.3s ease-out forwards",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 24px 16px",
                borderBottom: "1px solid var(--navy-lighter, #233554)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--lightest-slate)",
                }}
              >
                Cookie Tercihleri
              </h2>
              <button
                onClick={closeModal}
                aria-label="Kapat"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--slate)",
                  fontSize: "24px",
                  cursor: "pointer",
                  padding: "4px 8px",
                  lineHeight: 1,
                  borderRadius: "4px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--lightest-slate)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--slate)")
                }
              >
                &#x2715;
              </button>
            </div>

            {/* Aciklama */}
            <p
              style={{
                padding: "16px 24px 0",
                margin: 0,
                color: "var(--slate)",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              Hangi cookie kategorilerinin kullanilmasina izin vermek istediginizi
              asagidan secebilirsiniz. Zorunlu cookieler site islevselligini
              saglamak icin her zaman aktiftir.
            </p>

            {/* Kategoriler */}
            <div style={{ padding: "16px 24px" }}>
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "16px",
                    padding: "16px 0",
                    borderBottom: "1px solid var(--navy-lighter, #233554)",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 500,
                        color: "var(--lightest-slate)",
                        fontSize: "15px",
                        marginBottom: "4px",
                      }}
                    >
                      {cat.label}
                      {cat.required && (
                        <span
                          style={{
                            marginLeft: "8px",
                            fontSize: "11px",
                            color: "var(--green)",
                            fontWeight: 400,
                          }}
                        >
                          (Her zaman aktif)
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        margin: 0,
                        color: "var(--slate)",
                        fontSize: "13px",
                        lineHeight: "1.5",
                      }}
                    >
                      {cat.description}
                    </p>
                  </div>

                  {/* Toggle Switch */}
                  <label
                    className="cookie-toggle"
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "44px",
                      height: "24px",
                      flexShrink: 0,
                      marginTop: "2px",
                      cursor: cat.required ? "not-allowed" : "pointer",
                      opacity: cat.required ? 0.6 : 1,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={preferences[cat.key]}
                      disabled={cat.required}
                      onChange={(e) => {
                        if (cat.required) return;
                        setPreferences((prev) => ({
                          ...prev,
                          [cat.key]: e.target.checked,
                        }));
                      }}
                      aria-label={`${cat.label} ${cat.required ? "(zorunlu)" : ""}`}
                      style={{
                        position: "absolute",
                        opacity: 0,
                        width: 0,
                        height: 0,
                      }}
                    />
                    <span
                      className="cookie-toggle-slider"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "12px",
                        backgroundColor: preferences[cat.key]
                          ? "var(--green)"
                          : "var(--navy-lighter, #233554)",
                        transition: "background-color 0.2s",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "3px",
                          left: preferences[cat.key] ? "23px" : "3px",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          backgroundColor: preferences[cat.key]
                            ? "var(--navy)"
                            : "var(--slate)",
                          transition: "left 0.2s, background-color 0.2s",
                        }}
                      />
                    </span>
                  </label>
                </div>
              ))}
            </div>

            {/* Footer butonlari */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                padding: "16px 24px 20px",
                borderTop: "1px solid var(--navy-lighter, #233554)",
              }}
            >
              <button
                onClick={handleSavePreferences}
                className="cookie-btn cookie-btn-accept"
              >
                Tercihleri Kaydet
              </button>
              <button
                onClick={handleAcceptAll}
                className="cookie-btn cookie-btn-manage"
              >
                Tumunu Kabul Et
              </button>
              <button
                onClick={handleRejectAll}
                className="cookie-btn cookie-btn-reject"
              >
                Tumunu Reddet
              </button>
            </div>
          </div>
        </>
      )}

      {/* ===== Inline CSS (keyframes + buton stilleri) ===== */}
      <style jsx>{`
        @keyframes cookie-slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes cookie-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes cookie-modal-in {
          from {
            opacity: 0;
            transform: translate(-50%, -48%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        .cookie-btn {
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid transparent;
          white-space: nowrap;
          font-family: inherit;
        }

        .cookie-btn-accept {
          background-color: var(--green);
          color: var(--navy);
          border-color: var(--green);
        }
        .cookie-btn-accept:hover {
          background-color: transparent;
          color: var(--green);
        }
        .cookie-btn-accept:focus-visible {
          outline: 2px solid var(--green);
          outline-offset: 2px;
        }

        .cookie-btn-reject {
          background-color: transparent;
          color: var(--slate);
          border-color: var(--slate);
        }
        .cookie-btn-reject:hover {
          color: var(--lightest-slate);
          border-color: var(--lightest-slate);
        }
        .cookie-btn-reject:focus-visible {
          outline: 2px solid var(--slate);
          outline-offset: 2px;
        }

        .cookie-btn-manage {
          background-color: transparent;
          color: var(--green);
          border-color: var(--green);
        }
        .cookie-btn-manage:hover {
          background-color: var(--green-tint);
        }
        .cookie-btn-manage:focus-visible {
          outline: 2px solid var(--green);
          outline-offset: 2px;
        }

        .cookie-toggle-slider {
          border: 1px solid var(--slate);
        }
        .cookie-toggle input:focus-visible + .cookie-toggle-slider {
          outline: 2px solid var(--green);
          outline-offset: 2px;
        }

        @media (max-width: 640px) {
          .cookie-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}
