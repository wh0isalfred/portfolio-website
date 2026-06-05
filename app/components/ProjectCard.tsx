import Image from "next/image";
import {
  IconArrowRight,
  IconExternalLink,
  IconBrandGithub,
} from "@tabler/icons-react";
import type { Project } from "../data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const domain = project.live.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="pf-card">
      <div className="pf-frame">
        <div className="pf-bar">
          <span className="pf-dots">
            <i /><i /><i />
          </span>
          <a className="pf-url" href={project.live} target="_blank" rel="noopener noreferrer">
            <span className="d">{domain}</span>
            <IconExternalLink size={11} stroke={2} />
          </a>
        </div>

        <a className="pf-shot" href={project.live} target="_blank" rel="noopener noreferrer">
          <Image
            src={project.cover}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="pf-img"
          />
          <div className="pf-overlay">
            <p className="pf-od">{project.description}</p>
            <span className="pf-oe">
              Explore{" "}
              <span className="arr">
                <IconArrowRight size={14} stroke={2} />
              </span>
            </span>
          </div>
        </a>
      </div>

      <div className="pf-info">
        <span className="pf-num">{project.num}</span>
        <div className="pf-meta">
          <span className="pf-nm">
            {project.lead}
            <em>{project.accent}</em>
          </span>
          <span className="pf-tc">{project.tech}</span>
        </div>
        <a
          className="pf-repo"
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
        >
          <IconBrandGithub size={18} stroke={1.8} />
        </a>
      </div>
    </div>
  );
}