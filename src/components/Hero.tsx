import { FiMail } from "react-icons/fi";
// FiDownload
export default function Hero() {
  return (
    <header className="hero" id="home">
      <div className="wrap hero-grid">
        <div className="hero-left" id="about">
          <p className="eyebrow">Hi, I am</p>
          <h1>
            <span className="grad">Alfred Enyinna</span>
          </h1>
          <p className="role">Software Engineer</p>
          <p className="bio">
            I build <b>secure, scalable web applications</b> with{" "}
            <span className="k">React</span>, <span className="k">Next.js</span> and
            modern tools — turning real problems into systems that actually help people.
          </p>
          <p className="bio">
            Based in Port Harcourt, Nigeria. Currently going deeper into cloud and
            cybersecurity.s
          </p>
          <div className="hero-cta">
            {/* <a href="/resume.pdf" download className="btn btn-grad">
              <FiDownload /> Download Resume
            </a> */}
            <a href="#contact" className="btn btn-ghost">
              <FiMail /> Get in Touch
            </a>
          </div>
        </div>

        <div className="hero-photo-col">
          <div className="photo-frame">
            <div className="photo-inner">
              <img src="/hero.png" alt="Alfred Enyinna" />
            </div>
            {/* <div className="avail-chip">
              <span className="pulse" /> Available for work
            </div> */}
            <div className="scribble">
              <span className="arrow">↖</span> Let&apos;s build cool things!
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
