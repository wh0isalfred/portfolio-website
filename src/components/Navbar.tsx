import { useEffect, useState } from "react";
import PixelMorphLogo from "./PixelMorphLogo";
import LegoHamburger from "./LegoHamburger";

export default function Navbar({
  theme,
  toggle,
}: {
  theme: "dark" | "light";
  toggle: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`lego-nav-wrap${scrolled ? " scrolled" : ""}`}>
      <nav className="lego-nav" data-trail-interactive>
        <PixelMorphLogo />
        <LegoHamburger theme={theme} toggleTheme={toggle} />
      </nav>
    </div>
  );
}
