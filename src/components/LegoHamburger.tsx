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

const itemPop = {
  initial: { opacity: 0, y: 10, scale: 0.85 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.12 + i * 0.05, type: "spring" as const, bounce: 0.55, duration: 0.45 },
  }),
};

export default function LegoHamburger({
  theme,
  toggleTheme,
}: {
  theme: "dark" | "light";
  toggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

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

  const allItems = [...LINKS, ...SOCIAL];

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
            <motion.div
              className="lego-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
            {/* the menu "pops" out of the hamburger: starts as a tiny circle at
                its corner and blooms into the rounded panel, with a spring
                overshoot so it settles with a visible bounce */}
            <motion.div
              className="lego-menu"
              style={{ transformOrigin: "top right" }}
              initial={{ opacity: 0, scale: 0.05, borderRadius: "50%" }}
              animate={{
                opacity: 1,
                scale: 1,
                borderRadius: "20px",
                transition: { type: "spring", bounce: 0.42, duration: 0.55 },
              }}
              exit={{
                opacity: 0,
                scale: 0.15,
                borderRadius: "50%",
                transition: { duration: 0.22, ease: "easeIn" },
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.08 } }}
              >
                {LINKS.map((l, i) => (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="lego-menu-item">
                    <motion.span
                      className="reveal"
                      variants={itemPop}
                      initial="initial"
                      animate="animate"
                      custom={i}
                    >
                      {l.label}
                    </motion.span>
                  </a>
                ))}
                <motion.div
                  className="sub"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.14 + LINKS.length * 0.05 } }}
                >
                  Elsewhere
                </motion.div>
                {SOCIAL.map((l, i) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="lego-menu-item">
                    <motion.span className="reveal" variants={itemPop} initial="initial" animate="animate" custom={LINKS.length + i}>
                      {l.label}
                    </motion.span>
                  </a>
                ))}
                <motion.div
                  className="theme-row"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.2 + allItems.length * 0.05 } }}
                >
                  <span>Theme</span>
                  <span onClick={toggleTheme} style={{ cursor: "pointer", color: "var(--indigo)" }}>
                    {theme === "dark" ? "Dark" : "Light"}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
