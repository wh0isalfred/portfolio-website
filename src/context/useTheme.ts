import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  // Dark is the true default, regardless of OS/browser color-scheme preference —
  // we never check prefers-color-scheme. A returning visitor's own manual toggle
  // (saved below) is respected; everyone else starts on dark.
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch {
      /* ignore */
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return { theme, toggle };
}
