import { useEffect } from "react";
import { FiX, FiArrowUpRight, FiCode } from "react-icons/fi";
import type { Project } from "../data/projects";

export default function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="case-modal-overlay" onClick={onClose}>
      <div className="case-modal" onClick={(e) => e.stopPropagation()}>
        <button className="case-modal-close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>

        <span className="kicker">Case study</span>
        <h3>{project.title}</h3>

        <p className="case-modal-p">
          <span className="case-label">Problem —</span> {project.problem}
        </p>
        <p className="case-modal-p">
          <span className="case-label">Build —</span> {project.build}
        </p>
        <p className="case-modal-outcome">→ {project.outcome}</p>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="case-modal-highlights">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        <div className="tags">
          {project.tech.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div className="card-links">
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="clink">
            <FiArrowUpRight /> Live Site
          </a>
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="clink muted">
              <FiCode /> View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
