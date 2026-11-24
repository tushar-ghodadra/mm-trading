import { Fragment } from "react";

const ITEMS = ["Cash Equity", "BTST", "Swing Trades", "Positional", "Stock Futures", "Stock Options", "Index Futures", "Index Options"];

export default function Marquee() {
  // Rendered twice so the loop is seamless.
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[...ITEMS, ...ITEMS].map((t, i) => (
          <Fragment key={i}><span>{t}</span><i>✦</i></Fragment>
        ))}
      </div>
    </div>
  );
}
