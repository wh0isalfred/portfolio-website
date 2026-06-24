import { FiZap } from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiSupabase,
  SiPostgresql,
  SiGit,
} from "react-icons/si";
import type { IconType } from "react-icons";

const TECH: { name: string; Icon: IconType; color: string }[] = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "var(--text)" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Supabase", Icon: SiSupabase, color: "#3FCF8E" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
];

export default function TechStack() {
  return (
    <section className="section" id="stack">
      <div className="wrap">
        <span className="kicker">
          <span className="br">
            <FiZap style={{ verticalAlign: "-2px" }} />
          </span>{" "}
          Tech Stack
        </span>
        <h2>Technologies I Work With</h2>
        <p className="sub">The tools I reach for to build and ship</p>
        <div className="stack-grid">
          {TECH.map(({ name, Icon, color }) => (
            <div className="tech" key={name}>
              <span className="ic">
                <Icon size={40} color={color} />
              </span>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
