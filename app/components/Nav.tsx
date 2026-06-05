"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IconArrowsMove } from "@tabler/icons-react";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const navRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const nav = navRef.current!;
    const pill = pillRef.current!;
    const items = itemsRef.current!;
    const ndiv = dividerRef.current!;
    const ham = pill.querySelector<HTMLButtonElement>(".ham")!;

    const openPill = () => {
      const r = pill.getBoundingClientRect();
      const delta = items.scrollWidth;
      const overflow = r.left + r.width + delta + 18 > window.innerWidth;
      if (overflow) {
        items.appendChild(ndiv);
        pill.classList.add("invert");
        nav.style.left = "auto";
        nav.style.right = `${window.innerWidth - r.right}px`;
      } else {
        items.prepend(ndiv);
        pill.classList.remove("invert");
        nav.style.right = "auto";
        nav.style.left = `${r.left}px`;
      }
      pill.classList.add("open");
    };
    const closePill = () => pill.classList.remove("open");

    let drag = false;
    let sx = 0, sy = 0, sLeft = 0, sTop = 0, moved = false, justDragged = false;

    const onHam = () => {
      if (justDragged) { justDragged = false; return; }
      pill.classList.contains("open") ? closePill() : openPill();
    };

    const down = (x: number, y: number) => {
      drag = true; moved = false;
      const r = nav.getBoundingClientRect();
      sx = x; sy = y; sLeft = r.left; sTop = r.top;
    };
    const move = (x: number, y: number) => {
      if (!drag) return;
      const dx = x - sx, dy = y - sy;
      if (!moved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
        moved = true;
        nav.classList.add("dragging");
        pill.classList.remove("open", "invert");
        items.prepend(ndiv);
        nav.style.right = "auto";
        nav.style.left = `${sLeft}px`;
        nav.style.top = `${sTop}px`;
      }
      if (moved) {
        const w = nav.offsetWidth, h = nav.offsetHeight;
        nav.style.left = `${Math.max(0, Math.min(sLeft + dx, window.innerWidth - w))}px`;
        nav.style.top = `${Math.max(0, Math.min(sTop + dy, window.innerHeight - h))}px`;
      }
    };
    const up = () => {
      if (drag) { drag = false; nav.classList.remove("dragging"); if (moved) justDragged = true; }
    };

    const md = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".nitem")) return;
      down(e.clientX, e.clientY); e.preventDefault();
    };
    const mm = (e: MouseEvent) => move(e.clientX, e.clientY);
    const ts = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest(".nitem")) return;
      const t = e.touches[0]; down(t.clientX, t.clientY);
    };
    const tm = (e: TouchEvent) => { const t = e.touches[0]; move(t.clientX, t.clientY); };

    ham.addEventListener("click", onHam);
    nav.addEventListener("mousedown", md);
    document.addEventListener("mousemove", mm);
    document.addEventListener("mouseup", up);
    nav.addEventListener("touchstart", ts, { passive: true });
    document.addEventListener("touchmove", tm, { passive: true });
    document.addEventListener("touchend", up);

    return () => {
      ham.removeEventListener("click", onHam);
      nav.removeEventListener("mousedown", md);
      document.removeEventListener("mousemove", mm);
      document.removeEventListener("mouseup", up);
      nav.removeEventListener("touchstart", ts);
      document.removeEventListener("touchmove", tm);
      document.removeEventListener("touchend", up);
    };
  }, []);

  const go = (href: string) => {
    pillRef.current?.classList.remove("open");
    router.push(href);
  };

  return (
    <div className="nav" ref={navRef}>
      <div className="pill" ref={pillRef}>
        <button className="ham" aria-label="Menu">
          <div>
            <span /><span /><span />
          </div>
        </button>
        <div className="items" ref={itemsRef}>
          <div className="ndiv" ref={dividerRef} />
          {LINKS.map((l) => (
            <button
              key={l.href}
              className={`nitem${pathname === l.href ? " on" : ""}`}
              onClick={() => go(l.href)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
      <div className="drag-tip">
        <IconArrowsMove size={12} stroke={2} /> drag
      </div>
    </div>
  );
}