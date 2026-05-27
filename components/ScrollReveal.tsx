"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveals elements tagged `.reveal-scroll` as they scroll into view.
 * Adds `js-ready` to <html> so the hidden state only applies when JS runs —
 * if the client bundle never loads, content stays visible (no blank sections).
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-ready");

    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-scroll:not(.is-visible)"),
    );
    if (els.length === 0) return;

    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
