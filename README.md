# myenergi Card

A custom [Home Assistant](https://www.home-assistant.io/) Lovelace card that
renders a hexagonal power-flow diagram in the same visual language as the
official **myenergi** mobile app.

![screenshot](docs/screenshot-reference.png)

It is designed around the myenergi ecosystem (**Zappi**, **Eddi**,
**Libbi**, **Harvi**), but works with any power sensors, so it can be used as
a general-purpose home energy flow card too.

## Features

- Central "Eco" node with optional 0-100% eco score.
- Up to six peripheral nodes: **Home**, **Grid**, **Solar**, **Libbi**,
  **Zappi**, **Eddi** – arranged on a hexagon.
- Animated green chevrons on each connection line indicate power-flow
  direction and stop when power falls below a configurable threshold.
- Colour-coded node borders that react to state (e.g. grid turns green
  when exporting, orange when importing; battery green when charging,
  orange when discharging).
- Battery state-of-charge fill inside the Libbi circle.
- Zappi plug / charging / boost state badge.
- Full visual editor (no YAML required).
- Respects `prefers-reduced-motion` for accessibility.

## Installation

### Via HACS (recommended)

1. HACS → Frontend → ⋮ → **Custom repositories**.
2. Add this repository URL, category = **Lovelace**.
3. Install **myenergi Card**.
4. If HACS doesn't add the resource automatically, go to Settings →
   Dashboards → ⋮ → Resources and add:
   - URL: `/hacsfiles/myenergi-card/myenergi-card.js`
   - Type: JavaScript module.

### Manual

1. Download `dist/myenergi-card.js` from the latest release.
2. Copy it to `<config>/www/community/myenergi-card/`.
3. Add the resource:
   - URL: `/local/community/myenergi-card/myenergi-card.js`
   - Type: JavaScript module.

## Usage

Add a card to your dashboard:

```yaml
type: custom:myenergi-card
title: "Ivy Farm Barn"
eco_score: sensor.myenergi_eco_score
grid:
  power: sensor.grid_power
solar:
  power: sensor.solar_power
libbi:
  power: sensor.libbi_power
  soc: sensor.libbi_soc
zappi:
  power: sensor.zappi_power
  plug: binary_sensor.zappi_plugged
  status: sensor.zappi_status
eddi:
  power: sensor.eddi_power
```

The full configuration reference lives in
[`docs/configuration.md`](docs/configuration.md).

## Screenshots

The card is modelled on the "Eco" screen from the myenergi mobile app:

- Central green leaf with the eco score.
- House, Grid, Solar, Libbi, Zappi, Eddi nodes arranged around the centre.
- Animated chevrons between the centre and each node to show flow.

## Development

See [`docs/development.md`](docs/development.md) for local build
instructions.

```powershell
npm install
npm run build
```

## License

MIT – see [`LICENSE`](LICENSE).

## Disclaimer

This project is not affiliated with or endorsed by myenergi ltd. "myenergi",
"Zappi", "Eddi", "Libbi" and "Harvi" are trademarks of myenergi ltd.
