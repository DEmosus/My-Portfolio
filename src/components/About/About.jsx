import { SKILLS, STATS } from "../../data/portfolioData";
import SectionLabel from "../SectionLabel/SectionLabel";
import useInView from "../../hooks/useInView";
import "./About.css";

export default function About() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="about" className="section about" aria-label="About me">
      <div className="container">
        <SectionLabel number="02" label="ABOUT" />
        <h2 className="section-title">About Me</h2>

        <div
          ref={ref}
          className={`about__grid${inView ? " about__grid--visible" : ""}`}
        >
          {/* ── Left: bio ── */}
          <div className="about__left">
            <blockquote className="about__quote">
              "Each line of code etches my legacy, and every bug conquered is a victory."
            </blockquote>

            <p className="about__text">
              I'm Isaac — a self-taught full stack developer with a passion for
              crafting elegant, secure digital experiences. My journey started
              with humble HTML tags and led me through React, Node.js,
              Python, PostgreSQL, Redis, and MongoDB.
            </p>

            <p className="about__text">
              I obsess over performance: minification, lazy loading, CDNs, tree
              shaking, caching, and query optimisation. Security is my sacred
              duty — HTTPS, CORS, CSP, OAuth, JWTs, and secure sessions are all
              in my arsenal. Forever learning, forever curious.
            </p>

            <div className="about__actions">
              <a
                href="/images/IsaacWebCV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                aria-label="Download CV"
              >
                DOWNLOAD CV
              </a>
            </div>
          </div>

          {/* ── Right: stats + skill list ── */}
          <div className="about__right">
            {/* Stats */}
            <div className="about__stats">
              {STATS.map((stat) => (
                <div key={stat.label} className="about__stat-box">
                  <span className="about__stat-num">{stat.num}</span>
                  <span className="about__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Skills list */}
            <ul className="about__skill-list" aria-label="Key skills">
              {SKILLS.slice(0, 8).map((skill) => (
                <li key={skill} className="about__skill-item">
                  <span className="about__skill-arrow" aria-hidden="true">▸</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
