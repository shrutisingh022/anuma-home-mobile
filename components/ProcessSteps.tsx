"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Check, UserRound } from "lucide-react";

// How we start: a vertical timeline in the workflow card language. The step in the middle of the
// screen is the current one (black glass); the ones above it are done (green check); the line fills
// down to it. Scrolling back up walks it back, so nothing stays lit that shouldn't.
const STEPS = [
  { h: "Look", p: "We go through a week of your real orders, quotes and messages. We find where your team's time goes.", you: "You share a week of work", get: "You see where time goes" },
  { h: "Plan", p: "We agree what Anuma does and what your team keeps doing.", you: "You approve the plan", get: "It's in writing" },
  { h: "Set up", p: "We connect your WhatsApp, email and ERP, and load your catalogue and rates.", you: "You give us access", get: "You see your own orders, prepared" },
  { h: "Run", p: "We run it with you every day and fix what goes wrong. It gets better each time your team corrects it.", you: "Your team approves orders", get: "We handle the rest" },
];

export default function ProcessSteps() {
  const [at, setAt] = useState(0);
  const [track, setTrack] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const fillRef = useRef<HTMLElement>(null);

  // The line follows the scroll: it fills to wherever the middle of the screen is, between the first
  // dot and the last. Written straight to the element (no re-render), as a GPU scale, and eased
  // towards its target every frame so it glides rather than steps.
  useEffect(() => {
    const fillEl = fillRef.current;
    if (!fillEl) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cur = 0, target = 0, len = 1, raf = 0;
    const read = () => {
      const a = refs.current[0], z = refs.current[STEPS.length - 1];
      if (!a || !z) return;
      len = Math.max(1, z.offsetTop - a.offsetTop);
      setTrack(len);
      const top = a.getBoundingClientRect().top + 34; // centre of the first dot
      target = Math.max(0, Math.min(1, (window.innerHeight / 2 - top) / len));
    };
    const tick = () => {
      cur += (target - cur) * (still ? 1 : 0.14);
      if (Math.abs(target - cur) < 0.0005) cur = target;
      fillEl.style.transform = `scaleY(${cur})`;
      raf = cur === target ? 0 : requestAnimationFrame(tick);
    };
    const on = () => { read(); if (!raf) raf = requestAnimationFrame(tick); };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLLIElement[];
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) setAt(els.indexOf(e.target as HTMLLIElement));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="pf-wrap" style={{ ["--track" as string]: `${track}px` }}>
    <span className="pf-track" aria-hidden="true"><i ref={fillRef} /></span>
    <ol className="pf">
      {STEPS.map((s, n) => (
        <li key={s.h} ref={(el) => { refs.current[n] = el; }} className={`pf-step${n < at ? " done" : n === at ? " now" : ""}`}>
          <span className="pf-dot" aria-hidden="true">{n < at ? <Check size={16} strokeWidth={2.5} /> : n + 1}</span>
          <div className="pf-card">
            <span className="pf-k">Step {n + 1}</span>
            <h3>{s.h}</h3>
            <p>{s.p}</p>
            <div className="pf-give">
              <span><UserRound size={14} strokeWidth={2} aria-hidden />{s.you}</span>
              <span><ArrowDownRight size={14} strokeWidth={2} aria-hidden />{s.get}</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
    </div>
  );
}
