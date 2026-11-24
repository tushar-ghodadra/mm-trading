/* Inline icon set. Usage: <Icon name="arrow" /> or <Icon name="target" large /> */
const F = { fill: "currentColor", stroke: "none" }; // for solid shapes

const ICONS = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" strokeWidth="2.2" />,
  plus: <path d="M12 5v14M5 12h14" strokeWidth="2" />,
  phone: <path d="M6.6 3h3l1.5 4.5-2 1.5a12 12 0 006 6l1.5-2L21 14.4v3A2.6 2.6 0 0118.2 20 15.4 15.4 0 014 5.8 2.6 2.6 0 016.6 3z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M4 7.5l8 6 8-6" /></>,
  pin: <><path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5.5l3.5 2" /></>,
  whatsapp: <><path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.6-1.2A9 9 0 1012 3z" /><path {...F} d="M8.8 8.3c.3-.6.6-.6.9-.6h.6l.9 2.1-.7.9a5 5 0 002.8 2.8l.9-.7 2.1.9v.6c0 .3 0 .6-.6.9a2.6 2.6 0 01-2.4.2 9.300 9.300 0 01-4.700-4.700 2.600 2.600 0 01.200-2.400z" /></>,
  instagram: <><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle {...F} cx="16.6" cy="7.4" r="1.1" /></>,
  telegram: <><path d="M20.5 4.5L3.5 11l5.5 2 2 5.5 3-4 4.5 3.5 2-13.5z" /><path d="M9 13l6.5-5" /></>,
  youtube: <><rect x="3" y="6" width="18" height="12" rx="4" /><path {...F} d="M10.5 9.5l4 2.5-4 2.5z" /></>,
  x: <path d="M5 5l14 14M19 5L5 19" strokeWidth="2" />,
  linkedin: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8.5 11v5M8.5 8v.1M12 16v-3a2 2 0 014 0v3M12 11v5" /></>,
  facebook: <><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M13 20v-7h2.5M13 13h-2.5M13 13v-2.500a2 2 0 012-2h1" /></>,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4" /><circle {...F} cx="12" cy="12" r="1" /></>,
  shield: <><path d="M12 3l7 3v5.500c0 4.300-2.900 7.600-7 9.500-4.100-1.900-7-5.200-7-9.500V6l7-3z" /><path d="M9 12l2.200 2.200L15 10" /></>,
  pulse: <path d="M3 12h4l2.500-6 4 12 2.500-6h5" />,
  layers: <path d="M12 4l8 4-8 4-8-4 8-4zM4 12l8 4 8-4M4 16l8 4 8-4" />,
  chat: <path d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2h-7l-5 4v-4H5a2 2 0 01-2-2V7a2 2 0 012-2z" />,
  book: <path d="M4 4.500A2.500 2.500 0 016.500 2H20v15H6.500A2.500 2.500 0 004 19.500v-15zM4 19.500A2.500 2.500 0 006.500 22H20" />
};

export default function Icon({ name, large = false, className = "" }) {
  return (
    <svg
      className={`icon${large ? " icon--lg" : ""}${className ? ` ${className}` : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

export function Logo({ href = "#top" }) {
  return (
    <a href={href} className="logo" aria-label="MM Trading home">
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 64 64">
          <path d="M10 46V20l10 14 10-14v26M34 46V20l10 14 10-14v26" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="logo__text">MM <em>Trading</em></span>
    </a>
  );
}
