import "./SectionLabel.css";

/**
 * Small decorative eyebrow above section headings.
 * Renders:  01 ——— PORTFOLIO
 */
export default function SectionLabel({ number, label }) {
  return (
    <div className="section-label">
      <span className="section-label__number">{number}</span>
      <span className="section-label__line" aria-hidden="true" />
      <span className="section-label__text">{label}</span>
    </div>
  );
}
