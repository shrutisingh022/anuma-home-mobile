# Anuma home · mobile

The mobile-first ad landing page for anuma.co.in. One page, built for paid traffic.

- **Visual system:** the live anuma.co.in (source: `anuma-site/wireframe`). Same tokens, hairline cards, painted cards,
  black liquid pill, Morse logo and dot stages, pixel icons (`components/PixelIcons.tsx` is copied from there), chat-style FAQ.
  One deliberate change, per Neil: no serif. Headings use IBM Plex Sans; `--font-display` in `app/globals.css` switches it back.
- **Content and order:** `anuma-home-mobile-v2.html` (6 Nov).
- **Changes from the 6 Nov call** live in `app/page.tsx`:
  outcomes lead after the hero, the ERP gets its own section, the header carries the CTA and a bottom-sheet menu,
  the footer has registration IDs, Ask AI links and a plain-text version (`public/anuma.md`).
- **Button copy is unchanged from the demo** (`Start chat`, `See how it works`).

## Run

```bash
npm install
npm run dev   # http://localhost:3310 (on your phone: http://<your-mac-ip>:3310)
```

## Structure

| Path | What |
| --- | --- |
| `app/page.tsx` | The page, section by section (server component) |
| `components/` | Interactive pieces: header and menu, dashboard preview, client reel, agent tabs, team demos, sticky CTA |
| `lib/site.ts` | WhatsApp link, menu items, Ask AI links |
| `public/clients/` | Video stills (placeholders until the client videos arrive) |
| `public/erp/` | ERP logos |
| `public/art/` | Painted hero, closing card and agent-frame art from the live site |

## Placeholders to replace before ads go live

Search the code for `TODO` and `[Designation]`.
