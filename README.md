# Anuma home · mobile

The mobile-first ad landing page for anuma.co.in. One page, built for paid traffic.

- **Source of truth:** `anuma-home-mobile-v2.html` (6 Nov). Tokens, shadows and components are ported 1:1 into `app/base.css`.
- **Changes from the 6 Nov call** live in `app/globals.css` (bottom) and `app/page.tsx`:
  outcomes lead after the hero, the ERP gets its own section, the header carries the CTA and a bottom-sheet menu,
  the footer has registration IDs, Ask AI links and a plain-text version (`public/anuma.md`).
- **Button copy is unchanged from the demo** (`Start chat`, `See how it works`).

## Run

```bash
npm install
npm run dev   # http://localhost:3310
```

## Structure

| Path | What |
| --- | --- |
| `app/page.tsx` | The page, section by section (server component) |
| `components/` | Interactive pieces: header and menu, dashboard preview, client reel, agent tabs, team demos, sticky CTA |
| `lib/site.ts` | WhatsApp link, menu items, Ask AI links |
| `public/clients/` | Video stills (placeholders until the client videos arrive) |
| `public/erp/` | ERP logos |

## Placeholders to replace before ads go live

Search the code for `TODO` and `[Designation]`.
