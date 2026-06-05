import Hero from "./components/Hero";
import {IconBrandGithub, IconBrandLinkedin, IconBrandWhatsapp} from "@tabler/icons-react";

export default function Home() {
  return (
    <main>
      <Hero />

      <div className="socials">
          <a
            href="https://github.com/wh0isalfred"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <IconBrandGithub size={18} stroke={1.8} />
          </a>
          <a
            href="https://www.linkedin.com/in/alfred-enyinna-b7700b414/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <IconBrandLinkedin size={18} stroke={1.8} />
          </a>
          <a
            href="https://wa.me/2347065772394"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <IconBrandWhatsapp size={18} stroke={1.8} />
          </a>
          {/* Instagram — hidden for now
          <a href="https://instagram.com/your-handle" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <IconBrandInstagram size={18} stroke={1.8} />
          </a> */}
        <span className="sline" />
      </div>
      <div className="status">
        <span className="eq">
          <i /><i /><i /><i />
        </span>
        available for work
      </div>
    </main>
  );
}