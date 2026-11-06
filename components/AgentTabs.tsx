"use client";

import { useEffect, useRef, useState } from "react";
import { CircleCheck } from "lucide-react";
import { AgentScreen, STEPS } from "./AgentScreens";
import { Collect, Distribute, Identify, Inbox, Order, Quote, Remember, type LucideIcon } from "./PixelIcons";

// The live agent card: tag, name, "Stands in for", two points, over an animated screen of what the agent does.
// The screen plays its steps; when it finishes, the next tab opens on its own. Tapping a tab stops the autoplay.
type Agent = { name: string; tag: string; stands: string; points: string[]; Icon: LucideIcon };

const AGENTS: Agent[] = [
  {
    name: "Inbox", tag: "WhatsApp · email · calls · stalls", Icon: Inbox,
    stands: "the five phones and inboxes your team checks",
    points: ["WhatsApp, email and calls in one shared inbox", "Assign a chat, hand it over, never lose one"],
  },
  {
    name: "Identify", tag: "Product photos", Icon: Identify,
    stands: "searching the catalogue by hand",
    points: ["Matches a photo or a description to your code", "Asks your team when it isn't sure"],
  },
  {
    name: "Quote", tag: "RFQs · email · Excel", Icon: Quote,
    stands: "a day of lookups in old quotes",
    points: ["Works out the BOM and finds each line in your old quotes", "Prices it on today's rates"],
  },
  {
    name: "Order", tag: "Orders", Icon: Order,
    stands: "typing orders into Tally",
    points: ["Every message becomes a draft order", "Saved to your ERP once your team says yes"],
  },
  {
    name: "Distribute", tag: "Distributors · reps", Icon: Distribute,
    stands: "forwarding the stock PDF",
    points: ["Sends today's stock to every distributor", "Their orders come back as drafts"],
  },
  {
    name: "Collect", tag: "Invoices · payments", Icon: Collect,
    stands: "chasing payments on the phone",
    points: ["Sends a polite reminder on time", "Matches each payment to its invoice"],
  },
  {
    name: "Remember", tag: "Business memory", Icon: Remember,
    stands: "the rates nobody wrote down",
    points: ["Every customer's rate, usual order and habits", "Every other agent works from it"],
  },
];

const STEP_MS = 1000;
const HOLD_MS = 2600;

export default function AgentTabs() {
  const [i, setI] = useState(0);
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const [seen, setSeen] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const a = AGENTS[i];
  const total = STEPS[a.name];

  // start only once the card is on screen; reduced motion shows each screen's end state, no autoplay
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAuto(false);
      setStep(99);
      return;
    }
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => setSeen(es[0].isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // play the steps, then move to the next agent
  useEffect(() => {
    if (!seen || step >= 99) return;
    if (step < total) {
      const t = setTimeout(() => setStep((v) => v + 1), step === 0 ? 400 : STEP_MS);
      return () => clearTimeout(t);
    }
    if (!auto) return;
    const t = setTimeout(() => go((i + 1) % AGENTS.length), HOLD_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, step, total, auto, i]);

  const centre = (n: number) => {
    const c = rowRef.current;
    const btn = c?.children[n] as HTMLElement | undefined;
    if (c && btn) c.scrollTo({ left: Math.max(0, btn.offsetLeft - (c.clientWidth - btn.offsetWidth) / 2), behavior: "smooth" });
  };
  const go = (n: number) => {
    setI(n);
    setStep(0);
    centre(n);
  };
  const pick = (n: number) => {
    setAuto(false);
    go(n);
  };

  return (
    <div ref={wrapRef}>
      <div className="at-tabs" role="tablist" aria-label="Agents" ref={rowRef}>
        {AGENTS.map((ag, n) => (
          <button
            key={ag.name}
            type="button"
            role="tab"
            id={`tab-${ag.name}`}
            aria-selected={n === i}
            aria-controls="agent-panel"
            className="at-tab"
            onClick={() => pick(n)}
          >
            <span className="at-ico"><ag.Icon aria-hidden /></span>
            {ag.name}
          </button>
        ))}
      </div>
      <article className="at-card" key={a.name} id="agent-panel" role="tabpanel" aria-labelledby={`tab-${a.name}`}>
        <div className="at-frame">
          <div className="at-glass">
            <div className="at-screen stage"><AgentScreen name={a.name} step={step} /></div>
          </div>
        </div>
        <span className="chip at-tag">{a.tag}</span>
        <h3 className="at-name">{a.name}</h3>
        <p className="at-hit">Stands in for <b>{a.stands}</b></p>
        <ul className="ticks ticks-ic">
          {a.points.map((p) => <li key={p}><CircleCheck aria-hidden size={18} strokeWidth={2} />{p}</li>)}
        </ul>
      </article>
    </div>
  );
}
