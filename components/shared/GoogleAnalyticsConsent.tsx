
"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const STORAGE_KEY = "aurum-cookie-consent";

export default function GoogleAnalyticsConsent() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const savedConsent = localStorage.getItem(STORAGE_KEY);

      if (!savedConsent) {
        setEnabled(false);
        return;
      }

      try {
        const preferences = JSON.parse(savedConsent);
        setEnabled(preferences.analytics === true);
      } catch {
        setEnabled(false);
      }
    };

    checkConsent();

    window.addEventListener("aurum-cookie-consent", checkConsent);

    return () => {
      window.removeEventListener("aurum-cookie-consent", checkConsent);
    };
  }, []);

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!enabled || !gaId) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
