import PixelMorphLogo from "./PixelMorphLogo";
import LegoHamburger from "./LegoHamburger";

export default function Navbar({
  theme,
  toggle,
}: {
  theme: "dark" | "light";
  toggle: () => void;
}) {
  return (
    <div className="lego-nav-wrap">
      <nav className="lego-nav">
        <PixelMorphLogo />
        <LegoHamburger theme={theme} toggleTheme={toggle} />
      </nav>
    </div>
  );
}
