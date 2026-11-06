"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "./Icons";

type Vid = {
  img: string;
  pos: string;
  chip: string;
  dur: string;
  quote?: string;
  name: string;
  role: string;
  todo?: boolean;
};

// Stills are placeholders until the 9:16 client videos are recorded.
const VIDS: Vid[] = [
  { img: "/clients/nuhome.jpg", pos: "30% 50%", chip: "Order agent", dur: "0:42", quote: "Our retailers send photos, chits and messages. Now every one of them becomes an order in our ERP, without anyone typing it.", name: "Aman Goenka", role: "[Designation] · NuHome" },
  { img: "/clients/stuffcool.jpg", pos: "75% 50%", chip: "Distribute agent", dur: "0:38", quote: "Our distributors get today's stock every morning and send orders back the same way. My team just follows up.", name: "Dhaval Budhdeo", role: "[Designation] · Stuffcool" },
  { img: "/clients/axis.jpg", pos: "40% 50%", chip: "Quote agent", dur: "0:45", name: "[Name]", role: "[Designation] · Axis Electricals", todo: true },
  { img: "/clients/malmo.jpg", pos: "45% 50%", chip: "Custom agent", dur: "0:40", name: "[Name]", role: "[Designation] · Malmo", todo: true },
];

export default function ClientReel() {
  const reelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [played, setPlayed] = useState<number | null>(null);

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;
    let raf = 0;
    const upd = () => {
      const mid = reel.scrollLeft + reel.clientWidth / 2;
      let best = 0;
      let bd = Infinity;
      [...reel.children].forEach((el, i) => {
        const v = el as HTMLElement;
        const d = Math.abs(v.offsetLeft + v.offsetWidth / 2 - mid);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(upd);
    };
    reel.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      reel.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (played === null) return;
    const t = setTimeout(() => setPlayed(null), 2400);
    return () => clearTimeout(t);
  }, [played]);

  const goTo = (i: number) => {
    const reel = reelRef.current;
    const el = reel?.children[i] as HTMLElement | undefined;
    if (!reel || !el) return;
    reel.scrollTo({ left: el.offsetLeft - (reel.clientWidth - el.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <>
      <div className="reel" ref={reelRef}>
        {VIDS.map((v, i) => (
          <figure className="vid" style={{ margin: 0 }} key={v.chip}>
            <div className="frame">
              <div className="img" style={{ backgroundImage: `url(${v.img})`, backgroundPosition: v.pos }} />
              <span className="chip">{v.chip}</span>
              <span className="dur">{v.dur}</span>
              <button className="play" type="button" aria-label={`Play video, ${v.name}`} onClick={() => setPlayed(i)}>
                <PlayIcon />
              </button>
              {played === i && <div className="played">Client video goes here (9:16, under a minute)</div>}
              <figcaption className="who">
                {v.quote && <q>{v.quote}</q>}
                <b>{v.name}</b>
                <span>{v.role}</span>
                {v.todo && <span className="todo">Video to record</span>}
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
      <div className="dots" role="tablist" aria-label="Client videos">
        {VIDS.map((v, i) => (
          <i
            key={v.chip}
            className={i === active ? "on" : undefined}
            role="tab"
            aria-selected={i === active}
            aria-label={v.name}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </>
  );
}
