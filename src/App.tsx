import { useTheme } from "./context/useTheme";
import MouseTrail from "./components/MouseTrail";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <MouseTrail />
      <div className="ambient" aria-hidden="true" />
      <div className="dots" aria-hidden="true" />

      <Navbar theme={theme} toggle={toggle} />
      <Hero />
      <Projects />
      <TechStack />
      <Contact />

      <footer className="footer">
        <div className="wrap footer-in">
          <span>
            © 2025 <span className="grad">Alfred Enyinna</span>
          </span>
          <span>Designed &amp; built in Port Harcourt 🇳🇬</span>
        </div>
      </footer>
    </>
  );
}
