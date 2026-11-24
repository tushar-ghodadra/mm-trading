import { useEffect, useRef } from "react";

const STEPS = [
  ["Talk to the desk", "Call or message us. We listen to your goals, your capital and how you trade today."],
  ["Risk profiling & KYC", "A short questionnaire and document check, so the plan we suggest genuinely suits you."],
  ["Choose your plan", "Pick equity, derivatives or both. Fees and terms are shared in writing before you pay."],
  ["Receive researched calls", "Calls arrive in real time with all levels, followed by updates until each one is closed."]
];

export default function Process() {
  const list = useRef(null);
  const fill = useRef(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const mark = window.innerHeight * 0.6;
      const r = list.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (mark - r.top) / r.height));
      fill.current.style.transform = `scaleY(${p})`;
      // Toggled on the DOM directly: these elements also carry the "is-in" class
      // added by useReveal, which a React className update would wipe out.
      list.current.querySelectorAll(".step").forEach((step) => {
        const b = step.firstElementChild.getBoundingClientRect();
        step.classList.toggle("is-active", b.top + b.height / 2 < mark + 4);
      });
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

  return (
    <section className="section section--alt" id="process">
      <div className="container process">
        <div className="process__head">
          <p className="eyebrow reveal">How it works</p>
          <h2 className="h2 reveal">From first hello to <span className="grad">first call</span>.</h2>
          <p className="lede reveal">Getting started takes four short steps. Most people are set up the same day.</p>
        </div>

        <ol className="timeline" ref={list}>
          <li className="timeline__line" role="presentation" aria-hidden="true"><i ref={fill} /></li>
          {STEPS.map(([title, text], i) => (
            <li className="step reveal" key={title}>
              <span className="step__no">{i + 1}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
