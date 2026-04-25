# Configuration reference

All keys are optional unless marked **required**. Any node whose entity is
not provided is hidden and its connection line is removed.

## Top-level keys

| Key              | Type             | Default          | Description |
|------------------|------------------|------------------|-------------|
| `type`           | string (required)| —                | Must be `custom:myenergi-card` |
| `title`          | string \| false  | "myenergi"       | Title shown in the card header. `false` hides it. |
| `eco_score`      | string (entity)  | —                | Entity whose state (0-100) is shown in the centre node. |
| `show_footer`    | boolean          | `true`           | Show the "myenergi" wordmark at the bottom. |
| `flow_threshold` | number (kW)      | `0.05`           | Power below this is treated as zero (no animation). |
| `power_unit`     | `kW` \| `W`      | `kW`             | Unit shown on labels. The card auto-converts sensors whose `unit_of_measurement` differs. |
| `chevron_thresholds` | `[number, number]` | `[1, 3]`     | Power magnitudes (kW) at which the animated chevron count steps from 1 → 2 → 3. |
| `grid`           | NodeConfig       | —                | Grid import/export node. |
| `solar`          | NodeConfig       | —                | Solar PV generation node. |
| `home`           | NodeConfig       | —                | Home consumption node. |
| `libbi`          | BatteryConfig    | —                | Libbi battery node. |
| `zappi`          | ZappiConfig      | —                | Zappi EV charger node. |
| `eddi`           | EddiConfig       | —                | Eddi hot-water diverter node. |

## `NodeConfig`

```yaml
power: sensor.grid_power          # required – signed or unsigned power in kW or W
name: "Grid"                      # optional – defaults to the slot name
icon: mdi:transmission-tower      # optional – override the default icon
invert: false                     # optional – flip the sign of `power`
```

## `BatteryConfig` (extends NodeConfig)

```yaml
power: sensor.libbi_power         # positive = discharging to home, negative = charging
soc: sensor.libbi_soc             # optional – state of charge in %
name: "LIBBI"
```

If `soc` is provided, the ten internal bars of the libbi glyph are used
as a fuel gauge: `ceil(soc / 10)` bars are drawn in the node's state
colour and the remaining bars are dimmed. If `soc` is omitted, the
battery glyph is rendered full-charge.

## `ZappiConfig` (extends NodeConfig)

```yaml
power: sensor.zappi_power
plug: binary_sensor.zappi_plugged # optional – on = plugged in
status: sensor.zappi_status       # optional – "Charging", "Boosting", "EV Disconnected", ...
```

## `EddiConfig` (extends NodeConfig)

```yaml
power: sensor.eddi_power
heater_type: tank                 # optional – tank | pool | radiator | underfloor
```

The `heater_type` selects which of the myenergi app heater glyphs is
drawn inside the eddi node. It is purely visual and has no effect on the
power values.

## Example

```yaml
type: custom:myenergi-card
title: "Ivy Farm Barn"
eco_score: sensor.myenergi_eco_score
grid:
  power: sensor.grid_power
solar:
  power: sensor.solar_power
home:
  power: sensor.home_power
libbi:
  power: sensor.libbi_power
  soc: sensor.libbi_soc
zappi:
  power: sensor.zappi_power
  plug: binary_sensor.zappi_plugged
  status: sensor.zappi_status
eddi:
  power: sensor.eddi_power
  heater_type: tank               # tank | pool | radiator | underfloor
```

## Sign conventions

The card uses the following sign convention for every `power` sensor:

| Sensor   | Positive means           | Negative means              |
|----------|--------------------------|-----------------------------|
| `grid`   | importing from grid      | exporting to grid           |
| `solar`  | producing                | (treated as 0)              |
| `home`   | consuming                | (treated as 0)              |
| `libbi`  | discharging (to home)    | charging (from solar/grid)  |
| `zappi`  | charging car             | V2H (very rare – to home)   |
| `eddi`   | diverting to hot water   | (treated as 0)              |

Use `invert: true` on a node if your sensor has the opposite sign.

## Flow animation

For every node with non-zero power, an animated trail of chevrons is drawn
along the connection line. Two things vary based on live data:

- **Direction.** Chevrons follow the actual flow of energy. For example,
  while `libbi` is charging the chevrons travel from the centre toward the
  battery; while it is discharging they travel from the battery toward the
  centre. Same for the grid: importing flows toward the centre, exporting
  flows toward the grid icon.
- **Quantity.** The number of chevrons in motion reflects the magnitude of
  the flow. With the default `chevron_thresholds: [1, 3]`:
  - `|power| < 1 kW` → 1 chevron
  - `1 kW ≤ |power| < 3 kW` → 2 chevrons
  - `|power| ≥ 3 kW` → 3 chevrons

If your installation runs at a different scale (e.g. only ever a few hundred
watts), tune the breakpoints, e.g.:

```yaml
chevron_thresholds: [0.3, 1.5]
```
