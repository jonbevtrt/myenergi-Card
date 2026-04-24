import type { HomeAssistant } from 'custom-card-helpers';
import type { PowerUnit } from './types.js';

interface HassEntity {
  entity_id: string;
  state: string;
  attributes: { unit_of_measurement?: string; [k: string]: unknown };
  last_changed?: string;
  last_updated?: string;
}

export function getEntity(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): HassEntity | undefined {
  if (!hass || !entityId) return undefined;
  return hass.states[entityId];
}

/** Parse a HA state into a number, returning NaN for unavailable. */
export function stateNumber(state: HassEntity | undefined): number {
  if (!state) return NaN;
  const v = state.state;
  if (v === undefined || v === null) return NaN;
  if (v === 'unknown' || v === 'unavailable' || v === '') return NaN;
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

/** Convert a power reading into kW taking into account the sensor's unit. */
export function toKilowatts(state: HassEntity | undefined): number {
  const n = stateNumber(state);
  if (!Number.isFinite(n)) return NaN;
  const unit = (state?.attributes?.unit_of_measurement ?? '').toString();
  if (/^mw$/i.test(unit)) return n * 1000;
  if (/^kw$/i.test(unit)) return n;
  if (/^w$/i.test(unit)) return n / 1000;
  // Default: assume W (most HA power sensors are W).
  return n / 1000;
}

/** Format a kW power value for display using the requested unit. */
export function formatPower(kw: number, unit: PowerUnit, decimals = 1): string {
  if (!Number.isFinite(kw)) return '—';
  const abs = Math.abs(kw);
  if (unit === 'W') {
    return `${Math.round(abs * 1000)} W`;
  }
  // Auto-shrink tiny values to W below 1 kW for readability.
  if (abs < 1) {
    return `${Math.round(abs * 1000)} W`;
  }
  return `${abs.toFixed(decimals)} kW`;
}

/** State of charge normaliser – accepts 0-1 fraction or 0-100 percentage. */
export function normaliseSoc(state: HassEntity | undefined): number | undefined {
  const n = stateNumber(state);
  if (!Number.isFinite(n)) return undefined;
  if (n >= 0 && n <= 1) return Math.round(n * 100);
  if (n >= 0 && n <= 100) return Math.round(n);
  return undefined;
}

export function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number,
): { x: number; y: number } {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
}

/** Compute the point on a circle of given radius, along the line from (cx,cy) to (x,y). */
export function pointOnCircleToward(
  cx: number,
  cy: number,
  x: number,
  y: number,
  radius: number,
): { x: number; y: number } {
  const dx = x - cx;
  const dy = y - cy;
  const d = Math.hypot(dx, dy) || 1;
  return { x: cx + (dx / d) * radius, y: cy + (dy / d) * radius };
}

/** Returns 0 for values whose absolute magnitude is below the threshold. */
export function thresholded(value: number, threshold: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.abs(value) < threshold ? 0 : value;
}
