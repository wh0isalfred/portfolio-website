import {
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandWhatsapp,
  IconArrowUpRight,
} from "@tabler/icons-react";
import type { CSSProperties } from "react";

const channels = [
  {
    label: "Email",
    handle: "alfredenyinna03@gmail.com",
    href: "mailto:alfredenyinna03@gmail.com",
    Icon: IconMail,
    accent: "#d4a03a",
    ictext: "#19120e",
    tag: "Best way",
    external: false,
  },
  {
    label: "LinkedIn",
    handle: "in/alfred-enyinna",
    href: "https://www.linkedin.com/in/alfred-enyinna-b7700b414/",
    Icon: IconBrandLinkedin,
    accent: "#5588bb",
    ictext: "#fdf8ee",
    external: true,
  },
  {
    label: "GitHub",
    handle: "@wh0isalfred",
    href: "https://github.com/wh0isalfred",
    Icon: IconBrandGithub,
    accent: "#9886c4",
    ictext: "#fdf8ee",
    external: true,
  },
  {
    label: "WhatsApp",
    handle: "Message me directly",
    href: "https://wa.me/2347065772394",
    Icon: IconBrandWhatsapp,
    accent: "#56a880",
    ictext: "#0f211a",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <main className="contact-page">
      <div className="ct-inner">
        <div className="ct-label">Contact</div>
        <h1 className="ct-head">
          Let’s build <em>something</em>.
        </h1>
        <p className="ct-sub">
          A role, a project, or just an idea worth chasing — my inbox is open,
          and I read everything.
        </p>

        <div className="channels">
          {channels.map((c) => (
            <a
              key={c.label}
              className={`chan${c.tag ? " has-tag" : ""}`}
              href={c.href}
              style={{ "--accent": c.accent, "--ictext": c.ictext } as CSSProperties}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <c.Icon size={118} stroke={1.5} className="glyph" aria-hidden />
              <span className="chan-ic">
                <c.Icon size={22} stroke={2} />
              </span>
              <span className="chan-meta">
                <b>{c.label}</b>
                <span>{c.handle}</span>
              </span>
              {c.tag && <span className="tag">{c.tag}</span>}
              <span className="chan-arr">
                <IconArrowUpRight size={18} stroke={2} />
              </span>
            </a>
          ))}
        </div>

        <div className="ct-status">
          <span className="avail">
            <span className="ct-eq">
              <i /><i /><i /><i />
            </span>{" "}
            Available for work
          </span>
          <span className="dotsep">·</span>
          <span>Port Harcourt, Nigeria — open to remote</span>
        </div>
      </div>
    </main>
  );
}