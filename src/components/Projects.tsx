import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { projects, type Project } from "../data/projects";
import ProjectCard from "./ProjectCard";
import CaseStudyModal from "./CaseStudyModal";

const HOME_LIMIT = 6;

export default function Projects({ full = false }: { full?: boolean }) {
  const [active, setActive] = useState<Project | null>(null);

  const list = full ? projects : projects.filter((p) => p.render).slice(0, HOME_LIMIT);
  const showViewAll = !full && projects.filter((p) => p.render).length > 0;

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="sec-head-row">
          <div>
            <span className="kicker">MY PROJECTS</span>
            <h2>{full ? "Build Log — Everything" : "Build Log"}</h2>
            <p className="sub">
              {full
                ? "Every project so far, not just the highlights."
                : "The systems I've actually shipped."}
            </p>
          </div>
          <a
            href="https://github.com/wh0isalfred"
            className="link-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub <FiArrowRight />
          </a>
        </div>

        <div className="proj-grid">
          {list.map((p) => (
            <ProjectCard key={p.slug} project={p} onOpenCaseStudy={setActive} />
          ))}
        </div>

        {showViewAll && (
          <div className="view-all-wrap">
            <Link to="/projects" className="link-all">
              View all / More work <FiArrowRight />
            </Link>
          </div>
        )}
      </div>

      <CaseStudyModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
