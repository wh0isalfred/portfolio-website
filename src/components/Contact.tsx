import { IconType } from "react-icons";
import { FiMail } from "react-icons/fi";
import { SiGithub, SiWhatsapp, SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

type Chan = {
  Icon: IconType;
  label: string;
  sub: string;
  href: string;
  tag?: string;
};

const CHANS: Chan[] = [
  {
    Icon: SiGmail,
    label: "Email",
    sub: "alfredenyinna03@gmail.com",
    href: "mailto:alfredenyinna03@gmail.com",
    tag: "Best",
  },
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    sub: "alfred-enyinna",
    href: "https://www.linkedin.com/in/alfred-enyinna-b7700b414/",
  },
  {
    Icon: SiGithub,
    label: "GitHub",
    sub: "@wh0isalfred",
    href: "https://github.com/wh0isalfred",
  },
  {
    Icon: SiWhatsapp,
    label: "WhatsApp",
    sub: "Message me",
    href: "https://wa.me/2347065772394",
  },
];

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <span className="kicker" style={{ justifyContent: "center" }}>
          <FiMail style={{ verticalAlign: "-2px" }} /> Contact
        </span>
        <h2 className="big">
          Let&apos;s build <span className="grad">something</span>
        </h2>
        <p className="sub">
          A role, a project, or just an idea worth chasing — my inbox is open, and I
          read everything.
        </p>
        <div className="chan-grid">
          {CHANS.map(({ Icon, label, sub, href, tag }) => (
            <a
              key={label}
              className="chan"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tag && <span className="tagb">{tag}</span>}
              <span className="cic">
                <Icon size={21} />
              </span>
              <b>{label}</b>
              <small>{sub}</small>
            </a>
          ))}
        </div>
        <div className="contact-status">
          <span className="pulse" /> Available for work · Port Harcourt, Nigeria — open
          to remote
        </div>
      </div>
    </section>
  );
}
