"use client";

import { useEffect, useRef, useState } from "react";
import { LiquidButton } from "./Icons";

/** Sticky "Start chat": shows once the hero is scrolled past, steps aside over the closing card and footer. */
export default function DockCta() {
  const [on, setOn] = useState(false);
  const pastHero = useRef(false);
  const atEnd = useRef(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    const end = document.querySelector(".end");
    const sync = () => {
      const v = pastHero.current && !atEnd.current;
      setOn(v);
      document.body.classList.toggle("dock-on", v);
    };
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.target === hero) pastHero.current = !e.isIntersecting && e.boundingClientRect.top < 0;
        if (e.target === end) atEnd.current = e.isIntersecting || e.boundingClientRect.top < 0;
      });
      sync();
    });
    if (hero) io.observe(hero);
    if (end) io.observe(end);
    return () => {
      io.disconnect();
      document.body.classList.remove("dock-on");
    };
  }, []);

  return (
    <div className={`dock${on ? " is-on" : ""}`} aria-hidden={!on}>
      <LiquidButton tabIndex={on ? 0 : -1} />
    </div>
  );
}
