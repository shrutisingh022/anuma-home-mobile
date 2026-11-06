// One small, animated screen per agent, in the desktop site's product-crop language
// (anuma-site/wireframe ProductCrops: shadcn zinc, Inter, 10px radius, tinted pills).
// Each screen plays as a short story, one step at a time: `s` is the current step.
// Mock data only.
import {
  Bell, Check, CheckCheck, CircleCheck, FileSpreadsheet, IndianRupee, Mail, MessageCircle, Phone, ScanLine, Send, Sparkles,
} from "lucide-react";

export const STEPS: Record<string, number> = {
  Inbox: 5, Identify: 4, Quote: 5, Order: 4, Distribute: 4, Collect: 4, Remember: 5,
};

function Pill({ tone = "grey", dot, children }: { tone?: string; dot?: boolean; children: React.ReactNode }) {
  return <span className={`ag-pill is-${tone}`}>{dot && <i />}{children}</span>;
}
function Disc({ name, tone }: { name: string; tone: string }) {
  return <span className={`ag-disc is-${tone}`}>{name.split(" ").slice(0, 2).map((w) => w[0]).join("")}</span>;
}
/** Shown from step `at` on, rising in. */
function At({ s, at, children, className = "" }: { s: number; at: number; children: React.ReactNode; className?: string }) {
  return <div className={`ag-in ${s >= at ? "on" : ""} ${className}`}>{children}</div>;
}
function Status({ children }: { children: React.ReactNode }) {
  return <div className="ag-status"><span className="ag-live" />{children}</div>;
}

function InboxScreen({ s }: { s: number }) {
  const rows = [
    { n: "Kapoor Decor", t: "a", I: MessageCircle, ch: "wa", m: "Same as last time, 2 rolls" },
    { n: "Raj Electricals", t: "c", I: Mail, ch: "mail", m: "RFQ_nov.xlsx · 212 lines" },
    { n: "Patel Textiles", t: "d", I: Phone, ch: "call", m: "Missed call · voice note 0:42" },
  ];
  return (
    <div className="ag-app">
      <div className="ag-bar"><b>Inbox</b><span className="ag-tabs"><span className="on">All</span><span>WhatsApp</span><span>Email</span></span></div>
      {rows.map((r, i) => (
        <At s={s} at={i + 1} key={r.n} className="ag-row">
          <Disc name={r.n} tone={r.t} />
          <span className="ag-rt">
            <b>{r.n}<span className={`ag-ch is-${r.ch}`}><r.I strokeWidth={2} /></span></b>
            <small>{r.m}</small>
          </span>
          {i === 0 && <span className={`ag-swap ${s >= 4 ? "two" : ""}`}><Pill>New</Pill><Pill tone="green" dot>Draft ready</Pill></span>}
          {i === 1 && <span className={`ag-swap ${s >= 4 ? "two" : ""}`}><Pill>New</Pill><Pill tone="violet" dot>To Ravi</Pill></span>}
          {i === 2 && <span className={`ag-swap ${s >= 5 ? "two" : ""}`}><Pill>New</Pill><Pill tone="green" dot>Called back</Pill></span>}
        </At>
      ))}
      <Status>{s < 4 ? `${Math.min(s, 3)} new, from 3 channels` : s < 5 ? "Sorted and assigned" : "Nothing missed today"}</Status>
    </div>
  );
}

function IdentifyScreen({ s }: { s: number }) {
  return (
    <div className="ag-app ag-chat">
      <At s={s} at={1} className="ag-bub in">
        <span className={`ag-photo ${s === 2 ? "scan" : ""}`}><i /></span>
        <span>Same design in ivory?</span>
      </At>
      <At s={s} at={2} className="ag-card ag-match">
        <span className="ag-mh"><ScanLine strokeWidth={2} />Matched in your catalogue</span>
        <b>Zyra 14 · Ivory</b>
        <span className="ag-meter"><i style={{ width: s >= 3 ? "98%" : "8%" }} /></span>
        <small>{s >= 3 ? "98% match · NH 3867 · 340 m in stock" : "Comparing 1,240 designs…"}</small>
      </At>
      <At s={s} at={4} className="ag-bub out">
        Yes, Zyra 14 Ivory. 340 m in stock. ₹245/m.
        <span className="ag-tick"><CheckCheck strokeWidth={2} /></span>
      </At>
    </div>
  );
}

function QuoteScreen({ s }: { s: number }) {
  const lines: [string, string, string, string][] = [
    ["GI earth strip, 50 x 6 mm", "GIS5006", "green", "93%"],
    ["Exothermic weld powder", "EXP0115", "green", "91%"],
    ["Copper bonded rod, 3 m", "CBR1730", "amber", "78%"],
    ["Surge protection, type 1+2", "To your team", "red", "41%"],
  ];
  return (
    <div className="ag-app">
      <div className="ag-bar"><span className="ag-tt"><small>Raj Electricals</small><b>RFQ-1042</b></span><FileSpreadsheet className="ag-ml" strokeWidth={1.75} /></div>
      {lines.map(([req, sku, tone, pct], i) => (
        <div className="ag-line" key={req}>
          <span className="ag-lt"><span>{req}</span><small className={s > i ? "on" : ""}>{s > i ? sku : "Looking up…"}</small></span>
          {s > i ? <Pill tone={tone}>{pct}</Pill> : <span className="ag-dots"><i /><i /><i /></span>}
        </div>
      ))}
      <div className={`ag-total ${s >= 5 ? "on" : ""}`}>
        <span><small>Quote total, today&apos;s rates</small><b>₹4,12,560</b></span>
        <span className="ag-btn"><Send strokeWidth={2} />Send quote</span>
      </div>
    </div>
  );
}

function OrderScreen({ s }: { s: number }) {
  return (
    <div className="ag-app ag-chat">
      <At s={s} at={1} className="ag-bub in">Same as last time, 2 rolls. Zyra 14 ivory.</At>
      <At s={s} at={2} className="ag-card ag-draft">
        <span className="ag-dh"><b>DRF-214</b><small>Shah Furnishings</small>
          <span className={`ag-swap ${s >= 3 ? "two" : ""}`}><Pill tone="amber" dot>Needs a yes</Pill><Pill tone="green" dot>Approved</Pill></span>
        </span>
        <span className="ag-dl"><span>Zyra 14 · Ivory · 2 rolls</span><b>₹48,600</b></span>
        <span className="ag-dl"><span>Band A · 10% off · 30 days</span><small>from your rules</small></span>
        <span className={`ag-sync ${s >= 4 ? "on" : ""}`}><CircleCheck strokeWidth={2} />{s >= 4 ? "Saved to Tally as SO-1042" : "Ravi approves on his phone"}</span>
      </At>
    </div>
  );
}

function DistributeScreen({ s }: { s: number }) {
  const n = (v: number, at: number) => (s >= at ? v : 0);
  return (
    <div className="ag-app">
      <div className="ag-bar"><span className="ag-tt"><small>Campaign · 9:00 am</small><b>Today&apos;s stock</b></span><Pill tone={s >= 2 ? "green" : "violet"} dot>{s >= 2 ? "Sent" : "Sending"}</Pill></div>
      <div className="ag-kpis">
        <span><small>Sent</small><b>{n(52, 1)}</b></span>
        <span><small>Delivered</small><b>{n(48, 2)}</b></span>
        <span><small>Read</small><b>{n(37, 3)}</b></span>
      </div>
      <At s={s} at={4} className="ag-back">
        <span className="ag-bh"><b>11 orders back</b><small>as drafts</small></span>
        {[["Mehta Drapes", "b", "6 rolls"], ["Royal Home Studio", "c", "4 rolls"]].map(([nm, t, q]) => (
          <span className="ag-br" key={nm}><Disc name={nm} tone={t} /><span>{nm}</span><small>{q}</small></span>
        ))}
      </At>
    </div>
  );
}

function CollectScreen({ s }: { s: number }) {
  return (
    <div className="ag-app">
      <div className="ag-bar"><span className="ag-tt"><small>Mehta Drapes</small><b>INV-2231</b></span>
        <span className={`ag-swap ${s >= 4 ? "two" : ""}`}><Pill tone="amber" dot>Due today</Pill><Pill tone="green" dot>Paid</Pill></span>
      </div>
      <div className="ag-amt"><IndianRupee strokeWidth={2} /><b>48,600</b></div>
      <div className="ag-steps">
        <At s={s} at={1} className="ag-st"><span className="ag-si"><Bell strokeWidth={2} /></span><span><b>Reminder sent on WhatsApp</b><small>10:00 am · polite, in Hindi</small></span></At>
        <At s={s} at={2} className="ag-st"><span className="ag-si"><IndianRupee strokeWidth={2} /></span><span><b>₹48,600 received</b><small>UPI · 2:14 pm</small></span></At>
        <At s={s} at={3} className="ag-st"><span className="ag-si ok"><Check strokeWidth={2.5} /></span><span><b>Matched to INV-2231</b><small>Marked paid in Tally</small></span></At>
      </div>
    </div>
  );
}

function RememberScreen({ s }: { s: number }) {
  const facts: [string, string][] = [
    ["Band A, 10% off list", "price list"],
    ["6 rolls every 2 days", "orders"],
    ["Beige and Ivory, 45 m rolls", "orders"],
    ["Wants the swatch book first", "chats"],
  ];
  return (
    <div className="ag-app">
      <div className="ag-bar"><Disc name="Shree Ganesh" tone="a" /><span className="ag-tt"><b>Shree Ganesh Furnishings</b><small>Pune · dealer since 2019</small></span></div>
      <div className="ag-know">
        <span className="ag-kh"><Sparkles strokeWidth={2} />What Anuma knows</span>
        {facts.map(([f, src], i) => (
          <At s={s} at={i + 1} key={f} className="ag-fact"><span>{f}</span><small>{src}</small></At>
        ))}
      </div>
      <Status>{s >= 5 ? "Every agent works from this" : "Learning from orders and chats"}</Status>
    </div>
  );
}

const SCREENS: Record<string, (p: { s: number }) => React.ReactElement> = {
  Inbox: InboxScreen, Identify: IdentifyScreen, Quote: QuoteScreen, Order: OrderScreen,
  Distribute: DistributeScreen, Collect: CollectScreen, Remember: RememberScreen,
};

const ALT: Record<string, string> = {
  Inbox: "A WhatsApp message, an email and a missed call arrive in one inbox, then get a draft order, an owner and a call back",
  Identify: "A customer's photo is matched to Zyra 14 Ivory at 98%, and the stock and rate are sent back",
  Quote: "Each RFQ line is matched to a catalogue code, and a quote is priced on today's rates",
  Order: "A WhatsApp message becomes a draft order, is approved, and is saved to Tally",
  Distribute: "Today's stock goes to 52 distributors, and 11 orders come back as drafts",
  Collect: "A payment reminder goes out, the payment arrives, and it is matched to the invoice",
  Remember: "Anuma's memory of one customer: rates, usual order and habits",
};

export function AgentScreen({ name, step }: { name: string; step: number }) {
  const C = SCREENS[name];
  return (
    <div className="ag" role="img" aria-label={ALT[name]}>
      <C s={step} />
    </div>
  );
}

