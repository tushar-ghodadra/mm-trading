import { useState } from "react";
import Icon from "./Icon.jsx";
import config, { emailLink, phoneLink, waLink, waProps } from "../config.js";

const DEFAULT_NOTE = { text: "We only use your details to reply to this enquiry.", kind: "" };

function ContactForm() {
  const [note, setNote] = useState(DEFAULT_NOTE);
  const [bad, setBad] = useState({}); // field name → true when invalid

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const invalid = {};
    Array.from(form.elements).forEach((f) => { if (f.name && !f.checkValidity()) invalid[f.name] = true; });
    setBad(invalid);
    if (Object.keys(invalid).length) {
      setNote({ text: "Please fill in your name, a valid phone number and what you are interested in.", kind: "is-err" });
      return;
    }

    const d = Object.fromEntries(new FormData(form));
    const text = [
      `New enquiry — ${config.brand}`,
      `Name: ${d.name}`,
      `Phone: ${d.phone}`,
      d.email && `Email: ${d.email}`,
      `Interested in: ${d.interest}`,
      d.message && `Message: ${d.message}`
    ].filter(Boolean).join("\n");

    let url = null;
    if (config.formTarget === "email" && config.email) {
      url = `mailto:${config.email}?subject=${encodeURIComponent(`Website enquiry from ${d.name}`)}&body=${encodeURIComponent(text)}`;
    } else if (config.whatsapp) {
      url = waLink(text);
    }
    if (!url) {
      setNote({ text: "Contact details are not set up yet. Please try again later.", kind: "is-err" });
      return;
    }
    window.open(url, "_blank", "noopener");
    setNote({ text: `Thanks, ${d.name.split(" ")[0]}. Your message is ready to send in the window that just opened.`, kind: "is-ok" });
    form.reset();
  };

  const clear = (e) => {
    const { name } = e.target;
    if (bad[name]) setBad((b) => ({ ...b, [name]: false }));
  };
  const field = (name) => `field${bad[name] ? " is-bad" : ""}`;

  return (
    <form className="form spot reveal" noValidate onSubmit={onSubmit} onInput={clear}>
      <h3>Send us a message</h3>
      <div className={field("name")}>
        <input type="text" id="f-name" name="name" placeholder=" " required autoComplete="name" />
        <label htmlFor="f-name">Your name</label>
      </div>
      <div className="form__row">
        <div className={field("phone")}>
          <input type="tel" id="f-phone" name="phone" placeholder=" " required autoComplete="tel" pattern="[0-9+\-\s]{8,16}" />
          <label htmlFor="f-phone">Phone number</label>
        </div>
        <div className={field("email")}>
          <input type="email" id="f-email" name="email" placeholder=" " autoComplete="email" />
          <label htmlFor="f-email">Email (optional)</label>
        </div>
      </div>
      <div className={field("interest")}>
        <select id="f-interest" name="interest" required defaultValue="">
          <option value="" disabled hidden />
          <option>Equity plans</option>
          <option>Derivatives plans</option>
          <option>Both / not sure yet</option>
        </select>
        <label htmlFor="f-interest">I'm interested in</label>
      </div>
      <div className="field">
        <textarea id="f-message" name="message" rows="4" placeholder=" " />
        <label htmlFor="f-message">Tell us about your trading goals</label>
      </div>
      <button className="btn btn--primary btn--block" type="submit">Send enquiry <Icon name="arrow" /></button>
      <p className={`form__note ${note.kind}`} role="status" aria-live="polite">{note.text}</p>
    </form>
  );
}

export default function Contact() {
  const socials = Object.entries(config.social || {}).filter(([, url]) => url);

  return (
    <section className="section" id="contact">
      <div className="container contact">
        <div className="contact__info">
          <p className="eyebrow reveal">Contact</p>
          <h2 className="h2 reveal">Let's talk <span className="grad">markets</span>.</h2>
          <p className="lede reveal">Tell us a little about how you trade. We usually reply within a few working hours.</p>

          <ul className="contact__list reveal">
            {config.phone && (
              <li><span className="contact__ico"><Icon name="phone" /></span><div><small>Phone</small><a href={phoneLink()}>{config.phoneDisplay}</a></div></li>
            )}
            {config.whatsapp && (
              <li><span className="contact__ico"><Icon name="whatsapp" /></span><div><small>WhatsApp</small><a {...waProps()}>Message the desk</a></div></li>
            )}
            {config.email && (
              <li><span className="contact__ico"><Icon name="mail" /></span><div><small>Email</small><a href={emailLink()}>{config.email}</a></div></li>
            )}
            {config.address && (
              <li><span className="contact__ico"><Icon name="pin" /></span><div><small>Office</small><span>{config.address}</span></div></li>
            )}
            {config.hours && (
              <li><span className="contact__ico"><Icon name="clock" /></span><div><small>Hours</small><span>{config.hours}</span></div></li>
            )}
          </ul>

          <div className="socials reveal" aria-label="Social media">
            {socials.map(([name, url]) => (
              <a
                key={name}
                href={url}
                aria-label={name[0].toUpperCase() + name.slice(1)}
                {...(url !== "#" ? { target: "_blank", rel: "noopener" } : {})}
              >
                <Icon name={name} />
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
