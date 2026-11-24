import { useEffect, useRef } from "react";
import { reduceMotion } from "../hooks/motion.js";

const STEP = 26; // px between candles

/** Decorative, endlessly scrolling candlestick stream. Not market data. */
export default function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv || reduceMotion) return;
    const ctx = cv.getContext("2d");
    let W = 0, H = 0, candles = [], price = 100, offset = 0, last = 0, raf = 0, visible = true;

    const next = () => {
      const o = price;
      const c = o + (Math.random() - 0.46) * 5;
      const h = Math.max(o, c) + Math.random() * 2.4;
      const l = Math.min(o, c) - Math.random() * 2.4;
      price = c;
      return { o, h, l, c };
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const need = Math.ceil(W / STEP) + 3;
      while (candles.length < need) candles.push(next());
      if (candles.length > need) candles = candles.slice(candles.length - need);
    };

    const draw = (t) => {
      raf = 0;
      if (!visible) { last = 0; return; }
      const dt = last ? Math.min(50, t - last) : 16;
      last = t;
      offset += dt * 0.022;
      if (offset >= STEP) { offset -= STEP; candles.shift(); candles.push(next()); }

      let lo = Infinity, hi = -Infinity;
      candles.forEach((c) => { if (c.l < lo) lo = c.l; if (c.h > hi) hi = c.h; });
      const pad = (hi - lo) * 0.18; lo -= pad; hi += pad;
      const y = (v) => H - ((v - lo) / (hi - lo)) * H;

      ctx.clearRect(0, 0, W, H);
      const pts = [];
      candles.forEach((c, i) => {
        const x = i * STEP - offset;
        ctx.strokeStyle = ctx.fillStyle = c.c >= c.o ? "rgba(61,255,162,.75)" : "rgba(255,93,115,.6)";
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(x, y(c.h)); ctx.lineTo(x, y(c.l)); ctx.stroke();
        ctx.fillRect(x - 6, y(Math.max(c.o, c.c)), 12, Math.max(2, Math.abs(y(c.o) - y(c.c))));
        pts.push([x, y((c.o + c.c + c.h + c.l) / 4)]);
      });

      ctx.save();
      ctx.shadowColor = "#3dffa2"; ctx.shadowBlur = 18;
      ctx.strokeStyle = "rgba(168,255,214,.85)"; ctx.lineWidth = 2;
      ctx.beginPath();
      pts.forEach((p, i) => {
        if (!i) { ctx.moveTo(p[0], p[1]); return; }
        const q = pts[i - 1], mx = (q[0] + p[0]) / 2;
        ctx.bezierCurveTo(mx, q[1], mx, p[1], p[0], p[1]);
      });
      ctx.stroke();
      ctx.restore();
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    // Pause while the hero is off screen.
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(draw);
    });
    io.observe(cv);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="hero__canvas" ref={ref} aria-hidden="true" />;
}
