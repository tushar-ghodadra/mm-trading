import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Icon from "./Icon.jsx";
import plans from "../data/plans.js";
import { waProps } from "../config.js";

const TABS = [
  ["all", "All plans"],
  ["equity", "Equity"],
  ["derivatives", "Derivatives"]
];

function Tabs({ value, onChange }) {
  const refs = useRef({});
  const [pill, setPill] = useState({ left: 0, width: 0 });

  const measure = () => {
    const el = refs.current[value];
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
  };
  useLayoutEffect(measure, [value]);
  useEffect(() => {
    let alive = true;
    const onResize = () => alive && measure();
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize); // widths change once web fonts load
    return () => { alive = false; window.removeEventListener("resize", onResize); };
  }, [value]);

  return (
    <div className="tabs reveal" role="tablist" aria-label="Plan segment">
      {TABS.map(([id, label]) => (
        <button
          key={id}
          ref={(el) => { refs.current[id] = el; }}
          className={`tab${value === id ? " is-active" : ""}`}
          role="tab"
          aria-selected={value === id}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
      <span className="tabs__pill" aria-hidden="true" style={{ width: pill.width, transform: `translateX(${pill.left}px)` }} />
    </div>
  );
}

function PlanCard({ plan, index }) {
  const elite = plan.tier === "Elite";
  return (
    <article className={`plan spot tilt${elite ? " plan--elite" : ""}`} style={{ "--n": index }}>
      <div className="plan__top">
        <span className="plan__seg">{plan.seg === "equity" ? "Equity" : "Derivatives"}</span>
        <span className="plan__tier">{plan.tier}</span>
      </div>
      <h3>{plan.name}</h3>
      <p className="plan__desc">{plan.desc}</p>
      <ul>
        {plan.points.map((t) => <li key={t}><Icon name="check" />{t}</li>)}
      </ul>
      <div className="plan__cta">
        <span className="plan__price">Fees on request</span>
        <a className="plan__btn" {...waProps(`Hi MM Trading, I would like details of the ${plan.name} plan.`)}>
          Enquire <Icon name="arrow" />
        </a>
      </div>
    </article>
  );
}

export default function Plans({ filter, onFilter }) {
  const list = plans.filter((p) => filter === "all" || p.seg === filter);

  return (
    <section className="section section--alt" id="plans">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">Research plans</p>
          <h2 className="h2 reveal">One desk. <span className="grad">Nine plans.</span> Pick your style.</h2>
          <p className="lede reveal">From cash-segment equity to index options, choose the plan that matches your capital, your time horizon and your appetite for risk.</p>
        </div>

        <Tabs value={filter} onChange={onFilter} />

        {/* key restarts the card entrance animation on every tab change */}
        <div className="plans" key={filter}>
          {list.map((p, i) => <PlanCard plan={p} index={i} key={p.name} />)}
        </div>

        <div className="plans__help reveal">
          <div>
            <h3>Not sure which plan fits?</h3>
            <p>Tell us your capital, experience and goals. We will point you to the right plan, with no pressure to sign up.</p>
          </div>
          <a className="btn btn--primary magnetic" {...waProps()}><Icon name="whatsapp" /> Ask the desk</a>
        </div>
      </div>
    </section>
  );
}
