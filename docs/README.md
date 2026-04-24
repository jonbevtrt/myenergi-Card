# myenergi Card – Developer Documentation

This folder contains the design and developer documentation for the
**myenergi Card** – a custom Lovelace card for Home Assistant that renders a
hexagonal power-flow diagram in the same visual language as the official
myenergi mobile app.

Per the repo's user rules, this folder must be read before making any change
to the codebase.

## Contents

| File | Purpose |
| ---- | ------- |
| `design.md` | Visual design spec – geometry, colours, states, animations |
| `configuration.md` | End-user YAML / visual-editor configuration reference |
| `entities.md` | How each myenergi entity is interpreted by the card |
| `development.md` | Local development, build & install instructions |

## Quick links

- Main card source: `../src/myenergi-card.ts`
- Editor source: `../src/myenergi-card-editor.ts`
- Types: `../src/types.ts`
- Styles: `../src/styles.ts`
- Built output: `../dist/myenergi-card.js`

## High-level summary

The card displays up to six peripheral nodes arranged evenly around a
central "Eco / home" node. Each peripheral node represents one of:

- Grid (import / export)
- Solar PV
- Home consumption
- Libbi battery (with SOC %)
- Zappi EV charger (with plug / charging state)
- Eddi hot-water diverter (optional)

Between the centre and each peripheral node, an SVG line is drawn. When
power flows along that line, small green chevron glyphs animate along it in
the direction of energy flow. Nodes are colour-coded and their border
highlights the current power level.

The card is fully driven by Home Assistant entities supplied in the
configuration – no assumptions are made about entity IDs, so the same card
works with the `myenergi` integration, `myenergi_cloud`, generic template
sensors, or manual power sensors.
