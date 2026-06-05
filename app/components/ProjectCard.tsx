import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";
import type { Project } from "../data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="pf-card">
      <div className="pf-frame">
        <div className="pf-bar">
          <i /><i /><i />
        </div>
        <div className="pf-shot">
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
        </div>
      </div>
      <div className="pf-info">
        <span className="pf-num">{project.num}</span>
        <span className="pf-nm">
          {project.lead}
          <em>{project.accent}</em>
        </span>
        <span className="pf-tc">{project.tech}</span>
      </div>
    </Link>
  );
}