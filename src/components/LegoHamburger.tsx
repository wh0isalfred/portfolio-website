import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  const wrapRef = useRef<HTMLDivElement>(null);

  // close on Escape, and as a robustness fallback, close on any outside pointer down
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointerDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div className="lego-ham-wrap" ref={wrapRef}>
      <button
        className={`lego-ham${open ? " open" : ""}`}
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        data-trail-interactive
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="stud" />
        ))}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* invisible full-screen backdrop, purely for outside-click detection */}
            <motion.div
              className="lego-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
            <motion.div
              className="lego-menu"
              style={{ transformOrigin: "top right" }}
              initial={{ opacity: 0, scale: 0.35, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {LINKS.map((l, i) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="lego-menu-item">
                  <motion.span
                    className="reveal"
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{ duration: 0.22, delay: 0.08 + i * 0.05, ease: "easeOut" }}
                  >
                    {l.label}
                  </motion.span>
                </a>
              ))}
              <motion.div
                className="sub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08 + LINKS.length * 0.05 }}
              >
                Elsewhere
              </motion.div>
              {SOCIAL.map((l, i) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="lego-menu-item">
                  <motion.span
                    className="reveal"
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{
                      duration: 0.22,
                      delay: 0.14 + LINKS.length * 0.05 + i * 0.05,
                      ease: "easeOut",
                    }}
                  >
                    {l.label}
                  </motion.span>
                </a>
              ))}
              <motion.div
                className="theme-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + (LINKS.length + SOCIAL.length) * 0.05 }}
              >
                <span>Theme</span>
                <span onClick={toggleTheme} style={{ cursor: "pointer", color: "var(--indigo)" }}>
                  {theme === "dark" ? "Dark" : "Light"}
                </span>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
