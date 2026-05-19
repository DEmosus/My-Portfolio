import { SOCIAL } from "../../data/portfolioData";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        {/* Logo */}
        <span className="footer__logo">
          <span className="footer__logo-accent">I</span>SAAC MBUGUA
        </span>

        {/* Social links */}
        <nav className="footer__social" aria-label="Social links">
          {SOCIAL.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label={`Visit Isaac's ${item.label} profile`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <span className="footer__copy">© {year} Isaac Mbugua</span>
      </div>
    </footer>
  );
}
