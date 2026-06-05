import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Portfolio() {
  return (
    <main className="pf-wrap">
      <div className="pf-head">
        <h2>
          My <em>Work</em>
        </h2>
        <span className="pf-meta">things I&apos;ve built</span>
      </div>
      <div className="pf-grid">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </main>
  );
}