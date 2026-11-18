"use client";

import { useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

const NAMESPACE = "30min";
export const CAL_LINK = "blitz-creative/30min";

/**
 * Cal.com floating "book a call" button (bottom-right) that opens the
 * booking calendar in a popup. Any element with
 * data-cal-namespace="30min" data-cal-link="blitz-creative/30min"
 * also opens the same popup.
 */
export function CalFloatingButton({ floating = true }: { floating?: boolean }) {
  // Only show the floating button once the page's own
  // "Book Free Discovery Call" button has scrolled out of view.
  useEffect(() => {
    if (!floating) return;
    const target = document.getElementById("discovery-cta");
    const body = document.body;
    if (!target) return;
    body.classList.add("cal-fab-hidden");
    const observer = new IntersectionObserver(([entry]) => {
      body.classList.toggle("cal-fab-hidden", entry.isIntersecting);
    });
    observer.observe(target);
    return () => {
      observer.disconnect();
      body.classList.remove("cal-fab-hidden");
    };
  }, [floating]);

  useEffect(() => {
    const w = window as any;
    if (w.__blitzCalFloating) return;
    w.__blitzCalFloating = true;

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

    const Cal = w.Cal;
    Cal("init", NAMESPACE, { origin: "https://app.cal.com" });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;

    if (floating) Cal.ns[NAMESPACE]("floatingButton", {
      calLink: CAL_LINK,
      config: {
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
        theme: "light",
      },
      buttonText: "Book a free call",
      buttonColor: "#062A3A",
      buttonTextColor: "#FFFFFF",
    });
    Cal.ns[NAMESPACE]("ui", {
      theme: "light",
      hideEventTypeDetails: false,
      layout: "month_view",
      cssVarsPerTheme: { light: { "cal-brand": "#062A3A" } },
    });
  }, [floating]);

  return null;
}
