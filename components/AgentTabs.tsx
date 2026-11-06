"use client";

import { useRef, useState, type ReactNode } from "react";
import { Collect, Distribute, Identify, Inbox, Order, Quote, Remember, type LucideIcon } from "./PixelIcons";

// The live agent card, carrying the v2 HTML's copy word for word: tag, name, "Stands in for", two points.
type Agent = { name: string; tag: string; stands: string; points: string[]; Icon: LucideIcon; art: ReactNode };

const AGENTS: Agent[] = [
  {
    name: "Inbox", tag: "WhatsApp · email · calls · stalls", Icon: Inbox,
    stands: "the five phones and inboxes your team checks",
    points: ["WhatsApp, email and calls in one shared inbox", "Assign a chat, hand it over, never lose one"],
    art: (
      <div className="w-stack">
        <span className="wg"><i className="cdot" style={{ background: "#25a244" }} /><b>Kapoor Decor</b> same as last time, 2 rolls</span>
        <span className="wg"><i className="cdot" style={{ background: "#6a88e2" }} /><b>Raj Electricals</b> RFQ_nov.xlsx</span>
        <span className="wg"><i className="cdot" style={{ background: "#f2b53a" }} /><b>Patel Textiles</b> card from stall B-14</span>
      </div>
    ),
  },
  {
    name: "Identify", tag: "Product photos", Icon: Identify,
    stands: "searching the catalogue by hand",
    points: ["Matches a photo or a description to your code", "Asks your team when it isn't sure"],
    art: (
      <div className="w-id">
        <span className="w-sw" />
        <div className="wg col" style={{ maxWidth: 170 }}>
          <b>Zyra 14 · Ivory</b>
          <span className="w-bar"><i style={{ width: "98%" }} /></span>
          <small>98% match · NH 3867</small>
        </div>
      </div>
    ),
  },
  {
    name: "Quote", tag: "RFQs · email · Excel", Icon: Quote,
    stands: "a day of lookups in old quotes",
    points: ["Works out the BOM and finds each line in your old quotes", "Prices it on today's rates"],
    art: (
      <div className="wg col">
        <small>Proposal · RFQ-1042 v2</small>
        <b className="big">₹4,12,560</b>
        <span className="w-row"><span>Copper rate</span><em className="up">up 4.1%</em></span>
        <span className="w-row"><span>1 line</span><em className="wt">to your team</em></span>
      </div>
    ),
  },
  {
    name: "Order", tag: "Orders", Icon: Order,
    stands: "typing orders into Tally",
    points: ["Every message becomes a draft order", "Saved to your ERP once your team says yes"],
    art: (
      <div className="wg col">
        <span className="w-row"><b>SO-1042 · Shah Furnishings</b></span>
        <span className="w-row"><span>2 rolls · Zyra 14</span><span>₹48,600</span></span>
        <span className="w-row"><span className="w-yes">Approved</span><span className="w-sync">Synced to Tally</span></span>
      </div>
    ),
  },
  {
    name: "Distribute", tag: "Distributors · reps", Icon: Distribute,
    stands: "forwarding the stock PDF",
    points: ["Sends today's stock to every distributor", "Their orders come back as drafts"],
    art: (
      <div className="w-stack">
        <span className="wg"><b>Daily stock · 9:00</b> Zyra 14 Ivory, 340 m</span>
        <span className="wg"><b className="big">11</b> orders back today</span>
      </div>
    ),
  },
  {
    name: "Collect", tag: "Invoices · payments", Icon: Collect,
    stands: "chasing payments on the phone",
    points: ["Sends a polite reminder on time", "Matches each payment to its invoice"],
    art: (
      <div className="w-stack">
        <span className="wg"><b>Reminder sent</b> INV-2231 · due today</span>
        <span className="wg"><b>₹48,600 received</b> matched to INV-2231</span>
      </div>
    ),
  },
  {
    name: "Remember", tag: "Business memory", Icon: Remember,
    stands: "the rates nobody wrote down",
    points: ["Every customer's rate, usual order and habits", "Every other agent works from it"],
    art: (
      <div className="wg col">
        <b>Shree Ganesh Furnishings</b>
        <span className="w-row"><span>Band A · 10% off</span><em>price list</em></span>
        <span className="w-row"><span>6 rolls every 2 days</span><em>orders</em></span>
        <span className="w-row"><span>Wants swatches first</span><em>chats</em></span>
      </div>
    ),
  },
];

export default function AgentTabs() {
  const [i, setI] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);
  const a = AGENTS[i];

  const pick = (n: number, btn: HTMLButtonElement) => {
    setI(n);
    const c = rowRef.current;
    if (c) c.scrollTo({ left: Math.max(0, btn.offsetLeft - (c.clientWidth - btn.offsetWidth) / 2), behavior: "smooth" });
  };

  return (
    <>
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
            onClick={(e) => pick(n, e.currentTarget)}
          >
            <span className="at-ico"><ag.Icon aria-hidden /></span>
            {ag.name}
          </button>
        ))}
      </div>
      <article className="at-card" key={a.name} id="agent-panel" role="tabpanel" aria-labelledby={`tab-${a.name}`}>
        <div className="at-frame">
          <span className="at-frame-bg" aria-hidden="true" />
          <div className="at-glass">
            <div className="at-screen stage">{a.art}</div>
          </div>
        </div>
        <span className="chip at-tag">{a.tag}</span>
        <h3 className="at-name">{a.name}</h3>
        <p className="at-hit">Stands in for <b>{a.stands}</b></p>
        <ul className="ticks">
          {a.points.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </article>
    </>
  );
}
