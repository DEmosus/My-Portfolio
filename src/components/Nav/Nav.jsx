import { useState, useEffect } from "react";
import "./Nav.css";

const NAV_LINKS = ["skills", "portfolio", "about", "contact"];

/**
 * Sticky navigation bar.
 * Props:
 *   active {string} - currently active section id (from useActiveSection)
 */
export default function Nav({ active }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}`} role="banner">
      <div className="nav__inner container">

        {/* Logo */}
        <button
          className="nav__logo"
          onClick={() => scrollTo("hero")}
          aria-label="Scroll to top"
        >
          <span className="nav__logo-accent">I</span>SAAC
        </button>

        {/* Desktop links */}
        <nav className="nav__links" role="navigation" aria-label="Main navigation">
          {NAV_LINKS.map((id) => (
            <button
              key={id}
              className={`nav__link${active === id ? " nav__link--active" : ""}`}
              onClick={() => scrollTo(id)}
            >
              {id.toUpperCase()}
            </button>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className="nav__hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className={`nav__hamburger-icon${menuOpen ? " nav__hamburger-icon--open" : ""}`}>
            <span /><span /><span />
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`nav__drawer${menuOpen ? " nav__drawer--open" : ""}`} aria-hidden={!menuOpen}>
        {NAV_LINKS.map((id) => (
          <button
            key={id}
            className="nav__drawer-link"
            onClick={() => scrollTo(id)}
            tabIndex={menuOpen ? 0 : -1}
          >
            <span className="nav__drawer-number">
              {String(NAV_LINKS.indexOf(id) + 1).padStart(2, "0")}
            </span>
            {id.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );
}
