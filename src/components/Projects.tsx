import { FiArrowRight } from "react-icons/fi";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="wrap">
        <div className="sec-head-row">
          <div>
            <span className="kicker">
              <span className="br">&lt;/&gt;</span> Selected Projects
            </span>
            <h2>Things I&apos;ve Built</h2>
            <p className="sub">A few of my recent projects</p>
          </div>
          <a
            href="https://github.com/wh0isalfred"
            className="link-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            View all on GitHub <FiArrowRight />
          </a>
        </div>
        <div className="proj-grid">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
