import { useEffect, useRef, useState } from "react";
import Icon from "./Icon.jsx";
import { waProps } from "../config.js";
import { reduceMotion, finePointer } from "../hooks/motion.js";

/** Scroll progress bar, cursor glow, floating WhatsApp button and back-to-top. */
export default function ScrollChrome() {
  const bar = useRef(null);
  const glow = useRef(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      setShowTop(window.scrollY > window.innerHeight * 0.8);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!finePointer || reduceMotion) return;
    let gx = 0, gy = 0, tx = 0, ty = 0, raf = 0;
    const loop = () => {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.current.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      raf = Math.abs(tx - gx) + Math.abs(ty - gy) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div className="progress" ref={bar} aria-hidden="true" />
      <div className="cursor-glow" ref={glow} aria-hidden="true" />
      <a className="fab" {...waProps()} aria-label="Chat on WhatsApp"><Icon name="whatsapp" /></a>
      <button
        className={`totop${showTop ? " is-on" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
      >
        <Icon name="arrow" />
      </button>
    </>
  );
}
