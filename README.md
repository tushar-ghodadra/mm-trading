# MM Trading website

A single-page marketing site built with React 18 and Vite.

## Run it

```bash
cd ~/dev/mm-trading
npm install      # first time only
npm run dev      # development server with hot reload, http://localhost:5173
```

Other commands:

```bash
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Project layout

```
index.html              page shell, fonts, meta tags
src/
  main.jsx              React entry point
  App.jsx               page composition (section order)
  config.js             contact details, regulatory details: ALL PLACEHOLDERS
  styles.css            design tokens (colours, fonts) at the top, then each section
  data/plans.js         the nine research plans
  components/           one file per section (Hero, Plans, Faq, Contact, ...)
    Icon.jsx            inline icon set and the logo
    ScrollChrome.jsx    progress bar, cursor glow, WhatsApp and back-to-top buttons
  hooks/
    useReveal.js        fade-in on scroll for any element with class "reveal"
    usePointerEffects.js  spotlight (.spot), 3D tilt (.tilt), magnetic buttons (.magnetic)
    motion.js           reduced-motion and pointer-type checks
```

## Common edits

| To change | Edit |
| --- | --- |
| Phone, WhatsApp, email, hours | `src/config.js` |
| Plans, their descriptions and bullet points | `src/data/plans.js` |
| Colours and fonts | the `:root` block at the top of `src/styles.css` |
| Copy in a section | that section's file in `src/components/` |
| FAQ questions | the `QA` array in `src/components/Faq.jsx` |

## Before going live

1. Replace every value in `src/config.js`.
2. Fill in the regulatory details in `src/config.js` only if they are genuine. The footer line stays hidden while they are empty.
3. Point the footer links (Terms, Privacy, Disclaimer, Refund policy) to real pages.
4. Add real fees to the plan cards if they should be shown; cards currently say "Fees on request".

## Contact form

There is no backend. Submitting the form opens WhatsApp (or an email draft, if `formTarget` is `"email"`) with the enquiry filled in. To store enquiries, connect the form to a backend or a form service.

## Hosting

Run `npm run build` and upload the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, cPanel). Asset paths are relative, so it also works from a sub-folder.
