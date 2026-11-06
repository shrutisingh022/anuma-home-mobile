"use client";

import {
  ChevronDown, Cog, Droplets, Factory, FlaskConical, Gift, Hammer, Package, PlugZap, Ship, Shirt, Smartphone, Wrench, type LucideIcon,
} from "lucide-react";

// Who it's for: all twelve industries at once, as a two-column grid of tiles inside one card.
const INDUSTRIES: [LucideIcon, string][] = [
  [Shirt, "Fabric and textiles"],
  [Smartphone, "Consumer electronics"],
  [PlugZap, "Electricals"],
  [Droplets, "Pumps"],
  [Hammer, "Die casting"],
  [Wrench, "Pipes and fittings"],
  [Cog, "Gears and machining"],
  [Factory, "Steel and metals"],
  [FlaskConical, "Pharma and chemicals"],
  [Ship, "Export and custom goods"],
  [Gift, "Handcrafted goods"],
  [Package, "Packaging"],
];

export function Industries() {
  return (
    <ul className="ind-grid" aria-label="Industries">
      {INDUSTRIES.map(([I, name]) => (
        <li key={name}>
          <span className="ind-ic"><I aria-hidden size={18} strokeWidth={1.75} /></span>
          <span className="ind-n">{name}</span>
        </li>
      ))}
    </ul>
  );
}

// Questions: the v2 HTML's accordion and answers, word for word, the first one open.
const FAQ: [string, string][] = [
  ["What is this, and what do I do?", "Your team keeps doing the selling. Anuma does the reading, typing and checking, and hands them a ready order or quote. They check it and say yes."],
  ["Do my customers have to change how they order?", "No. They keep sending WhatsApp messages, emails, photos and voice notes. There is nothing for them to download."],
  ["Will it work with my ERP?", "Yes. Tally, SAP, Odoo, Zoho, Dynamics and ERPNext. If yours is custom, we connect to it, or start with Excel."],
  ["My products are custom. Can it handle that?", "It learns from your own old quotes, orders and catalogue. When it isn't sure, it asks your team. Every answer makes it better."],
  ["Can I see it on my kind of enquiry?", "Yes. We start by looking at a week of your real orders, before we build anything."],
  ["Will my team use it, or is it one more app?", "Your team keeps using WhatsApp and Tally. They get one screen on their phone to approve orders. It removes the typing, not the people."],
  ["Can I make changes myself?", "Yes. Add products, change rates and fix a wrong match yourself. We help with the bigger changes."],
  ["How long before it works?", "You see your first orders prepared within days. It gets better every week."],
  ["Can I see every enquiry and salesperson in one place?", "Yes. Every enquiry, quote and order, who is handling it and what is pending. You get a summary every morning."],
  ["Is my data safe? What if you shut down?", "Your data is kept private and separate. Your orders and quotes are saved in your own ERP, so they stay with you."],
];

export function FaqList() {
  return (
    <div className="faq-list">
      {FAQ.map(([q, a], i) => (
        <details key={q} className="faq" open={i === 0}>
          <summary>
            <span>{q}</span>
            <ChevronDown className="faq-chevron" aria-hidden />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
