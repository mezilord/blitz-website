"use client";

import { useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Cal?: any;
  }
}

const NAMESPACE = "30min";
const CAL_LINK = "blitz-creative/30min";
const ELEMENT_ID = "my-cal-inline-30min";

// Cal.com inline booking embed (official loader snippet, run on the client).
export function CalEmbed() {
  useEffect(() => {
    const el = document.getElementById(ELEMENT_ID);
    if (!el || el.childElementCount > 0) return;

    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...args: any[]) {
          const cal = C.Cal;
          const ar = args;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function (...a: any[]) {
              p(api, a);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = window.Cal;
    Cal("init", NAMESPACE, { origin: "https://app.cal.com" });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;

    Cal.ns[NAMESPACE]("inline", {
      elementOrSelector: `#${ELEMENT_ID}`,
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: CAL_LINK,
    });

    // Styled to match the site: same off-white, warm greys, hairline
    // borders, near-square corners, navy for the selected date.
    Cal.ns[NAMESPACE]("ui", {
      hideEventTypeDetails: true,
      layout: "month_view",
      theme: "light",
      cssVarsPerTheme: {
        light: {
          "cal-brand": "#062A3A",
          "cal-brand-emphasis": "#0B3D52",
          "cal-brand-text": "#FFFFFF",
          "cal-brand-accent": "#FFFFFF",
          "cal-text": "#3A332D",
          "cal-text-emphasis": "#080503",
          "cal-text-subtle": "#5E534A",
          "cal-text-muted": "#A8A29E",
          "cal-bg": "#FAFAF9",
          "cal-bg-emphasis": "#ECEBE7",
          "cal-bg-subtle": "#F3F2EE",
          "cal-bg-muted": "#FAFAF9",
          "cal-border": "#DAD7D0",
          "cal-border-emphasis": "#062A3A",
          "cal-border-subtle": "#E7E4DD",
          "cal-border-muted": "#ECEBE7",
          "cal-border-booker": "transparent",
          "cal-border-booker-width": "0px",
          radius: "2px",
        },
      },
    });
  }, []);

  return <div id={ELEMENT_ID} className="w-full h-full overflow-auto" />;
}
