"use client";

import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "./Icons";
import { WA_URL } from "@/lib/site";

/** Sticky "Start chat". Shows once the hero is scrolled past, hides over the final card. */
export default function DockCta() {
  const [show, setShow] = useState(false);
  const pastHero = useRef(false);
  const atFinal = useRef(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    const fin = document.querySelector(".final");
    const sync = () => {
      const on = pastHero.current && !atFinal.current;
      setShow(on);
      document.body.classList.toggle("dock-on", on);
    };
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.target === hero) pastHero.current = !e.isIntersecting && e.boundingClientRect.top < 0;
        if (e.target === fin) atFinal.current = e.isIntersecting;
      });
      sync();
    });
    if (hero) io.observe(hero);
    if (fin) io.observe(fin);
    return () => {
      io.disconnect();
      document.body.classList.remove("dock-on");
    };
  }, []);

  return (
    <a
      className={`dock-cta${show ? " show" : ""}`}
      href={WA_URL}
      target="_blank"
      rel="noopener"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
    >
      <WhatsAppIcon />
      Start chat
    </a>
  );
}
