import { useEffect } from "react";
import { reduceMotion, finePointer } from "./motion.js";

/**
 * Pointer-driven effects, handled with one delegated listener so they also
 * work on elements React renders later (e.g. plan cards after a tab change):
 *   .spot      spotlight that follows the cursor inside a card
 *   .tilt      3D tilt
 *   .magnetic  button that leans towards the cursor
 */
export default function usePointerEffects() {
  useEffect(() => {
    let active = null; // element currently transformed by tilt / magnetic

    const release = () => {
      if (active) { active.style.transform = ""; active = null; }
    };

    const onMove = (e) => {
      const t = e.target instanceof Element ? e.target : null;
      if (!t) return;

      const spot = t.closest(".spot");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      if (!finePointer || reduceMotion) return;
      document.body.classList.add("has-pointer");

      const el = t.closest(".tilt, .magnetic");
      if (el !== active) release();
      if (!el) return;
      active = el;
      const r = el.getBoundingClientRect();
      if (el.classList.contains("tilt")) {
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${-py * 9}deg) rotateY(${px * 11}deg) translateZ(6px)`;
      } else {
        const dx = (e.clientX - r.left - r.width / 2) * 0.22;
        const dy = (e.clientY - r.top - r.height / 2) * 0.3;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", release);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", release);
      release();
    };
  }, []);
}
