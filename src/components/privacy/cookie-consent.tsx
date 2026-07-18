"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import styles from "./cookie-consent.module.css";

const STORAGE_KEY = "tryon-cookie-consent-v1";
const OPEN_EVENT = "tryon:open-cookie-preferences";

export type CookiePreferences = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

type PreferenceDraft = Pick<CookiePreferences, "analytics" | "marketing">;

const defaultDraft: PreferenceDraft = { analytics: false, marketing: false };

function readStoredPreferences(): CookiePreferences | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
    if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") return null;
    return {
      essential: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

function persistPreferences(draft: PreferenceDraft) {
  const preferences: CookiePreferences = {
    essential: true,
    analytics: draft.analytics,
    marketing: draft.marketing,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  window.dispatchEvent(new CustomEvent("tryon:cookie-consent-changed", { detail: preferences }));
}

export function CookieConsent() {
  const titleId = useId();
  const descriptionId = useId();
  const [mounted, setMounted] = useState(false);
  const [hasDecision, setHasDecision] = useState(true);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [draft, setDraft] = useState<PreferenceDraft>(defaultDraft);

  useEffect(() => {
    const saved = readStoredPreferences();
    if (saved) {
      setDraft({ analytics: saved.analytics, marketing: saved.marketing });
      setHasDecision(true);
    } else {
      setHasDecision(false);
    }
    setMounted(true);

    const openPreferences = () => {
      const current = readStoredPreferences();
      if (current) setDraft({ analytics: current.analytics, marketing: current.marketing });
      setPreferencesOpen(true);
    };

    window.addEventListener(OPEN_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_EVENT, openPreferences);
  }, []);

  useEffect(() => {
    if (!preferencesOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreferencesOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [preferencesOpen]);

  if (!mounted) return null;

  const acceptAll = () => {
    const accepted = { analytics: true, marketing: true };
    setDraft(accepted);
    persistPreferences(accepted);
    setHasDecision(true);
    setPreferencesOpen(false);
  };

  const rejectOptional = () => {
    const rejected = { analytics: false, marketing: false };
    setDraft(rejected);
    persistPreferences(rejected);
    setHasDecision(true);
    setPreferencesOpen(false);
  };

  const saveSelection = () => {
    persistPreferences(draft);
    setHasDecision(true);
    setPreferencesOpen(false);
  };

  return (
    <>
      {!hasDecision && (
        <section className={styles.banner} aria-label="Preferencias de cookies">
          <div className={styles.bannerGlow} aria-hidden="true" />
          <div className={styles.bannerCopy}>
            <span className={styles.icon} aria-hidden="true">◌</span>
            <div>
              <strong>Tu privacidad, bajo tu control</strong>
              <p>
                Utilizamos cookies esenciales para operar el sitio. Las categorías opcionales solo se activan con tu permiso. Consulta nuestra{" "}
                <Link href="/cookies">Política de cookies</Link>.
              </p>
            </div>
          </div>
          <div className={styles.bannerActions}>
            <button className={styles.secondaryButton} type="button" onClick={() => setPreferencesOpen(true)}>Configurar</button>
            <button className={styles.ghostButton} type="button" onClick={rejectOptional}>Solo esenciales</button>
            <button className={styles.primaryButton} type="button" onClick={acceptAll}>Aceptar todas</button>
          </div>
        </section>
      )}

      {preferencesOpen && (
        <div className={styles.backdrop} role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setPreferencesOpen(false);
        }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}>
            <header className={styles.modalHeader}>
              <div>
                <span>Centro de privacidad</span>
                <h2 id={titleId}>Preferencias de cookies</h2>
              </div>
              <button className={styles.closeButton} type="button" aria-label="Cerrar preferencias" onClick={() => setPreferencesOpen(false)}>×</button>
            </header>

            <p className={styles.intro} id={descriptionId}>
              Elige qué categorías opcionales autorizas. Las cookies esenciales permanecen activas porque son necesarias para seguridad, navegación y funcionamiento básico.
            </p>

            <div className={styles.preferenceList}>
              <article className={styles.preferenceCard}>
                <div>
                  <span className={styles.categoryLabel}>Siempre activas</span>
                  <h3>Esenciales</h3>
                  <p>Permiten recordar tu consentimiento, proteger formularios y mantener funciones fundamentales del sitio.</p>
                </div>
                <span className={`${styles.switch} ${styles.switchLocked}`} aria-label="Cookies esenciales activadas"><i /></span>
              </article>

              <article className={styles.preferenceCard}>
                <div>
                  <span className={styles.categoryLabel}>Opcionales</span>
                  <h3>Analítica</h3>
                  <p>Ayudan a comprender el uso agregado del sitio para mejorar rendimiento, contenido y navegación.</p>
                </div>
                <button
                  type="button"
                  className={`${styles.switch} ${draft.analytics ? styles.switchEnabled : ""}`}
                  role="switch"
                  aria-checked={draft.analytics}
                  aria-label="Permitir cookies de analítica"
                  onClick={() => setDraft((current) => ({ ...current, analytics: !current.analytics }))}
                ><i /></button>
              </article>

              <article className={styles.preferenceCard}>
                <div>
                  <span className={styles.categoryLabel}>Opcionales</span>
                  <h3>Marketing</h3>
                  <p>Permiten medir campañas y personalizar comunicaciones promocionales cuando estas integraciones sean habilitadas.</p>
                </div>
                <button
                  type="button"
                  className={`${styles.switch} ${draft.marketing ? styles.switchEnabled : ""}`}
                  role="switch"
                  aria-checked={draft.marketing}
                  aria-label="Permitir cookies de marketing"
                  onClick={() => setDraft((current) => ({ ...current, marketing: !current.marketing }))}
                ><i /></button>
              </article>
            </div>

            <footer className={styles.modalFooter}>
              <div className={styles.legalLinks}>
                <Link href="/privacy">Privacidad</Link>
                <Link href="/cookies">Cookies</Link>
              </div>
              <div className={styles.modalActions}>
                <button className={styles.ghostButton} type="button" onClick={rejectOptional}>Rechazar opcionales</button>
                <button className={styles.primaryButton} type="button" onClick={saveSelection}>Guardar preferencias</button>
              </div>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}
