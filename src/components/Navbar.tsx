import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({
  theme,
  toggle,
}: {
  theme: "dark" | "light";
  toggle: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="wrap nav-in">
        <a href="#home" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark">&lt;/&gt;</span>
          <b>alfred</b>
          <span className="dot">.dev</span>
        </a>

        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="nav-right">
          <button className="toggle" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <FiMoon /> : <FiSun />}
          </button>
          <button
            className="ham"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-drawer">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
