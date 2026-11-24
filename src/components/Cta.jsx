import Icon from "./Icon.jsx";
import config, { phoneLink, waProps } from "../config.js";

export default function Cta() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta__box reveal">
          <div className="cta__rings" aria-hidden="true"><i /><i /><i /></div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="h2">Your next trade deserves <span className="grad">better research</span>.</h2>
          <p className="lede">Speak with the desk about your goals. No commitment, no pressure.</p>
          <div className="hero__actions">
            <a className="btn btn--primary magnetic" {...waProps()}><Icon name="whatsapp" /> Chat on WhatsApp</a>
            <a className="btn btn--ghost magnetic" href={phoneLink()}><Icon name="phone" /> {config.phoneDisplay || "Call us"}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
