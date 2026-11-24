import { useEffect, useState } from "react";
import Icon, { Logo } from "./Icon.jsx";
import { waProps } from "../config.js";

const LINKS = [
  ["about", "About"],
  ["plans", "Plans"],
  ["method", "Method"],
  ["process", "How it works"],
  ["faq", "FAQ"],
  ["contact", "Contact"]
];

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [current, setCurrent] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setStuck(window.scrollY > 20);
      let now = null;
      LINKS.forEach(([id]) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) now = id;
      });
      setCurrent(now);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock page scroll while open, close on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav${stuck ? " is-stuck" : ""}`}>
      <div className="container nav__inner">
        <Logo />
        <nav className={`nav__links${open ? " is-open" : ""}`} id="navLinks" aria-label="Primary">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={current === id ? "is-current" : undefined} onClick={close}>
              {label}
            </a>
          ))}
          <a className="btn btn--primary nav__cta-mobile" {...waProps()} onClick={close}>Talk on WhatsApp</a>
        </nav>
        <a className="btn btn--primary btn--sm nav__cta" {...waProps()}>
          <Icon name="whatsapp" /> Talk to the desk
        </a>
        <button
          className="nav__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span />
        </button>
      </div>
    </header>
  );
}
