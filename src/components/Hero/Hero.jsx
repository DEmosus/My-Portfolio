import { useEffect, useState } from "react";
import { ROLES } from "../../data/portfolioData";
import useTypewriter from "../../hooks/useTypewriter";
import "./Hero.css";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  const role = useTypewriter(ROLES);
  const [show, setShow] = useState(false);

  // Slight delay so the entrance animation plays after mount
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      {/* Decorative vertical grid lines */}
      <div className="hero__grid" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="hero__grid-line" />
        ))}
      </div>

      <div className="hero__content container">
        {/* Profile Image */}
        <div className="hero__profile">
          <img
            src="/images/isaac.jpg"
            alt="Isaac Mbugua"
            className={`hero__image${show ? " hero__image--visible" : ""}`}
          />
        </div>

        {/* Eyebrow */}
        <div className="hero__overflow">
          <p
            className={`hero__eyebrow${show ? " hero__eyebrow--visible" : ""}`}
          >
            ↳ AVAILABLE FOR WORK
          </p>
        </div>

        {/* Name */}
        <div className="hero__overflow">
          <h1 className={`hero__name${show ? " hero__name--visible" : ""}`}>
            ISAAC
            <br />
            <span className="hero__name-outline">MBUGUA</span>
          </h1>
        </div>

        {/* Typewriter role */}
        <div className="hero__overflow">
          <p className={`hero__role${show ? " hero__role--visible" : ""}`}>
            <span className="hero__role-prefix" aria-hidden="true">
              _{" "}
            </span>

            {role}

            <span className="hero__cursor" aria-hidden="true">
              |
            </span>
          </p>
        </div>

        {/* CTA buttons */}
        <div
          className={`hero__actions${show ? " hero__actions--visible" : ""}`}
        >
          <button
            className="btn-primary"
            onClick={() => scrollTo("portfolio")}
            aria-label="View portfolio"
          >
            VIEW WORK
          </button>

          <button
            className="btn-outline"
            onClick={() => scrollTo("contact")}
            aria-label="Go to contact section"
          >
            GET IN TOUCH
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">SCROLL</span>
      </div>
    </section>
  );
}
