/*
 * MM Trading — site settings.
 * Everything below is a PLACEHOLDER. Replace with the real details before launch.
 * Leave a value as "" to hide that item on the site.
 */
const config = {
  brand: "MM Trading",

  // Contact
  phone: "+919712193051",            // digits used for the tel: link
  phoneDisplay: "+91 97121 93051",   // how the number is shown
  whatsapp: "919712193051",          // country code + number, no "+" or spaces
  whatsappMessage: "Hi MM Trading, I would like to know more about your research plans.",
  email: "mavdiamehul@gmail.com",
  hours: "Mon – Fri · 9:00 AM – 6:00 PM IST",

  // Regulatory details. Shown in the footer only when filled in.
  // Fill these in ONLY with genuine registration details.
  sebiRegistration: "",   // e.g. "INH000000000"
  registeredName: "",     // legal name on the registration
  complianceOfficer: "",  // name + contact of the compliance officer

  // Where the contact form sends the enquiry: "whatsapp" or "email"
  formTarget: "whatsapp"
};

export default config;

/* ---- Link helpers ---- */
export const waLink = (text) =>
  config.whatsapp
    ? `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text ?? config.whatsappMessage ?? "")}`
    : "#contact";

export const phoneLink = () => (config.phone ? `tel:${config.phone}` : "#contact");
export const emailLink = () => (config.email ? `mailto:${config.email}` : "#contact");

/** Props for an <a> that opens WhatsApp in a new tab (when a number is set). */
export const waProps = (text) => ({
  href: waLink(text),
  ...(config.whatsapp ? { target: "_blank", rel: "noopener" } : {})
});
