import { svg, nothing, type SVGTemplateResult } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import type { NodeSlot } from './types.js';

import houseSvg from './svgs/assets_house_happy.svg';
import gridSvg from './svgs/assets_grid.svg';
import solarSvg from './svgs/assets_solar.svg';
import batterySvg from './svgs/assets_batterylibbi10.svg';
import zappiSvg from './svgs/assets_zappi.svg';
import leafSvg from './svgs/assets_leaf_big.svg';
import unpluggedSvg from './svgs/assets_unplugged.svg';
import heaterTankSvg from './svgs/assets_heater_tank2.svg';
import heaterPoolSvg from './svgs/assets_heater_pool.svg';
import heaterRadiatorSvg from './svgs/assets_heater_radiator.svg';
import heaterUnderfloorSvg from './svgs/assets_heater_underfloor.svg';

export type HeaterType = 'tank' | 'pool' | 'radiator' | 'underfloor';

interface ProcessedSvg {
  /** width attribute from the original <svg> as a number */
  width: number;
  /** height attribute from the original <svg> as a number */
  height: number;
  /** inner markup (paths, groups) with fills replaced by currentColor */
  inner: string;
}

const SVG_ROOT_RE = /<svg[^>]*\bwidth=["']?(\d+)(?:px)?["']?[^>]*\bheight=["']?(\d+)(?:px)?["']?[^>]*>([\s\S]*?)<\/svg>/i;
const FILL_ATTR_RE = /fill\s*=\s*(?:"(?:#[0-9a-fA-F]{3,8}|[a-zA-Z]+)"|'(?:#[0-9a-fA-F]{3,8}|[a-zA-Z]+)')/g;
const FILL_STYLE_RE = /fill\s*:\s*(?:#[0-9a-fA-F]{3,8}|[a-zA-Z]+)\s*;?/g;
const DOCTYPE_RE = /<!DOCTYPE[\s\S]*?>/i;
const XML_DECL_RE = /<\?xml[\s\S]*?\?>/i;
const COMMENT_RE = /<!--[\s\S]*?-->/g;

function processSvg(raw: string): ProcessedSvg {
  const cleaned = raw
    .replace(XML_DECL_RE, '')
    .replace(DOCTYPE_RE, '')
    .replace(COMMENT_RE, '');

  const match = SVG_ROOT_RE.exec(cleaned);
  if (!match) {
    return { width: 268, height: 268, inner: cleaned };
  }
  const width = Number(match[1]);
  const height = Number(match[2]);
  let inner = match[3];

  inner = inner
    .replace(FILL_ATTR_RE, 'fill="currentColor"')
    .replace(FILL_STYLE_RE, '');

  return { width, height, inner };
}

const HOUSE = processSvg(houseSvg);
const GRID = processSvg(gridSvg);
const SOLAR = processSvg(solarSvg);
const ZAPPI = processSvg(zappiSvg);
const LEAF = processSvg(leafSvg);
const UNPLUGGED = processSvg(unpluggedSvg);
const HEATERS: Record<HeaterType, ProcessedSvg> = {
  tank: processSvg(heaterTankSvg),
  pool: processSvg(heaterPoolSvg),
  radiator: processSvg(heaterRadiatorSvg),
  underfloor: processSvg(heaterUnderfloorSvg),
};

/**
 * The libbi SVG is structured as 11 top-level <g> blocks: one body/frame
 * followed by ten internal bars (10% steps of SOC). We split them so the
 * battery can be rendered with only the first N bars lit.
 */
interface BatteryAsset {
  width: number;
  height: number;
  body: string;
  bars: string[];
}

function processBatterySvg(raw: string): BatteryAsset {
  const processed = processSvg(raw);
  const groups = processed.inner.match(/<g\b[^>]*>[\s\S]*?<\/g>/gi) ?? [];
  const [body = '', ...bars] = groups;
  // Pad or truncate just in case — the asset is authored with exactly ten.
  const ten = bars.slice(0, 10);
  while (ten.length < 10) ten.push('');
  return { width: processed.width, height: processed.height, body, bars: ten };
}

const BATTERY = processBatterySvg(batterySvg);

/**
 * Embed a processed SVG asset as a nested <svg> inside the main diagram.
 * The nested SVG preserves the asset's aspect ratio while fitting the
 * supplied size on its longest edge.
 */
function embed(
  asset: ProcessedSvg,
  cx: number,
  cy: number,
  size: number,
  color: string,
): SVGTemplateResult {
  const aspect = asset.width / asset.height;
  const w = aspect >= 1 ? size : size * aspect;
  const h = aspect >= 1 ? size / aspect : size;
  // The source assets declare `fill-rule: evenodd` on their root <svg> so
  // overlapping subpaths cut holes out of the filled shape (that's how the
  // outline "look" is achieved). Nesting strips that inheritance, so we
  // re-apply it here — otherwise every glyph renders as a solid blob.
  return svg`
    <svg
      x=${cx - w / 2}
      y=${cy - h / 2}
      width=${w}
      height=${h}
      viewBox=${`0 0 ${asset.width} ${asset.height}`}
      preserveAspectRatio="xMidYMid meet"
      overflow="visible"
      fill-rule="evenodd"
      clip-rule="evenodd"
      style=${`color:${color};`}
    >${unsafeSVG(asset.inner)}</svg>
  `;
}

/** Sizes (longest-edge in view-box units) per slot. */
const SLOT_ICON_SIZE: Record<NodeSlot, number> = {
  home: 44,
  grid: 44,
  solar: 46,
  libbi: 46,
  zappi: 50,
  eddi: 46,
};

export function builtinIcon(
  slot: NodeSlot,
  cx: number,
  cy: number,
  color: string,
  heaterType: HeaterType = 'tank',
): SVGTemplateResult {
  const size = SLOT_ICON_SIZE[slot];
  switch (slot) {
    case 'home':
      return embed(HOUSE, cx, cy, size, color);
    case 'grid':
      return embed(GRID, cx, cy, size, color);
    case 'solar':
      return embed(SOLAR, cx, cy, size, color);
    case 'libbi':
      // Fall through to `batteryIcon` when the caller has the SOC; this
      // default ignores SOC and shows a full-charge battery so the node
      // doesn't look empty before the SOC entity resolves.
      return batteryIcon(cx, cy, size, color);
    case 'zappi':
      return embed(ZAPPI, cx, cy, size, color);
    case 'eddi':
      return embed(HEATERS[heaterType] ?? HEATERS.tank, cx, cy, size, color);
  }
}

/**
 * Render the Libbi battery. If `soc` is provided (0-100) the glyph
 * lights `ceil(soc / 10)` bars and dims the rest so the cells behave
 * like a real fuel gauge.
 */
export function batteryIcon(
  cx: number,
  cy: number,
  size: number,
  color: string,
  soc?: number,
): SVGTemplateResult {
  const aspect = BATTERY.width / BATTERY.height;
  const w = aspect >= 1 ? size : size * aspect;
  const h = aspect >= 1 ? size / aspect : size;

  const hasSoc = typeof soc === 'number' && Number.isFinite(soc);
  const clamped = hasSoc ? Math.max(0, Math.min(100, soc as number)) : 100;
  const lit = hasSoc ? Math.min(10, Math.ceil(clamped / 10)) : 10;

  const lightBars = BATTERY.bars.slice(0, lit).join('');
  const dimBars = BATTERY.bars.slice(lit).join('');

  return svg`
    <svg
      x=${cx - w / 2}
      y=${cy - h / 2}
      width=${w}
      height=${h}
      viewBox=${`0 0 ${BATTERY.width} ${BATTERY.height}`}
      preserveAspectRatio="xMidYMid meet"
      overflow="visible"
      fill-rule="evenodd"
      clip-rule="evenodd"
      style=${`color:${color};`}
    >${unsafeSVG(BATTERY.body)}${
      dimBars
        ? svg`<g opacity="0.22">${unsafeSVG(dimBars)}</g>`
        : nothing
    }${lightBars ? unsafeSVG(lightBars) : nothing}</svg>
  `;
}

export function leafGlyph(cx: number, cy: number, color: string): SVGTemplateResult {
  return embed(LEAF, cx, cy, 54, color);
}

export function unpluggedGlyph(
  cx: number,
  cy: number,
  size: number,
  color: string,
): SVGTemplateResult {
  return embed(UNPLUGGED, cx, cy, size, color);
}
