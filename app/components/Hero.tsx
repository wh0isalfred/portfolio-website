"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

const ROLES = ["Full Stack Engineer", "Aspiring Cybersecurity Specialist"];

export default function Hero() {
  const [text, setText] = useState("");

  useEffect(() => {
    let role = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = ROLES[role];
      if (!deleting) {
        char++;
        setText(word.slice(0, char));
        if (char === word.length) {
          deleting = true;
          timer = setTimeout(tick, 1700);
          return;
        }
      } else {
        char--;
        setText(word.slice(0, char));
        if (char === 0) {
          deleting = false;
          role = (role + 1) % ROLES.length;
        }
      }
      timer = setTimeout(tick, deleting ? 42 : 84);
    };

    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      <span className="greet">Hey, I&apos;m</span>
      <h1 className="hname">
        Alfred <em>Enyinna</em>
      </h1>
      <div className="hrule" />
      <div className="htitle">
        <span className="typed">{text}</span>
        <span className="hcursor" />
      </div>
      <p className="hcred">
        Full-stack web developer · Port Harcourt, Nigeria
      </p>
      <Link href="/contact" className="hcta">
        Get in touch{" "}
        <span className="arr">
          <IconArrowRight size={15} stroke={2} />
        </span>
      </Link>
    </section>
  );
}