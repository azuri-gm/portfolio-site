# Browse + Chat Contrast Color Proposal

This proposal keeps the existing violet/mint aesthetic while improving readability for pills and message bubbles.

## Palette

- **Browse pill background**: `hsl(165 31% 67%)` (`#8EC8B9`)
- **Browse pill text**: `hsl(244 30% 21%)` (`#282655`)
- **Browse pill border**: `hsl(166 31% 52%)` (`#5FAE97`)
- **Browse pill contrast**: **7.54:1** (AA/AAA for normal text)

- **Incoming chat bubble background**: `hsl(218 47% 80%)` (`#B5C8E7`)
- **Incoming chat bubble text**: `hsl(239 28% 20%)` (`#242647`)
- **Incoming bubble contrast**: **8.55:1** (AA/AAA for normal text)

- **Outgoing chat bubble background**: `hsl(243 43% 40%)` (`#4640A2`)
- **Outgoing chat bubble text**: `hsl(210 40% 98%)` (`#F6FAFD`)
- **Outgoing bubble contrast**: **8.99:1** (AA/AAA for normal text)

- **Chat metadata text**: `hsl(231 20% 82%)` (`#C7CCE0`)

## Usage guidance

- Use the mint pill tone for category/status chips with dark text only.
- Use the light steel-blue bubble for incoming messages and deep violet for outgoing messages.
- Avoid white text on very light bubble backgrounds.
- Preserve decorative glows/noise overlays, but do not lower text opacity below 90% on these surfaces.

## Added utility classes

- `.browse-pill-readable`
- `.chat-bubble-in-readable`
- `.chat-bubble-out-readable`
- `.chat-meta-readable`

These classes map to semantic CSS tokens in `app/globals.css` so components can adopt accessible colors without hardcoding values.

## Tailwind/UI integration

- `tailwind.config.ts` maps tokens into `browse` and `chat` color groups.
- `Badge` now includes a `browse` variant:
  - `bg-browse-pill`
  - `text-browse-pill-foreground`
  - `border-browse-pill-border`
