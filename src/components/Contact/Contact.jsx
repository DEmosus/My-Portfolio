import SectionLabel from "../SectionLabel/SectionLabel";
import useInView from "../../hooks/useInView";
import "./Contact.css";

export default function Contact() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="contact" className="section contact" aria-label="Contact">
      <div className="container">
        <SectionLabel number="03" label="CONTACT" />

        <div
          ref={ref}
          className={`contact__inner${inView ? " contact__inner--visible" : ""}`}
        >
          <h2 className="contact__heading">
            Let's build
            <br />
            <span className="contact__heading-outline">something</span>{" "}
            <span className="contact__heading-accent">great.</span>
          </h2>

          <p className="contact__text">
            Whether you're looking for a collaborator, need consultation, or
            just want to say hi — my inbox is always open.
          </p>

          <a
            href="mailto:esaakadevsolutions@gmail.com"
            className="btn-primary contact__btn"
            aria-label="Send email to Isaac"
          >
            esaakadevsolutions@gmail.com ↗
          </a>
        </div>
      </div>
    </section>
  );
}
