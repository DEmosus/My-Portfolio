import { useRef, useEffect } from "react";
import { SKILLS } from "../../data/portfolioData";
import SectionLabel from "../SectionLabel/SectionLabel";
import "./Skills.css";

export default function Skills() {
  const trackRef   = useRef(null);
  const animRef    = useRef(null);
  const posRef     = useRef(0);
  const pausedRef  = useRef(false);
  const dirRef     = useRef(0); // -1 = nudge left, 0 = auto, 1 = nudge right

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // scrollWidth is the full duplicated list; half = one complete set
    let half = track.scrollWidth / 2;
    const BASE_SPEED = 0.55;

    const tick = () => {
      // Recalculate in case of resize
      half = track.scrollWidth / 2;

      if (!pausedRef.current) {
        posRef.current -= BASE_SPEED;
      } else if (dirRef.current !== 0) {
        posRef.current -= dirRef.current * 2;
      }

      // Seamless loop
      if (posRef.current <= -half) posRef.current = 0;
      if (posRef.current > 0)      posRef.current = -half + posRef.current;

      track.style.transform = `translateX(${posRef.current}px)`;
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleMouseMove = (e) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    pausedRef.current = true;
    dirRef.current = x < 0.25 ? -1 : x > 0.75 ? 1 : 0;
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
    dirRef.current    = 0;
  };

  // Duplicate the skills array for the seamless loop
  const doubled = [...SKILLS, ...SKILLS];

  return (
    <section id="skills" className="section skills" aria-label="Skills">
      <div className="container">
        <SectionLabel number="00" label="SKILLS" />
        <h2 className="section-title">Tech Stack</h2>
      </div>

      <div
        className="skills__marquee"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label="Scrolling skills list"
      >
        <div className="skills__track" ref={trackRef}>
          {doubled.map((skill, i) => (
            <div key={i} className="skills__chip">
              <span className="skills__chip-dot" aria-hidden="true" />
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
