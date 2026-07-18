"use client";

import { openCookiePreferences } from "./cookie-consent";
import styles from "./cookie-preferences-link.module.css";

export function CookiePreferencesLink() {
  return (
    <button className={styles.button} type="button" onClick={openCookiePreferences}>
      Configurar cookies
    </button>
  );
}
