"use client";

import Image from "next/image";
import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";

function QAItem({ q, children }: { q: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`qitem${open ? " open" : ""}`}>
      <button
        className="qq"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="ic">
          <IconPlus size={15} stroke={2} />
        </span>
        {q}
      </button>
      <div className="qa-ans">
        <div className="qa-ans-inner">
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <div className="about-grid">
        <aside className="about-left">
          <div className="ab-label">About</div>
          <div className="hello">
            <div className="ab-photo">
              <Image
                src="/profile.jpeg"
                alt="Alfred Enyinna"
                fill
                sizes="(max-width:860px) 300px, 360px"
                className="ab-photo-img"
              />
            </div>
            <h1 className="htitle">
                <span className="greet">Hey, I’m</span>
                <span className="name">Alfred.</span>
            </h1>
            <p className="hbio">
              I love programming — not really for the code, but for what it
              becomes. Turning a real problem into an intricate system that
              actually helps people is the thing. And watching how others solve
              the same kinds of problems, then learning from them, is what keeps
              me going.
            </p>
          </div>
        </aside>

        <div className="about-right">
          <div className="ab-label muted">A little more — tap to open</div>
          <div className="qa">
            <QAItem q="What’s the work really about?">
              The dopamine isn’t from writing code — it’s from seeing a strong,
               simply features come together to{" "}
              <span className="o">actually solve something real</span>. Helping
              people, and learning from how others approach the same problems,
              is the whole point for me.
            </QAItem>
            <QAItem q="Outside of code?">
              Drums, and drawing — or just getting lost in good art. Basketball
              whenever I can. I’m not much of a gamer, but Minecraft or NBA Live
              is how I wind down after an intense stretch. And I’m a{" "}
              <span className="o">disciple of Jesus Christ</span> — that’s the
              center of it all.
            </QAItem>
            <QAItem q="What am I into right now?">
              Reading more, and getting into economics & investing. I’m working
              toward becoming a <span className="o">cloud engineer</span> —
              started the Google Cybersecurity certificate and a pre-security
              track on HackerRank, and I’m building a Node.js project to really
              learn the backend.
            </QAItem>
          </div>

          <section className="ab-now">
            <div className="ab-now-h">
              <span className="ab-eq">
                <i /><i /><i /><i />
              </span>{" "}
              Right now
            </div>
            <div className="ab-nrow">
              <span className="ab-nk">Building</span>
              <span className="ab-nv">
                A Node.js project, learning the backend properly
              </span>
            </div>
            <div className="ab-nrow">
              <span className="ab-nk">Learning</span>
              <span className="ab-nv">
                Google Cybersecurity cert · HackerRank pre-security
              </span>
            </div>
            <div className="ab-nrow">
              <span className="ab-nk">Reading</span>
              <span className="ab-nv">
                More books — economics & investing lately
              </span>
            </div>
          </section>

          <div className="ab-label" style={{ marginTop: "34px" }}>
            Toolbox
          </div>
          <section className="tools">
            <div className="tgrp">
              <span className="tk">Building with</span>
              <div className="tags">
                <span className="tag">React</span>
                <span className="tag">Next.js</span>
                <span className="tag">TypeScript</span>
                <span className="tag">Tailwind</span>
                <span className="tag">Supabase</span>
                <span className="tag">Node.js</span>
              </div>
            </div>
            <div className="tgrp">
              <span className="tk">Also work with</span>
              <div className="tags">
                <span className="tag">Python</span>
                <span className="tag">PostgreSQL</span>
                <span className="tag">Paystack</span>
                <span className="tag">Git</span>
                <span className="tag">Vercel</span>
              </div>
            </div>
            <div className="tgrp">
              <span className="tk">Learning now</span>
              <div className="tags">
                <span className="tag learn">Cloud</span>
                <span className="tag learn">Cybersecurity</span>
                <span className="tag learn">System design</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}