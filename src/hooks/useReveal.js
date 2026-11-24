import { useEffect } from "react";
import { reduceMotion } from "./motion.js";

/**
 * Fades in every element with the "reveal" class as it scrolls into view.
 * Elements entering together are staggered.
 */
export default function useReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll(".reveal:not(.is-in)"));
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const timers = [];
    const io = new IntersectionObserver(
      (entries) => {
        let shown = 0;
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          el.style.transitionDelay = `${shown++ * 90}ms`;
          el.classList.add("is-in");
          timers.push(setTimeout(() => { el.style.transitionDelay = ""; }, 1400));
          io.unobserve(el);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);
}
