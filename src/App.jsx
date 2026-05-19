import useActiveSection from "./hooks/useActiveSection";

import About from "./components/About/About";
import BackToTop from "./components/BackToTop/BackToTop";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Nav from "./components/Nav/Nav";
import Portfolio from "./components/Portfolio/Portfolio";
import Skills from "./components/Skills/Skills";

import "./App.css";

const SECTION_IDS = ["skills", "portfolio", "about", "contact"];

export default function App() {
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <>
      <Nav active={activeSection} />

      <main>
        <Hero />
        <Skills />
        <Portfolio />
        <About />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
