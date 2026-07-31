import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Beyond", href: "#beyond" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL = [
  { label: "GitHub", href: "https://github.com/wh0isalfred" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alfred-enyinna-b7700b414/" },
  { label: "Resume", href: "/resume.pdf" },
];

export default function LegoHamburger({
  theme,
  toggleTheme,
}: {
  theme: "dark" | "light";
  toggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={`lego-ham${open ? " open" : ""}`}
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        data-trail-color="cyan-mix"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="stud" />
        ))}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lego-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="lego-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.2, 0.9, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="sub">Elsewhere</div>
              {SOCIAL.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="theme-row">
                <span>Theme</span>
                <span
                  onClick={toggleTheme}
                  style={{ cursor: "pointer", color: "var(--indigo)" }}
                >
                  {theme === "dark" ? "Dark" : "Light"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
