import { useState } from "react";
import { FiLock, FiArrowUpRight, FiCode } from "react-icons/fi";
import type { Project } from "../data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <article className="card">
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
          >
            <FiLock className="lock" />
            <span>{project.url}</span>
            <FiArrowUpRight className="ext" />
          </a>
        </div>
        <a className="shot" href={project.live} target="_blank" rel="noopener noreferrer">
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
        </a>
      </div>

      <div className="card-body">
        <div className="card-top">
          <span className="card-num">{project.num}</span>
          <h3 className="card-title">{project.title}</h3>
        </div>
        <p className="card-desc">{project.description}</p>
        <div className="tags">
          {project.tech.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <div className="card-links">
          <a className="clink" href={project.live} target="_blank" rel="noopener noreferrer">
            <FiArrowUpRight /> Live Site
          </a>
          {project.repo ? (
            <a
              className="clink muted"
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
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
