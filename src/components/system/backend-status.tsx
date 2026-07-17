"use client";

import { useCallback, useEffect, useState } from "react";
import { getBackendHealth } from "@/lib/api/health";

type Status = "checking" | "online" | "offline";

export function BackendStatus() {
  const [status, setStatus] = useState<Status>("checking");

  const checkHealth = useCallback(async () => {
    setStatus("checking");
    try {
      await getBackendHealth();
      setStatus("online");
    } catch {
      setStatus("offline");
    }
  }, []);

  useEffect(() => {
    void checkHealth();
  }, [checkHealth]);

  const label =
    status === "checking"
      ? "Verificando API"
      : status === "online"
        ? "Backend conectado"
        : "Backend sin conexión";

  return (
    <button
      className={`backend-status backend-status--${status}`}
      type="button"
      onClick={() => void checkHealth()}
      aria-live="polite"
      title="Haz clic para volver a comprobar la conexión"
    >
      <span className="backend-status__dot" aria-hidden="true" />
      {label}
    </button>
  );
}
