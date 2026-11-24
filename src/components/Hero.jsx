import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";
import HeroCanvas from "./HeroCanvas.jsx";
import { phoneLink } from "../config.js";
import { reduceMotion } from "../hooks/motion.js";

const WORDS = ["equity.", "futures.", "options.", "every trade."];

function Rotor() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState(""); // "" | "out" | "in"

  useEffect(() => {
    if (reduceMotion) return;
    let swap;
    const tick = setInterval(() => {
      setPhase("out");
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setPhase("in");
      }, 380);
    }, 2600);
    return () => { clearInterval(tick); clearTimeout(swap); };
  }, []);

  return (
    <span className="rotor">
      <b className={phase || undefined}>{WORDS[index]}</b>
    </span>
  );
}

function CallCard() {
  const line = "M0 70 L25 62 L50 66 L75 50 L100 55 L125 40 L150 46 L175 30 L200 36 L225 22 L250 27 L275 12 L300 16";
  return (
    <aside className="callcard tilt" aria-label="Example of how a research call is formatted">
      <div className="callcard__glow" aria-hidden="true" />
      <header className="callcard__head">
        <span className="chip chip--up">BUY</span>
        <span className="callcard__seg">Equity · Swing</span>
        <span className="callcard__tag">Sample format</span>
      </header>
      <h3 className="callcard__sym">STOCK&nbsp;NAME <small>NSE</small></h3>
      <svg className="callcard__spark" viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#3dffa2" stopOpacity=".35" />
            <stop offset="1" stopColor="#3dffa2" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="spark__fill" d={`${line} L300 90 L0 90Z`} fill="url(#sparkFill)" />
        <path className="spark__line" d={line} fill="none" stroke="#3dffa2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <dl className="callcard__levels">
        <div><dt>Entry</dt><dd>Zone</dd></div>
        <div><dt>Target</dt><dd className="up">T1 · T2</dd></div>
        <div><dt>Stop-loss</dt><dd className="down">Fixed</dd></div>
      </dl>
      <footer className="callcard__foot"><span className="live-dot" /> Follow-up until the call is closed</footer>
    </aside>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="hero__grid" aria-hidden="true" />
      <HeroCanvas />

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow"><span className="live-dot" /> Research desk · Indian equity &amp; F&amp;O</p>
          <h1 className="hero__title">
            <span className="line"><span>Trade</span> <span>with</span> <span>a</span> <span>plan,</span></span>
            <span className="line"><span>not</span> <span>a</span> <span>hunch</span> <span>—</span></span>
            <span className="line"><span>in</span> <Rotor /></span>
          </h1>
          <p className="hero__lede">
            MM Trading turns market noise into clear, researched calls. Every idea ships with
            an entry, a target and a stop-loss, so you always know your risk before you take the trade.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary magnetic" href="#plans">Explore the plans <Icon name="arrow" /></a>
            <a className="btn btn--ghost magnetic" href={phoneLink()}><Icon name="phone" /> Call the desk</a>
          </div>
          <ul className="hero__points">
            <li><Icon name="check" /> Entry · Target · Stop-loss on every call</li>
            <li><Icon name="check" /> Live during market hours</li>
          </ul>
        </div>
        <CallCard />
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to content"><span /></a>
    </section>
  );
}
