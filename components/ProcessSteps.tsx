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
  const [fill, setFill] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  // the line fills exactly to the current step's dot
  useEffect(() => {
    const measure = () => {
      const a = refs.current[0], b = refs.current[at];
      if (a && b) setFill(b.offsetTop - a.offsetTop);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [at]);

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
    <div className="pf-wrap" style={{ ["--fill" as string]: `${fill}px` }}>
    <span className="pf-track" aria-hidden="true"><i /></span>
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
