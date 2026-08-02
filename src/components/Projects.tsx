import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { projects, type Project } from "../data/projects";
import ProjectCard from "./ProjectCard";
import CaseStudyModal from "./CaseStudyModal";
// import NotebookAside from "./NotebookAside";

const HOME_LIMIT = 6;

export default function Projects({ full = false }: { full?: boolean }) {
  const [active, setActive] = useState<Project | null>(null);

  const list = full ? projects : projects.filter((p) => p.render).slice(0, HOME_LIMIT);
  const showViewAll = !full && projects.filter((p) => p.render).length > 0;

  // editorial rhythm for the first 6: featured, aside, pair, aside, featured, small pair.
  // anything beyond 6 (only reachable on the full /projects page as more get added)
  // falls back to a plain 2-col grid rather than guessing a rhythm for arbitrary length.
  const [p1, p2, p3, p4, p5, p6, ...rest] = list;

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
                : "Selected software, experiments, and products."}
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

        <div className="editorial-flow">
          {p1 && (
            <div className="proj-featured">
              <ProjectCard project={p1} onOpenCaseStudy={setActive} size="featured" />
            </div>
          )}

          {/* {p1 && <NotebookAside number={p1.num} lines={[p1.outcome]} />} */}

          {(p2 || p3) && (
            <div className="proj-pair">
              {p2 && <ProjectCard project={p2} onOpenCaseStudy={setActive} />}
              {p3 && <ProjectCard project={p3} onOpenCaseStudy={setActive} />}
            </div>
          )}

          {/* <NotebookAside lines={["Currently deep in cloud security."]} /> */}

          {p4 && (
            <div className="proj-featured proj-featured--alt">
              <ProjectCard project={p4} onOpenCaseStudy={setActive} size="featured" />
            </div>
          )}

          {(p5 || p6) && (
            <div className="proj-pair proj-pair--small">
              {p5 && <ProjectCard project={p5} onOpenCaseStudy={setActive} size="small" />}
              {p6 && <ProjectCard project={p6} onOpenCaseStudy={setActive} size="small" />}
            </div>
          )}

          {rest.length > 0 && (
            <div className="proj-grid">
              {rest.map((p) => (
                <ProjectCard key={p.slug} project={p} onOpenCaseStudy={setActive} />
              ))}
            </div>
          )}
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
