import { Logo } from "./Icon.jsx";
import config, { emailLink, phoneLink, waProps } from "../config.js";

export default function Footer({ onPlanFilter }) {
  const registration = config.sebiRegistration
    ? [
        config.registeredName,
        `SEBI Registration No. ${config.sebiRegistration}`,
        config.complianceOfficer && `Compliance officer: ${config.complianceOfficer}`
      ].filter(Boolean).join(" · ")
    : null;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p>Research-led calls for Indian equity and derivatives traders.</p>
          </div>
          <nav className="footer__col" aria-label="Company">
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#method">Method</a>
            <a href="#process">How it works</a>
            <a href="#faq">FAQ</a>
          </nav>
          <nav className="footer__col" aria-label="Plans">
            <h4>Plans</h4>
            <a href="#plans" onClick={() => onPlanFilter("equity")}>Equity</a>
            <a href="#plans" onClick={() => onPlanFilter("derivatives")}>Derivatives</a>
            <a href="#contact">Get a recommendation</a>
          </nav>
          <div className="footer__col">
            <h4>Reach us</h4>
            {config.phone && <a href={phoneLink()}>{config.phoneDisplay}</a>}
            {config.email && <a href={emailLink()}>{config.email}</a>}
            {config.whatsapp && <a {...waProps()}>WhatsApp</a>}
          </div>
        </div>

        <div className="footer__legal">
          {registration && <p>{registration}</p>}
          <p>
            <strong>Risk disclosure:</strong> Investments in the securities market are subject to market risks.
            Read all related documents carefully before investing. Research calls are opinions, not assurances;
            past performance does not indicate future results, and you may lose part or all of your capital.
            MM Trading does not offer guaranteed or assured-return products, does not accept funds for trading
            and does not operate client accounts.
          </p>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} MM Trading. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
