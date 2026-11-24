import { useEffect, useState } from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Stats from "./components/Stats.jsx";
import About from "./components/About.jsx";
import Plans from "./components/Plans.jsx";
import Method from "./components/Method.jsx";
import Process from "./components/Process.jsx";
import Faq from "./components/Faq.jsx";
import Cta from "./components/Cta.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollChrome from "./components/ScrollChrome.jsx";
import useReveal from "./hooks/useReveal.js";
import usePointerEffects from "./hooks/usePointerEffects.js";

export default function App() {
  // Lifted so footer links can switch the Plans tab.
  const [planFilter, setPlanFilter] = useState("all");

  useReveal();
  usePointerEffects();

  // Sections render after the page loads, so honour a #section link ourselves.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <ScrollChrome />
      <Nav />
      <main id="top">
        <Hero />
        <Marquee />
        <Stats />
        <About />
        <Plans filter={planFilter} onFilter={setPlanFilter} />
        <Method />
        <Process />
        <Faq />
        <Cta />
        <Contact />
      </main>
      <Footer onPlanFilter={setPlanFilter} />
    </>
  );
}
