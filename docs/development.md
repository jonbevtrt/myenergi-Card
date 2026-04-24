# Development

## Prerequisites

- Node.js 18+
- npm 9+
- A Home Assistant instance to test against (optional but recommended)

## Install dependencies

```powershell
npm install
```

## Build

```powershell
npm run build      # one-shot production build → dist/myenergi-card.js
npm run watch      # rebuild on change (dev)
```

## Installing into Home Assistant (manual)

1. Copy `dist/myenergi-card.js` to `<config>/www/community/myenergi-card/`.
2. Add the resource in HA:
   - Settings → Dashboards → ⋮ → Resources → Add resource
   - URL: `/local/community/myenergi-card/myenergi-card.js`
   - Type: JavaScript module
3. Add a card to your dashboard:

   ```yaml
   type: custom:myenergi-card
   title: "Ivy Farm Barn"
   grid:   { power: sensor.grid_power }
   solar:  { power: sensor.solar_power }
   libbi:  { power: sensor.libbi_power, soc: sensor.libbi_soc }
   zappi:  { power: sensor.zappi_power, plug: binary_sensor.zappi_plugged }
   eddi:   { power: sensor.eddi_power }
   ```

## Installing via HACS (custom repo)

1. HACS → Frontend → ⋮ → Custom repositories
2. Add repo URL, category = Lovelace
3. Install "myenergi Card"
4. Add the resource if HACS doesn't do it automatically.

## Layout / ViewBox math

Coordinates are described in `docs/design.md`. When adjusting the layout,
update the constants in `src/const.ts` and the spec at the same time.

## Code style

- Lit 3 + TypeScript strict mode.
- No external runtime CSS – all styles live in `src/styles.ts` inside the
  component as a `css` tagged template literal.
- Keep imports ESM-only; Rollup bundles everything into a single file.

## Linting & formatting

```powershell
npm run lint
npm run format
```
