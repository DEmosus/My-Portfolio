import { useState } from "react";
import useInView from "../../hooks/useInView";
import "./ProjectCard.css";
// Note: Portfolio.css handles the grid layout; ProjectCard.css handles the card itself

/**
 * Single portfolio project card.
 * Props:
 *   project {object} - project data from portfolioData.js
 *   index   {number} - grid position used to stagger the reveal animation
 */
export default function ProjectCard({ project, index }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  const delay = `${index * 0.07}s`;

  return (
    <article
      ref={ref}
      className={`project-card${inView ? " project-card--visible" : ""}`}
      style={{ "--delay": delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Project: ${project.title}`}
    >
      {/* Ghost index number */}
      <span className="project-card__index" aria-hidden="true">
        {project.index}
      </span>

      {/* Animated top-border accent */}
      <div
        className="project-card__accent"
        style={{ width: hovered ? "100%" : "2rem" }}
        aria-hidden="true"
      />

      {/* Body */}
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        <ul className="project-card__tags" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <li key={tag} className="project-card__tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* Links */}
      <div className="project-card__links">
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card__link project-card__link--primary"
          aria-label={`Visit live site for ${project.title}`}
        >
          LIVE SITE ↗
        </a>
        <a
          href={project.code}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card__link project-card__link--secondary"
          aria-label={`View source code for ${project.title}`}
        >
          CODE ↗
        </a>
      </div>
    </article>
  );
}
