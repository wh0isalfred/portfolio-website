import { useState } from "react";
import { FiLock, FiArrowUpRight, FiCode } from "react-icons/fi";
import type { Project } from "../data/projects";

export default function ProjectCard({
  project,
  onOpenCaseStudy,
  size = "standard",
}: {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
  size?: "featured" | "standard" | "small";
}) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <article
      className={`card card--${size}`}
      onClick={() => onOpenCaseStudy(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpenCaseStudy(project);
      }}
    >
      <div className="browser">
        <div className="browser-bar">
          <span className="tl">
            <i />
            <i />
            <i />
          </span>
          <a
            className="addr"
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <FiLock className="lock" />
            <span>{project.url}</span>
            <FiArrowUpRight className="ext" />
          </a>
        </div>
        <div className="shot">
          {imgOk ? (
            <img
              src={project.cover}
              alt={`${project.title} screenshot`}
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="ph">
              {project.title}
              <span className="pi">screenshot</span>
            </div>
          )}
        </div>
      </div>

      <div className="card-body">
        <div className="card-top">
          <span className="card-num">{project.num}</span>
          <h3 className="card-title">{project.title}</h3>
        </div>
        <p className="card-tagline">{project.tagline}</p>

        <div className="tags">
          {project.tech.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div className="card-links">
          <a
            className="clink"
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <FiArrowUpRight /> Live Site
          </a>
          {project.repo ? (
            <a
              className="clink muted"
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <FiCode /> View Code
            </a>
          ) : (
            <span className="clink muted" style={{ opacity: 0.5 }}>
              Private
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
