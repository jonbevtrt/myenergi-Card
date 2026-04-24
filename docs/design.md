# Visual design spec

This document describes the visual language of the card. It should be kept
in sync with the actual implementation in `src/styles.ts` and
`src/myenergi-card.ts`.

## Reference

The card is modelled after the "Eco" screen in the official myenergi
mobile app: a hexagonal power-flow diagram on a dark background, with a
central eco-score node and peripheral circles for each connected device.

## Layout

- The card is a square `aspect-ratio: 1 / 1` container inside a standard
  `<ha-card>`.
- The diagram is rendered as a responsive SVG that fills the container.
- The SVG view-box is `0 0 400 400`. All positions below are in view-box
  units so the card scales cleanly.
- The **centre node** sits at `(200, 220)` (slightly below geometric
  centre to leave room for the title).
- **Peripheral nodes** are laid out at fixed angles around the centre at
  radius `r = 135`:
  
  | Slot        | Angle (deg) | Position            |
  |-------------|-------------|---------------------|
  | top         | 270         | (200,  85)          |
  | top-right   | 330         | (317, 153)          |
  | bottom-right| 30          | (317, 287)          |
  | bottom      | 90          | (200, 355)          |
  | bottom-left | 150         | (83,  287)          |
  | top-left    | 210         | (83,  153)          |

  (Angles use the screen convention: 0° = east, 90° = south.)

- By default the six slots map to: `home` (top), `grid` (top-right),
  `solar` (bottom-right), `eddi` (bottom), `zappi` (bottom-left),
  `libbi` (top-left).
- If fewer than six entities are configured, empty slots are hidden.

## Nodes

Each node is a 72-unit-diameter circle with a 3-unit coloured stroke.

- Stroke colour follows the device: grid=orange, solar=green, home=magenta,
  battery=orange/green depending on charge/discharge, EV=grey when idle /
  green when charging / orange when V2H, eddi=red.
- Fill is `--card-background-color` so the node reads as a "hole" in the
  diagram.
- Inside the circle, a Material Design icon in the device colour at
  36-unit size.
- The **power label** sits outside the circle, on the side away from the
  centre, in the device colour.
- The **name label** (e.g. "LIBBI", "3.2 kW") appears above the circle in
  the same colour, all-caps, 11-unit font.
- A small badge overlays the top-right of the circle when relevant:
  - battery: ▶ when discharging, ⏸ when idle, ⏵ charging arrow
  - EV: plug-off icon on a blue background when unplugged.

## Centre node

- 84-unit diameter.
- Green leaf icon in the centre.
- Large "100%" label centred inside (eco score, configurable).
- Stroke colour is `--myenergi-green` (#2ecc71).

## Connection lines

- Drawn as straight SVG lines from the centre node's edge to each
  peripheral node's edge.
- Stroke: `rgba(255,255,255,0.15)`, 2 units thick.
- When power is flowing along a line (> configurable threshold, default
  0.05 kW), a chain of three green chevron glyphs (▶) animates from the
  "source" end to the "sink" end using an SVG `<animateMotion>` tied to
  the line's path, with a 1.8 s duration.
- Direction of flow:
  - solar → centre (solar producing)
  - centre → home (always, while home consumes)
  - centre → grid (exporting) or grid → centre (importing)
  - centre → libbi (charging) or libbi → centre (discharging)
  - centre → zappi (charging) or zappi → centre (V2H; rare)
  - centre → eddi (diverting to hot water)

## Colours

Defined as CSS custom properties on the card host so they can be themed:

```css
--myenergi-green:   #2ecc71;
--myenergi-orange:  #f39c12;
--myenergi-red:     #e74c3c;
--myenergi-magenta: #c71585;
--myenergi-blue:    #3498db;
--myenergi-grey:    #555c66;
--myenergi-bg:      #0b0d10;
--myenergi-fg:      #ffffff;
--myenergi-dim:     rgba(255,255,255,0.55);
--myenergi-line:    rgba(255,255,255,0.15);
```

On light themes these can be overridden by the user's HA theme.

## Title bar

- `<ha-icon icon="mdi:menu">` on the left (purely decorative; tapping does
  nothing unless `title_tap_action` is configured).
- Title text (configurable) in 18 px regular white.
- Title is hidden when `title: false` is set in the config.

## Footer

- Optional "myenergi" wordmark (SVG) centred at the bottom in
  `--myenergi-dim`. Hidden when `show_footer: false`.

## Responsiveness

- Below `@container (max-width: 320px)` peripheral labels switch to a
  shorter format ("3.2" instead of "3.2 kW").
- The card respects `card_mod` overrides – no !important declarations.

## Accessibility

- Each node is labelled with a `<title>` element providing "Name – value
  kW" for screen readers.
- Animations respect `prefers-reduced-motion`.
