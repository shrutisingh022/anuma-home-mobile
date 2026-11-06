// One small, animated screen per agent, in the same card language as the team section's
// workflow and roles demos: a header with a glass icon, rows with an icon and two lines,
// the key row highlighted, and a quiet status line at the foot.
// Each screen plays as a short story, one step at a time: `s` is the current step. Mock data only.
import {
  Bell, BookOpen, CheckCheck, CircleCheck, Eye, FileSpreadsheet, FileText, IndianRupee, Inbox, Mail, MessageCircle, Package, Palette,
  Phone, Repeat, ScanLine, Send, Sparkles, Tag, UserCheck, Users, type LucideIcon,
} from "lucide-react";

export const STEPS: Record<string, number> = {
  Inbox: 5, Identify: 4, Quote: 5, Order: 4, Distribute: 4, Collect: 4, Remember: 5,
};

type Row = {
  I: LucideIcon;
  t: string;
  d: string;
  at: number;            // step it appears on
  key?: boolean;         // the row that matters: glass icon
  pill?: { from?: [string, string]; to: [string, string]; at: number }; // [label, tone]
  photo?: boolean;
  meter?: number;
};

type Screen = {
  I: LucideIcon;
  title: string;
  sub: string;
  rail?: boolean;        // steps joined by a line
  rows: Row[];
  status: (s: number) => string;
  head?: { from: [string, string]; to: [string, string]; at: number };
};

const SCREENS: Record<string, Screen> = {
  Inbox: {
    I: Inbox, title: "Inbox", sub: "WhatsApp, email and calls, together",
    rows: [
      { I: MessageCircle, t: "Kapoor Decor", d: "WhatsApp · Same as last time, 2 rolls", at: 1, pill: { from: ["New", "grey"], to: ["Draft ready", "green"], at: 4 } },
      { I: Mail, t: "Raj Electricals", d: "Email · RFQ_nov.xlsx, 212 lines", at: 2, pill: { from: ["New", "grey"], to: ["To Ravi", "violet"], at: 4 } },
      { I: Phone, t: "Patel Textiles", d: "Missed call · voice note 0:42", at: 3, pill: { from: ["New", "grey"], to: ["Called back", "green"], at: 5 } },
    ],
    status: (s) => (s < 4 ? `${Math.min(s, 3)} new, from 3 channels` : s < 5 ? "Sorted and assigned" : "Nothing missed today"),
  },
  Identify: {
    I: ScanLine, title: "Product match", sub: "Photo from Shah Furnishings", rail: true,
    rows: [
      { I: MessageCircle, t: "Same design in ivory?", d: "Customer photo on WhatsApp", at: 1, photo: true },
      { I: ScanLine, t: "Zyra 14 · Ivory", d: "Matched in your catalogue · NH 3867", at: 2, meter: 98 },
      { I: Package, t: "340 m in stock", d: "Today's rate ₹245/m", at: 3 },
      { I: Send, t: "Reply sent", d: "Stock and rate, in seconds", at: 4, key: true },
    ],
    status: (s) => (s < 3 ? "Comparing 1,240 designs" : s < 4 ? "98% sure, no need to ask" : "Customer has the answer"),
  },
  Quote: {
    I: FileSpreadsheet, title: "RFQ-1042", sub: "Raj Electricals · 4 lines",
    rows: [
      { I: FileText, t: "GI earth strip, 50 x 6 mm", d: "GIS5006", at: 1, pill: { to: ["93%", "green"], at: 1 } },
      { I: FileText, t: "Exothermic weld powder", d: "EXP0115", at: 2, pill: { to: ["91%", "green"], at: 2 } },
      { I: FileText, t: "Copper bonded rod, 3 m", d: "CBR1730", at: 3, pill: { to: ["78%", "amber"], at: 3 } },
      { I: Users, t: "Surge protection, type 1+2", d: "Not sure, sent to your team", at: 4, pill: { to: ["41%", "red"], at: 4 } },
      { I: IndianRupee, t: "₹4,12,560", d: "Priced on today's rates", at: 5, key: true },
    ],
    status: (s) => (s < 5 ? `Matching line ${Math.min(s + 1, 4)} of 4` : "Quote ready to send"),
  },
  Order: {
    I: FileText, title: "DRF-214", sub: "Shah Furnishings", rail: true,
    head: { from: ["Needs a yes", "amber"], to: ["Approved", "green"], at: 3 },
    rows: [
      { I: MessageCircle, t: "“Same as last time, 2 rolls”", d: "WhatsApp, 11:42 am", at: 1 },
      { I: FileText, t: "Draft order made", d: "Zyra 14 Ivory · 2 rolls · ₹48,600", at: 2 },
      { I: UserCheck, t: "Ravi approved", d: "One tap, on his phone", at: 3 },
      { I: CircleCheck, t: "Saved to Tally", d: "SO-1042 · nobody typed it", at: 4, key: true },
    ],
    status: (s) => (s < 3 ? "Waiting for your team's yes" : s < 4 ? "Approved, saving" : "In your ERP"),
  },
  Distribute: {
    I: Send, title: "Today's stock", sub: "9:00 am · 52 distributors", rail: true,
    rows: [
      { I: Send, t: "Sent to 52", d: "Stock list on WhatsApp", at: 1 },
      { I: CheckCheck, t: "Delivered to 48", d: "4 phones were off", at: 2 },
      { I: Eye, t: "Read by 37", d: "By 9:40 am", at: 3 },
      { I: Package, t: "11 orders back", d: "Waiting as drafts", at: 4, key: true },
    ],
    status: (s) => (s < 4 ? "Going out" : "Orders coming back"),
  },
  Collect: {
    I: IndianRupee, title: "INV-2231", sub: "Mehta Drapes · ₹48,600", rail: true,
    head: { from: ["Due today", "amber"], to: ["Paid", "green"], at: 3 },
    rows: [
      { I: Bell, t: "Reminder sent", d: "WhatsApp, 10:00 am · polite, in Hindi", at: 1 },
      { I: IndianRupee, t: "₹48,600 received", d: "UPI, 2:14 pm", at: 2 },
      { I: CircleCheck, t: "Matched to INV-2231", d: "Marked paid in Tally", at: 3, key: true },
    ],
    status: (s) => (s < 3 ? "Following up" : "Nobody had to call"),
  },
  Remember: {
    I: BookOpen, title: "Shree Ganesh Furnishings", sub: "Pune · dealer since 2019",
    rows: [
      { I: Tag, t: "Band A, 10% off list", d: "From the price list", at: 1 },
      { I: Repeat, t: "6 rolls every 2 days", d: "From orders", at: 2 },
      { I: Palette, t: "Beige and Ivory, 45 m rolls", d: "From orders", at: 3 },
      { I: Sparkles, t: "Wants the swatch book first", d: "From chats", at: 4, key: true },
    ],
    status: (s) => (s < 5 ? "Learning from orders and chats" : "Every agent works from this"),
  },
};

function Pill({ label, tone }: { label: string; tone: string }) {
  return <span className={`ag-pill is-${tone}`}><i />{label}</span>;
}

function Swap({ from, to, on }: { from?: [string, string]; to: [string, string]; on: boolean }) {
  return (
    <span className={`ag-swap${on ? " two" : ""}`}>
      {from ? <Pill label={from[0]} tone={from[1]} /> : <span className="ag-dots"><i /><i /><i /></span>}
      <Pill label={to[0]} tone={to[1]} />
    </span>
  );
}

const ALT: Record<string, string> = {
  Inbox: "A WhatsApp message, an email and a missed call arrive in one inbox, then get a draft order, an owner and a call back",
  Identify: "A customer's photo is matched to Zyra 14 Ivory at 98%, and the stock and rate are sent back",
  Quote: "Each RFQ line is matched to a catalogue code, and a quote is priced on today's rates",
  Order: "A WhatsApp message becomes a draft order, is approved, and is saved to Tally",
  Distribute: "Today's stock goes to 52 distributors, and 11 orders come back as drafts",
  Collect: "A payment reminder goes out, the payment arrives, and it is matched to the invoice",
  Remember: "Anuma's memory of one customer: rates, usual order and habits",
};

export function AgentScreen({ name, step: s }: { name: string; step: number }) {
  const sc = SCREENS[name];
  return (
    <div className="ag" role="img" aria-label={ALT[name]}>
      <div className="wx">
        <div className="wx-head">
          <span className="wx-av"><sc.I size={16} strokeWidth={2} /></span>
          <span className="wx-n"><b>{sc.title}</b><small>{sc.sub}</small></span>
          {sc.head && <Swap from={sc.head.from} to={sc.head.to} on={s >= sc.head.at} />}
        </div>
        <div className={`wx-body${sc.rail ? " rail" : ""}`}>
          {sc.rows.map((r, n) => (
            <div className={`wx-row${s >= r.at ? " on" : ""}${r.key ? " is-key" : ""}`} key={r.t}>
              <span className="wx-railc" aria-hidden="true">
                <span className="wx-ic"><r.I size={14} strokeWidth={2} /></span>
                {sc.rail && n < sc.rows.length - 1 && <span className="wx-line" />}
              </span>
              <span className="wx-txt">
                <b>{r.t}</b>
                <small>{r.d}</small>
                {r.photo && <span className={`wx-photo${s === 1 || s === 2 ? " scan" : ""}`}><i /></span>}
                {r.meter && <span className="wx-meter"><i style={{ width: s >= r.at + 1 ? `${r.meter}%` : "6%" }} /></span>}
              </span>
              {r.pill && <Swap from={r.pill.from} to={r.pill.to} on={s >= r.pill.at} />}
            </div>
          ))}
        </div>
        <div className="wx-log"><span className="ag-live" />{sc.status(s)}</div>
      </div>
    </div>
  );
}
