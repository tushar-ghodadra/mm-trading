import { useState } from "react";
import Icon from "./Icon.jsx";

const QA = [
  ["What exactly does MM Trading provide?",
    "Research-based trading and investment ideas for Indian equity and derivatives markets. Each idea includes an entry level, targets and a stop-loss, plus follow-up messages until it is closed."],
  ["Do you guarantee profits or fixed returns?",
    "No. Nobody can honestly guarantee returns in the securities market. Our calls are research opinions, and every trade carries the risk of loss. We focus on a sound process and strict risk control."],
  ["Do you trade on my behalf or handle my money?",
    "No. We never ask for your demat login, never take custody of funds and never place trades for you. You stay in full control of your own account."],
  ["How will I receive the calls?",
    "Calls and follow-ups are sent in real time during market hours through the channel confirmed at onboarding, so you can act quickly."],
  ["How much capital do I need to start?",
    "It depends on the segment. Cash equity plans suit smaller accounts, while futures and option-writing ideas need more margin. Tell us your capital and we will suggest a plan that fits."],
  ["Which plan is right for a beginner?",
    "Most newer traders start with a cash equity plan, where there is no leverage and no expiry pressure. Derivatives plans are better once you are comfortable with margin and volatility."]
];

export default function Faq() {
  const [open, setOpen] = useState(0); // index of the open question, or -1

  return (
    <section className="section" id="faq">
      <div className="container faq">
        <div className="faq__head">
          <p className="eyebrow reveal">Questions &amp; answers</p>
          <h2 className="h2 reveal">Good questions, <span className="grad">straight answers</span>.</h2>
          <p className="lede reveal">Something else on your mind? The desk is one message away.</p>
          <a className="btn btn--ghost reveal" href="#contact">Ask us anything <Icon name="arrow" /></a>
        </div>

        <div className="accordion reveal">
          {QA.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div className={`qa${isOpen ? " is-open" : ""}`} key={q}>
                <h3 className="qa__h">
                  <button
                    className="qa__q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {q}
                    <Icon name="plus" />
                  </button>
                </h3>
                <div className="qa__body" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} inert={isOpen ? undefined : ""}>
                  <div><p>{a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
