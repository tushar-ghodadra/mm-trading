import Icon from "./Icon.jsx";

export default function Method() {
  return (
    <section className="section" id="method">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">Why traders choose us</p>
          <h2 className="h2 reveal">Research you can <span className="grad">act on</span>.</h2>
        </div>

        <div className="bento">
          <article className="bento__item bento__item--wide spot reveal">
            <Icon name="target" large />
            <h3>Every call is complete</h3>
            <p>No vague "buy this" messages. Each idea carries an entry zone, targets and a stop-loss, so the trade is defined before you place it.</p>
            <div className="levels" aria-hidden="true">
              <span className="levels__bar levels__bar--t">Target</span>
              <span className="levels__bar levels__bar--e">Entry</span>
              <span className="levels__bar levels__bar--s">Stop-loss</span>
              <i className="levels__dot" />
            </div>
          </article>

          <article className="bento__item spot reveal">
            <Icon name="shield" large />
            <h3>Risk comes first</h3>
            <p>Position sizing and stop-loss discipline sit at the centre of every recommendation.</p>
          </article>

          <article className="bento__item spot reveal">
            <Icon name="pulse" large />
            <h3>Live follow-ups</h3>
            <p>Trail, book partial, or exit: we update each open call until it is closed.</p>
          </article>

          <article className="bento__item spot reveal">
            <Icon name="layers" large />
            <h3>Technical + fundamental</h3>
            <p>Chart structure tells us when. The business behind the ticker tells us why.</p>
          </article>

          <article className="bento__item spot reveal">
            <Icon name="chat" large />
            <h3>Real people on the desk</h3>
            <p>Reach an analyst by call or WhatsApp throughout market hours.</p>
          </article>

          <article className="bento__item bento__item--wide spot reveal">
            <Icon name="book" large />
            <h3>Transparent by default</h3>
            <p>We tell you plainly that markets carry risk and that no research can promise a return. What we can promise is the work behind every call.</p>
            <div className="bars" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => <i key={i} />)}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
