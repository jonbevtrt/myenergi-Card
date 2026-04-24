import { svg, type SVGTemplateResult } from 'lit';
import type { NodeSlot } from './types.js';

/**
 * Built-in SVG glyphs drawn in the same outline style as the official
 * myenergi mobile app (simple, uniform stroke, no fill, rounded joins).
 *
 * Each renderer returns an SVG group whose visual centre is (cx, cy) and
 * whose nominal size fits inside a ~32x32 viewport. The stroke colour is
 * supplied by the caller – the glyphs themselves use `currentColor` where
 * possible so CSS can override if needed.
 *
 * We use our own SVG paths rather than Material Design Icons for two
 * reasons:
 *   1. The myenergi app uses bespoke line-art that doesn't correspond to
 *      any MDI icon – the outline weight, proportions and cap rounding
 *      are distinctive.
 *   2. Rendering MDI via <ha-icon> inside a <foreignObject> rasterises
 *      the icon and loses crispness when the card is scaled.
 */

const STROKE = 1.9;

function translate(
  content: SVGTemplateResult,
  cx: number,
  cy: number,
  color: string,
): SVGTemplateResult {
  return svg`
    <g
      transform=${`translate(${cx} ${cy})`}
      fill="none"
      stroke=${color}
      stroke-width=${STROKE}
      stroke-linecap="round"
      stroke-linejoin="round"
    >${content}</g>
  `;
}

/** Simple house with smile face (matches myenergi "home" node). */
function houseGlyph(): SVGTemplateResult {
  return svg`
    <path d="M -10 -2 L 0 -12 L 10 -2 L 10 10 L -10 10 Z" />
    <path d="M -4 4 Q 0 7 4 4" />
  `;
}

/** Transmission tower (pylon) silhouette. */
function pylonGlyph(): SVGTemplateResult {
  return svg`
    <path d="M -10 -12 L 10 -12" />
    <path d="M -8 -8 L 8 -8" />
    <path d="M -10 -12 L 0 0 L 10 -12" />
    <path d="M 10 -12 L 0 0 L -10 -12" />
    <path d="M 0 0 L -10 12" />
    <path d="M 0 0 L 10 12" />
    <path d="M -6 4 L 6 4" />
  `;
}

/** Vertical Libbi-style battery stack (rotated 90° vs a phone battery). */
function batteryGlyph(): SVGTemplateResult {
  return svg`
    <rect x="-7" y="-12" width="14" height="24" rx="2.5" />
    <rect x="-3" y="-14.5" width="6" height="2.5" rx="0.8" fill="currentColor" stroke="none" />
    <line x1="-4" y1="-5" x2="4" y2="-5" />
    <line x1="-4" y1="0" x2="4" y2="0" />
    <line x1="-4" y1="5" x2="4" y2="5" />
  `;
}

/** Solar panel on small stand with cell grid. */
function solarGlyph(): SVGTemplateResult {
  return svg`
    <path d="M -12 -6 L 12 -6 L 10 6 L -10 6 Z" />
    <line x1="-11" y1="0" x2="11" y2="0" />
    <line x1="-4" y1="-6" x2="-6" y2="6" />
    <line x1="4" y1="-6" x2="6" y2="6" />
    <line x1="0" y1="6" x2="0" y2="10" />
    <line x1="-4" y1="10" x2="4" y2="10" />
  `;
}

/** Stylised EV side profile (matches Zappi "car" icon in the app). */
function carGlyph(): SVGTemplateResult {
  return svg`
    <path d="M -12 3 L -10 -2 Q -8 -6 -4 -6 L 4 -6 Q 8 -6 10 -2 L 12 3 L 12 7 L -12 7 Z" />
    <circle cx="-6" cy="7" r="2.5" />
    <circle cx="6" cy="7" r="2.5" />
    <path d="M -4 -6 L -2 -1 L 2 -1 L 4 -6" />
  `;
}

/** Eddi hot-water diverter (drawn as a tank with waves). */
function eddiGlyph(): SVGTemplateResult {
  return svg`
    <rect x="-7" y="-11" width="14" height="22" rx="2" />
    <line x1="-7" y1="-4" x2="7" y2="-4" />
    <path d="M -5 2 Q -2.5 0 0 2 T 5 2" />
    <path d="M -5 6 Q -2.5 4 0 6 T 5 6" />
  `;
}

/** Leaf used in the centre "Eco" node. */
export function leafGlyph(cx: number, cy: number, color: string): SVGTemplateResult {
  return svg`
    <g
      transform=${`translate(${cx} ${cy})`}
      fill=${color}
      stroke=${color}
      stroke-width="1"
      stroke-linejoin="round"
    >
      <path d="M 10 -9 C 2 -10 -8 -6 -9 4 C -9 9 -6 10 -2 9 C 8 7 10 -1 10 -9 Z" />
      <path d="M -8 9 L 6 -6" stroke="var(--myenergi-bg)" stroke-width="1.4" fill="none" stroke-linecap="round" />
    </g>
  `;
}

export function builtinIcon(
  slot: NodeSlot,
  cx: number,
  cy: number,
  color: string,
): SVGTemplateResult {
  switch (slot) {
    case 'home':
      return translate(houseGlyph(), cx, cy, color);
    case 'grid':
      return translate(pylonGlyph(), cx, cy, color);
    case 'libbi':
      return translate(batteryGlyph(), cx, cy, color);
    case 'solar':
      return translate(solarGlyph(), cx, cy, color);
    case 'zappi':
      return translate(carGlyph(), cx, cy, color);
    case 'eddi':
      return translate(eddiGlyph(), cx, cy, color);
  }
}
