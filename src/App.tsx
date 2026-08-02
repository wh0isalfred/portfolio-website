import { Routes, Route } from "react-router-dom";
import { useTheme } from "./context/useTheme";
import MouseTrail from "./components/MouseTrail";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectsPage from "./components/ProjectsPage";

function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <TechStack />
      <Contact />
      <Footer />
    </>
  );
}

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <MouseTrail />
      <div className="ambient" aria-hidden="true" />
      <div className="dots" aria-hidden="true" />

      <Navbar theme={theme} toggle={toggle} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </>
  );
}
