import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { projects, type Project } from "../data/projects";
import ProjectCard from "./ProjectCard";
import CaseStudyModal from "./CaseStudyModal";

const HOME_LIMIT = 6;

// hand-mapped scatter placement for the first 6 (size, alignment, extra top gap, rotation).
// not a generic algorithm — same reasoning as before: guessing a pattern for an
// arbitrary future project count is worse than extending this deliberately later.
const SCATTER = [
  { size: "featured" as const, align: "flex-start", width: "72%", gapTop: 0, rotate: -1 },
  { size: "small" as const, align: "flex-end", width: "40%", gapTop: 150, rotate: 1.4 },
  { size: "standard" as const, align: "flex-end", width: "50%", gapTop: 190, rotate: -0.8 },
  { size: "featured" as const, align: "flex-start", width: "68%", gapTop: 220, rotate: 0.6 },
  { size: "small" as const, align: "flex-start", width: "38%", gapTop: 150, rotate: -1.2 },
  { size: "standard" as const, align: "flex-end", width: "48%", gapTop: 180, rotate: 1 },
];

export default function Projects({ full = false }: { full?: boolean }) {
  const [active, setActive] = useState<Project | null>(null);

  const list = full ? projects : projects.filter((p) => p.render).slice(0, HOME_LIMIT);
  const showViewAll = !full && projects.filter((p) => p.render).length > 0;

  const scattered = list.slice(0, 6);
  const rest = list.slice(6);

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="editorial-transition">
          <p>Every project below started as a real problem I wanted to solve.</p>
        </div>

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

        <div className="scatter-flow">
          {scattered.map((p, i) => {
            const s = SCATTER[i];
            return (
              <div
                key={p.slug}
                className="scatter-item"
                style={{
                  alignSelf: s.align,
                  width: s.width,
                  marginTop: i === 0 ? 0 : s.gapTop,
                  transform: `rotate(${s.rotate}deg)`,
                }}
              >
                <ProjectCard project={p} onOpenCaseStudy={setActive} size={s.size} />
              </div>
            );
          })}
        </div>

        {rest.length > 0 && (
          <div className="proj-grid" style={{ marginTop: 64 }}>
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} onOpenCaseStudy={setActive} />
            ))}
          </div>
        )}

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
