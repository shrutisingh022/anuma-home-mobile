"use client";

import { useState } from "react";
import {
  ChevronDown, Cog, Droplets, Factory, FlaskConical, Gift, Hammer, Package, PlugZap, Ship, Shirt, Smartphone, Wrench, type LucideIcon,
} from "lucide-react";

// Who it's for, one card per industry, top to bottom, five showing until opened, each with an
// icon, the industry and one line. Icons sit in the black glass tile the agent tabs use.
const INDUSTRIES: [LucideIcon, string, string][] = [
  [Shirt, "Fabric and textiles", "Swatch photos, shades, rolls and metres"],
  [Smartphone, "Consumer electronics", "Daily stock to every distributor"],
  [PlugZap, "Electricals", "Thousands of SKUs, RFQs of 900 lines"],
  [Droplets, "Pumps", "Specs and drawings in, custom quotes out"],
  [Hammer, "Die casting", "Part drawings, tooling and repeat orders"],
  [Wrench, "Pipes and fittings", "Sizes, grades and project tenders"],
  [Cog, "Gears and machining", "Drawings in, quotes out, fast"],
  [Factory, "Steel and metals", "Rates that move every day"],
  [FlaskConical, "Pharma and chemicals", "Grades, batches and repeat orders"],
  [Ship, "Export and custom goods", "A new product for every enquiry"],
  [Gift, "Handcrafted goods", "Bulk orders for corporates and stores"],
  [Package, "Packaging", "Sizes, prints and reorders"],
];

export function Industries() {
  const [all, setAll] = useState(false);
  const shown = all ? INDUSTRIES : INDUSTRIES.slice(0, 5);
  return (
    <>
      <div className="inds" id="industries">
        {shown.map(([I, name, line]) => (
          <div className="ind" key={name}>
            <span className="ind-ic"><I aria-hidden size={17} strokeWidth={1.8} /></span>
            <span className="ind-t"><b>{name}</b><span className="ind-d">{line}</span></span>
          </div>
        ))}
      </div>
      <button type="button" className="ind-more" aria-expanded={all} aria-controls="industries" onClick={() => setAll((v) => !v)}>
        {all ? "Show fewer" : `Show all ${INDUSTRIES.length} industries`}
        <ChevronDown aria-hidden size={16} style={{ transform: all ? "rotate(180deg)" : undefined }} />
      </button>
    </>
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
  // One open at a time, none to start. Height animates with a 0fr → 1fr grid row, which is smooth in every browser.
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="faq-list">
      {FAQ.map(([q, a], i) => {
        const on = open === i;
        return (
          <div key={q} className={`faq${on ? " is-open" : ""}`}>
            <h3>
              <button type="button" aria-expanded={on} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(on ? null : i)}>
                <span>{q}</span>
                <ChevronDown className="faq-chevron" aria-hidden />
              </button>
            </h3>
            <div className="faq-a" id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} inert={!on}>
              <div><p>{a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
