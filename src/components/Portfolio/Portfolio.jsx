import { PROJECTS } from "../../data/portfolioData";
import SectionLabel from "../SectionLabel/SectionLabel";
import ProjectCard from "./ProjectCard";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section id="portfolio" className="section portfolio" aria-label="Portfolio">
      <div className="container">
        <SectionLabel number="01" label="PORTFOLIO" />
        <h2 className="section-title">Selected Work</h2>

        <div className="portfolio__grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
