import Link from "next/link";
import Image from "next/image";
import { IconArrowRight, IconExternalLink } from "@tabler/icons-react";
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
          <a
            className="pf-url"
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="d">{domain}</span>
            <IconExternalLink size={11} stroke={2} />
          </a>
        </div>

        <Link href={`/portfolio/${project.slug}`} className="pf-shot">
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
        </Link>
      </div>

      <Link href={`/portfolio/${project.slug}`} className="pf-info">
        <span className="pf-num">{project.num}</span>
        <span className="pf-nm">
          {project.lead}
          <em>{project.accent}</em>
        </span>
        <span className="pf-tc">{project.tech}</span>
      </Link>
    </div>
  );
}