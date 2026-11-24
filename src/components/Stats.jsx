import { useEffect, useRef, useState } from "react";
import { reduceMotion } from "../hooks/motion.js";

const STATS = [
  { value: 9, text: "research plans across cash and derivatives" },
  { value: 4, text: "instruments covered: equity, futures, stock & index options" },
  { value: 3, text: "levels on every call: entry, target, stop-loss" },
  { value: 375, unit: "min", text: "of live desk coverage each trading session" }
];

/** Counts up from 0 the first time it scrolls into view. */
function CountUp({ to, duration = 1600 }) {
  const ref = useRef(null);
  const [n, setN] = useState(reduceMotion ? to : 0);

  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      let t0 = 0;
      const frame = (t) => {
        if (!t0) t0 = t;
        const p = Math.min(1, (t - t0) / duration);
        setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
        if (p < 1) raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);

  return <span ref={ref}>{n}</span>;
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats__grid">
        {STATS.map((s) => (
          <div className="stat reveal" key={s.text}>
            <strong><CountUp to={s.value} />{s.unit && <small>{s.unit}</small>}</strong>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
