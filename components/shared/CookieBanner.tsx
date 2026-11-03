
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LuCookie, LuSettings2, LuX } from "react-icons/lu";

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
};

const STORAGE_KEY = "aurum-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem(STORAGE_KEY);

    if (!savedConsent) {
      setVisible(true);
      return;
    }

    try {
      const preferences = JSON.parse(savedConsent) as CookiePreferences;
      setAnalytics(preferences.analytics === true);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setVisible(true);
    }
  }, []);

  const savePreferences = (analyticsEnabled: boolean) => {
    const preferences: CookiePreferences = {
      necessary: true,
      analytics: analyticsEnabled,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    setAnalytics(analyticsEnabled);
    setVisible(false);
    setShowSettings(false);

    window.dispatchEvent(
      new CustomEvent("aurum-cookie-consent", {
        detail: preferences,
      })
    );
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed bottom-5 left-5 z-[100] w-[calc(100%-2.5rem)] max-w-[310px] border border-border bg-white p-6 text-black shadow-2xl"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LuCookie className="size-6 text-primary" />
          <h2
            id="cookie-title"
            className="font-heading text-lg font-bold"
          >
            Preferencias de cookies
          </h2>
        </div>

        <button
          type="button"
          onClick={() => savePreferences(false)}
          aria-label="Rechazar cookies opcionales y cerrar"
          className="text-gray-500 transition-colors hover:text-black"
        >
          <LuX className="size-5" />
        </button>
      </div>

      <p className="mb-4 font-body text-sm leading-relaxed text-gray-600">
        Utilizamos cookies necesarias y analíticas para mejorar tu experiencia
        y conocer cómo se utiliza nuestro sitio web.
      </p>

      <div className="mb-5 flex flex-col gap-2 text-xs">
        <Link
          href="/informacion-legal/politica-de-cookies"
          className="font-semibold text-primary underline underline-offset-4"
        >
          Política de Cookies
        </Link>

        <Link
          href="/informacion-legal/politica-de-privacidad"
          className="font-semibold text-primary underline underline-offset-4"
        >
          Política de Privacidad
        </Link>
      </div>

      {showSettings && (
        <div className="mb-5 border-y border-gray-200 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-body text-sm font-semibold">
                Cookies necesarias
              </p>
              <p className="text-xs text-gray-500">
                Necesarias para el funcionamiento del sitio.
              </p>
            </div>
            <span className="text-xs font-semibold text-primary">
              Siempre activas
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <p className="font-body text-sm font-semibold">
                Cookies analíticas
              </p>
              <p className="text-xs text-gray-500">
                Nos ayudan a comprender el uso del sitio.
              </p>
            </div>

            <input
              type="checkbox"
              checked={analytics}
              onChange={(event) => setAnalytics(event.target.checked)}
              aria-label="Permitir cookies analíticas"
              className="size-4 accent-primary"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => savePreferences(true)}
          className="w-full bg-primary px-4 py-3 font-body text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          Aceptar todas
        </button>

        <button
          type="button"
          onClick={() => savePreferences(false)}
          className="w-full border border-primary px-4 py-3 font-body text-sm font-bold text-primary transition-colors hover:bg-gray-50"
        >
          Rechazar opcionales
        </button>

        <button
          type="button"
          onClick={() => {
            if (showSettings) {
              savePreferences(analytics);
            } else {
              setShowSettings(true);
            }
          }}
          className="flex items-center justify-center gap-2 py-2 font-body text-xs font-semibold text-gray-600 hover:text-primary"
        >
          <LuSettings2 className="size-4" />
          {showSettings ? "Guardar preferencias" : "Configurar preferencias"}
        </button>
      </div>
    </div>
  );
}
