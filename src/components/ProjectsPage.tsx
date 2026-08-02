import Projects from "./Projects";
import Footer from "./Footer";

export default function ProjectsPage() {
  return (
    <>
      <div style={{ height: 90 }} aria-hidden="true" />
      <Projects full />
      <Footer />
    </>
  );
}
