"use client";

import { useState } from "react";
import {
  Boxes, ChevronDown, Factory, Hammer, Layers, Package, PencilRuler, Ruler, Shapes, Smartphone, Truck, Zap, type LucideIcon,
} from "./PixelIcons";

// Who it's for, in the live list-card shape (icon tile, name, one line). Six show; the rest open in place.
const INDUSTRIES: [LucideIcon, string, string][] = [
  [Layers, "Fabric and textiles", "Swatch photos, shades, rolls and metres"],
  [Smartphone, "Consumer electronics", "Daily stock to every distributor"],
  [Zap, "Electricals", "Thousands of SKUs, RFQs of 900 lines"],
  [Factory, "Pumps", "Specs and drawings in, custom quotes out"],
  [Hammer, "Die casting", "Part drawings, tooling and repeat orders"],
  [Ruler, "Pipes and fittings", "Sizes, grades and project tenders"],
  [PencilRuler, "Gears and machining", "Drawings in, quotes out, fast"],
  [Boxes, "Steel and metals", "Rates that move every day"],
  [Shapes, "Pharma and chemicals", "Grades, batches and repeat orders"],
  [Truck, "Export and custom goods", "A new product for every enquiry"],
  [Package, "Handcrafted goods", "Bulk orders for corporates and stores"],
  [Boxes, "Packaging", "Sizes, prints and reorders"],
];

export function Industries() {
  const [all, setAll] = useState(false);
  const shown = all ? INDUSTRIES : INDUSTRIES.slice(0, 6);
  return (
    <div className="sv-list">
      <div id="industries">
        {shown.map(([I, b, s]) => (
          <div className="sv-row" key={b}>
            <span className="sv-tile"><I aria-hidden /></span>
            <span><b>{b}</b><span>{s}</span></span>
          </div>
        ))}
      </div>
      <button type="button" className="sv-more" aria-expanded={all} aria-controls="industries" onClick={() => setAll((v) => !v)}>
        {all ? "Show fewer" : `Show all ${INDUSTRIES.length} industries`}
        <ChevronDown aria-hidden />
      </button>
    </div>
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
