import Icon from "./Icon.jsx";

const PILLARS = [
  ["Our mission", "Make quality market research accessible, so retail traders can take decisions with the same rigour as a professional desk."],
  ["Our vision", "To be the research partner traders trust most, earned one transparent, well-reasoned call at a time."],
  ["Our promise", "Calculated risk, clear communication and complete honesty about what research can and cannot do."]
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about">
        <div className="about__lead">
          <p className="eyebrow reveal">About MM Trading</p>
          <h2 className="h2 reveal">A research desk built around <span className="grad">discipline</span>, not predictions.</h2>
          <p className="lede reveal">
            Markets reward process. We study price, volume and the underlying business before a single
            idea goes out, and we size every call around the risk it carries. No noise, no tip-chasing,
            just research you can act on with clarity.
          </p>
          <a className="link-arrow reveal" href="#method">See how we research <Icon name="arrow" /></a>
        </div>

        <div className="about__cards">
          {PILLARS.map(([title, text], i) => (
            <article className="pillar spot reveal" key={title}>
              <span className="pillar__no">{String(i + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
