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
| `grid`           | NodeConfig       | —                | Grid import/export node. |
| `solar`          | NodeConfig       | —                | Solar PV generation node. |
| `home`           | NodeConfig       | —                | Home consumption node. |
| `libbi`          | BatteryConfig    | —                | Libbi battery node. |
| `zappi`          | ZappiConfig      | —                | Zappi EV charger node. |
| `eddi`           | NodeConfig       | —                | Eddi hot-water diverter node. |

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

## `ZappiConfig` (extends NodeConfig)

```yaml
power: sensor.zappi_power
plug: binary_sensor.zappi_plugged # optional – on = plugged in
status: sensor.zappi_status       # optional – "Charging", "Boosting", "EV Disconnected", ...
```

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
