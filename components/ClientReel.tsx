"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "./PixelIcons";
import { PlayIcon } from "./Icons";

// "From our clients": the live site's testimonial card, one at a time, arrows and dots, next every 10 seconds.
// The stills stand in until the client videos are recorded; add `video` to play one in place.
type T = {
  still: string;
  pos: string;
  agent: string;
  dur: string;
  quote?: string;
  name: string;
  role: string;
  face?: { src: string; focus: string; zoom: number };
  video?: string;
};

const ITEMS: T[] = [
  {
    still: "/clients/nuhome.jpg", pos: "30% 50%", agent: "Order agent", dur: "0:42",
    quote: "“Our retailers send photos, chits and messages. Now every one of them becomes an order in our ERP, without anyone typing it.”",
    name: "Aman Goenka", role: "[Designation] · NuHome",
    face: { src: "/people/aman-goenka.png", focus: "50% 30%", zoom: 1.9 },
  },
  {
    still: "/clients/stuffcool.jpg", pos: "75% 50%", agent: "Distribute agent", dur: "0:38",
    quote: "“Our distributors get today's stock every morning and send orders back the same way. My team just follows up.”",
    name: "Dhaval Budhdeo", role: "[Designation] · Stuffcool",
    face: { src: "/people/dhaval-budhdeo.jpg", focus: "52% 36%", zoom: 1.45 },
  },
  { still: "/clients/axis.jpg", pos: "40% 50%", agent: "Quote agent", dur: "0:45", name: "[Name]", role: "[Designation] · Axis Electricals" },
  { still: "/clients/malmo.jpg", pos: "45% 50%", agent: "Custom agent", dur: "0:40", name: "[Name]", role: "[Designation] · Malmo" },
];

function initials(name: string) {
  return name.startsWith("[") ? "" : name.split(" ").map((w) => w[0]).join("");
}

export default function ClientReel() {
  const [i, setI] = useState(0);
  const [played, setPlayed] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const n = ITEMS.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), 10000);
    return () => clearTimeout(t);
  }, [i, paused]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (played === null) return;
    const t = setTimeout(() => setPlayed(null), 2400);
    return () => clearTimeout(t);
  }, [played]);

  // swipe
  const [x0, setX0] = useState<number | null>(null);

  return (
    <div
      className="tm"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onTouchStart={(e) => setX0(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        setX0(null);
      }}
    >
      <button type="button" className="tm-arrow is-prev" onClick={() => go(-1)} aria-label="Previous client">
        <ChevronLeft aria-hidden />
      </button>
      <div className="tm-view">
        <div className="tm-track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {ITEMS.map((t, k) => (
            <figure className="tm-card" key={t.agent} aria-hidden={k !== i || undefined} inert={k !== i}>
              <div className="tm-video">
                {t.video ? (
                  <video src={t.video} controls preload="none" playsInline />
                ) : (
                  <>
                    <div className="still" style={{ backgroundImage: `url(${t.still})`, backgroundPosition: t.pos }} />
                    <span className="tm-chip btn btn-glass">{t.agent}</span>
                    <span className="tm-dur">{t.dur}</span>
                    <button type="button" className="tm-play" aria-label={`Play video, ${t.name}`} onClick={() => setPlayed(k)}>
                      <PlayIcon />
                    </button>
                    {played === k && <div className="tm-played">Client video goes here (9:16, under a minute)</div>}
                  </>
                )}
              </div>
              <div className="tm-body">
                {t.quote ? <blockquote className="t-quote" style={{ margin: 0 }}>{t.quote}</blockquote> : <span className="todo-flag">Video to record</span>}
                <figcaption className="tm-by">
                  <span className="tm-face" aria-hidden="true">
                    {t.face ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" src={t.face.src} alt="" style={{ objectPosition: t.face.focus, transformOrigin: t.face.focus, transform: `scale(${t.face.zoom})` }} />
                    ) : (
                      initials(t.name)
                    )}
                  </span>
                  <span>
                    {t.name}
                    <small>{t.role}</small>
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
      <button type="button" className="tm-arrow is-next" onClick={() => go(1)} aria-label="Next client">
        <ChevronRight aria-hidden />
      </button>
      <div className="tm-dots">
        {ITEMS.map((t, k) => (
          <button key={t.agent} type="button" className={k === i ? "is-on" : ""} onClick={() => setI(k)} aria-label={`Client ${k + 1} of ${n}`} />
        ))}
      </div>
    </div>
  );
}
