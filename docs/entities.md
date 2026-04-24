# Entity interpretation

The card works with any sensors that expose power values – typical sources
are listed below.

## Recommended sources

### `myenergi` HACS integration (ashleighsenior/myenergi)

| Card slot | Recommended sensor |
|-----------|--------------------|
| `grid.power`   | `sensor.<site>_grid_power`       |
| `solar.power`  | `sensor.<site>_generation_power` |
| `home.power`   | `sensor.<site>_home_power`       |
| `libbi.power`  | `sensor.<libbi_serial>_power`    |
| `libbi.soc`    | `sensor.<libbi_serial>_state_of_charge` |
| `zappi.power`  | `sensor.<zappi_serial>_power`    |
| `zappi.status` | `sensor.<zappi_serial>_status`   |
| `zappi.plug`   | `binary_sensor.<zappi_serial>_plugged_in` |
| `eddi.power`   | `sensor.<eddi_serial>_power`     |

### Generic / template sensors

Any numeric sensor with unit `W` or `kW` works. The card will read
`unit_of_measurement` and convert to the configured `power_unit`.

## Power extraction rules

- Missing entity → node hidden.
- `unavailable` / `unknown` → value treated as 0 but node still shown with
  a dimmed style.
- Values ≤ `flow_threshold` (default 0.05 kW) suppress the flow animation
  and the power label fades to `--myenergi-dim`.

## Battery SOC

- `libbi.soc` may be in `%` or a 0-1 fraction; the card auto-detects.
- The SOC value is shown as a horizontal fill inside the battery icon
  rising from 0% (empty) to 100% (full), coloured with the battery node
  colour.

## Zappi plug & status

The plug badge is chosen in this order:

1. If `plug` entity is `off` / `unplugged` → show the **plug-off** badge
   (blue circle, white plug icon with strike).
2. Else if `status` is `Charging` → show a **play** badge.
3. Else if `status` is `Boosting` → show a **bolt** badge.
4. Else → no badge.

## Home consumption fallback

If `home.power` is not provided, the card computes it as:

```
home = solar + (grid > 0 ? grid : 0) + (libbi > 0 ? libbi : 0)
        - (grid < 0 ? -grid : 0) - (zappi > 0 ? zappi : 0)
        - (eddi > 0 ? eddi : 0)
```

So in a typical installation you only need `grid`, `solar`, `libbi`,
`zappi`, `eddi` and the home number is derived automatically.
