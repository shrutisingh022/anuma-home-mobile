export const WA_URL = "https://wa.me/919167000410";

export const NAV = [
  { href: "#clients", label: "Clients", hint: "Outcomes" },
  { href: "#platform", label: "The agents", hint: "7 agents" },
  { href: "#erp", label: "Your ERP", hint: "Tally, SAP, Zoho" },
  { href: "#process", label: "How we start", hint: "4 steps" },
  { href: "#questions", label: "Questions", hint: "FAQ" },
];

const ASK = "Explain what Anuma (anuma.co.in) does for Indian manufacturers and B2B sellers, in simple words.";
export const ASK_AI = [
  { label: "ChatGPT", href: `https://chatgpt.com/?q=${encodeURIComponent(ASK)}` },
  { label: "Claude", href: `https://claude.ai/new?q=${encodeURIComponent(ASK)}` },
  { label: "Perplexity", href: `https://www.perplexity.ai/search?q=${encodeURIComponent(ASK)}` },
  { label: "Google AI", href: `https://www.google.com/search?udm=50&q=${encodeURIComponent(ASK)}` },
];
