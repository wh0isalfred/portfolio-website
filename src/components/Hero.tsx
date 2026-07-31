export default function Hero() {
  return (
    <header className="lego-hero" id="home">
      <div className="lego-hero-bg" aria-hidden="true" />

      <div className="wrap lego-hero-in">
        <p className="lego-eyebrow">
          <span className="sl">/</span> hello
        </p>

        <h1 className="lego-h1">
          <span className="line">
            I{" "}
            <span className="lego-word" aria-label="build">
              {"build".split("").map((ch, i) => (
                <span key={i} className="lego-brick" style={{ animationDelay: `${0.15 + i * 0.07}s` }}>
                  {ch}
                </span>
              ))}
            </span>
          </span>
          <span className="line">software that</span>
          <span className="line">
            <span className="grad-word">people</span> actually <span className="grad-word">use</span>.
          </span>
        </h1>

        <p className="lego-sub">
          Software Engineer.
          <br />
          Cloud Security student.
        </p>
        <p className="lego-loc">
          <span className="dot" /> Port Harcourt, Nigeria
        </p>

        <div className="lego-cta">
          <a href="#work" className="lego-btn lego-btn-fill" data-trail-color="cyan-mix">
            See my work <span className="arrow">&rarr;</span>
          </a>
          <a href="#contact" className="lego-btn lego-btn-outline" data-trail-color="contact">
            Contact me <span className="arrow">&rarr;</span>
          </a>
        </div>
      </div>

      <div className="lego-scroll">
        SCROLL TO EXPLORE
        <span className="pulse-dot" />
      </div>
    </header>
  );
}
