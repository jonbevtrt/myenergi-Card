import { LitElement, html, svg, nothing, type TemplateResult, type SVGTemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardEditor } from 'custom-card-helpers';

import type {
  MyenergiCardConfig,
  NodeRender,
  NodeSlot,
  NodeBadge,
  PowerUnit,
  BatteryConfig,
  ZappiConfig,
  EddiConfig,
  NodeConfig,
} from './types.js';
import {
  CARD_NAME,
  EDITOR_NAME,
  CARD_VERSION,
  VIEWBOX,
  CENTER,
  NODE_RADIUS,
  CENTER_RADIUS,
  ORBIT_RADIUS,
  FLOW_THRESHOLD_DEFAULT,
  SLOT_ANGLES,
  SLOT_DEFAULTS,
} from './const.js';
import {
  getEntity,
  toKilowatts,
  formatPower,
  normaliseSoc,
  polarToCartesian,
  pointOnCircleToward,
  thresholded,
  stateNumber,
} from './utils.js';
import { styles } from './styles.js';
import { batteryIcon, builtinIcon, leafGlyph, unpluggedGlyph } from './icons.js';

/* eslint-disable no-console */
console.info(
  `%c myenergi-card %c v${CARD_VERSION} `,
  'color:#fff;background:#2ecc71;font-weight:700;border-radius:3px 0 0 3px;padding:2px 6px;',
  'color:#2ecc71;background:#0b0d10;border-radius:0 3px 3px 0;padding:2px 6px;',
);
/* eslint-enable no-console */

// Register the card with the Lovelace card picker.
(window as unknown as { customCards?: unknown[] }).customCards = (window as unknown as { customCards?: unknown[] }).customCards || [];
(window as unknown as { customCards: Array<Record<string, unknown>> }).customCards.push({
  type: CARD_NAME,
  name: 'myenergi Card',
  description:
    'Hexagonal power-flow visualisation for myenergi devices (Zappi, Eddi, Libbi, Harvi) in the style of the official myenergi app.',
  preview: true,
  documentationURL: 'https://github.com/',
});

@customElement(CARD_NAME)
export class MyenergiCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: MyenergiCardConfig;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./myenergi-card-editor.js');
    return document.createElement(EDITOR_NAME) as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<MyenergiCardConfig> {
    return {
      type: `custom:${CARD_NAME}`,
      title: 'myenergi',
      grid: { power: '' },
      solar: { power: '' },
      home: { power: '' },
      libbi: { power: '', soc: '' },
      zappi: { power: '', plug: '' },
      eddi: { power: '' },
    };
  }

  public setConfig(config: MyenergiCardConfig): void {
    if (!config) throw new Error('Invalid configuration');
    this._config = { ...config };
  }

  public getCardSize(): number {
    return 6;
  }

  static styles = styles;

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    const unit: PowerUnit = this._config.power_unit ?? 'kW';
    const threshold = this._config.flow_threshold ?? FLOW_THRESHOLD_DEFAULT;

    const nodes = this._buildNodes(threshold);
    const ecoScore = this._readEcoScore();
    const showFooter = this._config.show_footer !== false;
    const title = this._config.title === false ? undefined : (this._config.title ?? 'myenergi');

    return html`
      <ha-card>
        ${title !== undefined
          ? html`
              <div class="header">
                <ha-icon icon="mdi:menu"></ha-icon>
                <div class="title">${title}</div>
              </div>
            `
          : nothing}

        <div class="diagram-wrap">
          <svg
            class="diagram"
            viewBox="0 0 ${VIEWBOX} ${VIEWBOX}"
            preserveAspectRatio="xMidYMid meet"
            aria-label="myenergi power flow"
          >
            ${nodes.map((n) => this._renderLine(n))}
            ${this._renderCenter(ecoScore)}
            ${nodes.map((n) => this._renderNode(n, unit))}
          </svg>
        </div>

        ${showFooter ? this._renderFooter() : nothing}
      </ha-card>
    `;
  }

  // ---------------------------------------------------------------------------
  // Data
  // ---------------------------------------------------------------------------

  private _readPower(cfg: NodeConfig | undefined): { value: number; available: boolean } {
    if (!cfg?.power) return { value: 0, available: false };
    const st = getEntity(this.hass, cfg.power);
    if (!st) return { value: 0, available: false };
    const kw = toKilowatts(st);
    if (!Number.isFinite(kw)) return { value: 0, available: false };
    const signed = cfg.invert ? -kw : kw;
    return { value: signed, available: true };
  }

  private _readEcoScore(): number | undefined {
    const id = this._config?.eco_score;
    if (!id) return undefined;
    const s = getEntity(this.hass, id);
    const n = stateNumber(s);
    if (!Number.isFinite(n)) return undefined;
    if (n >= 0 && n <= 1) return Math.round(n * 100);
    if (n >= 0 && n <= 100) return Math.round(n);
    return undefined;
  }

  private _computeHomeFallback(values: Record<NodeSlot, number>): number {
    const solar = Math.max(0, values.solar);
    const gridImport = Math.max(0, values.grid);
    const gridExport = Math.max(0, -values.grid);
    const libbiDischarge = Math.max(0, values.libbi);
    const libbiCharge = Math.max(0, -values.libbi);
    const zappi = Math.max(0, values.zappi);
    const eddi = Math.max(0, values.eddi);
    const home = solar + gridImport + libbiDischarge - gridExport - libbiCharge - zappi - eddi;
    return Math.max(0, home);
  }

  private _buildNodes(threshold: number): NodeRender[] {
    const cfg = this._config!;
    const slots: NodeSlot[] = ['home', 'grid', 'solar', 'libbi', 'zappi', 'eddi'];

    const raw: Record<NodeSlot, { value: number; available: boolean }> = {
      home: this._readPower(cfg.home),
      grid: this._readPower(cfg.grid),
      solar: this._readPower(cfg.solar),
      libbi: this._readPower(cfg.libbi),
      zappi: this._readPower(cfg.zappi),
      eddi: this._readPower(cfg.eddi),
    };

    // Home fallback: if not configured or unavailable, derive from others.
    if (!raw.home.available) {
      const sumTable = Object.fromEntries(
        slots.map((s) => [s, raw[s].value]),
      ) as Record<NodeSlot, number>;
      const anyConfigured =
        raw.grid.available || raw.solar.available || raw.libbi.available ||
        raw.zappi.available || raw.eddi.available;
      if (anyConfigured) {
        raw.home = { value: this._computeHomeFallback(sumTable), available: true };
      }
    }

    const unit: PowerUnit = cfg.power_unit ?? 'kW';
    void unit;

    const out: NodeRender[] = [];
    for (const slot of slots) {
      const slotCfg = (cfg[slot] as NodeConfig | undefined) ?? undefined;
      const isConfigured = Boolean(slotCfg?.power);
      if (slot !== 'home' && !isConfigured) continue;
      if (slot === 'home' && !raw.home.available) continue;

      const def = SLOT_DEFAULTS[slot];
      const { value, available } = raw[slot];
      const signed = thresholded(value, threshold);

      // Determine flow direction for this slot.
      let flow: NodeRender['flow'] = 'none';
      if (signed !== 0) {
        flow = this._flowForSlot(slot, signed);
      }

      // Compute position.
      const angle = SLOT_ANGLES[slot];
      const pos = polarToCartesian(CENTER.x, CENTER.y, ORBIT_RADIUS, angle);

      // Label position: on the outside of the circle relative to the centre.
      const outward = polarToCartesian(CENTER.x, CENTER.y, ORBIT_RADIUS + NODE_RADIUS + 18, angle);
      const labelAnchor: NodeRender['labelAnchor'] =
        outward.x < CENTER.x - 4 ? 'end' : outward.x > CENTER.x + 4 ? 'start' : 'middle';

      // Colour overrides per slot state.
      let color = def.color;
      const icon = slotCfg?.icon ?? def.icon;
      let badge: NodeBadge | undefined;
      let soc: number | undefined;

      if (slot === 'libbi') {
        const b = cfg.libbi as BatteryConfig | undefined;
        soc = normaliseSoc(getEntity(this.hass, b?.soc));
        color =
          signed > 0
            ? 'var(--myenergi-orange)'
            : signed < 0
              ? 'var(--myenergi-green)'
              : 'var(--myenergi-orange)';
        badge = signed > 0 ? 'play' : signed < 0 ? 'charging' : 'pause';
      } else if (slot === 'zappi') {
        const z = cfg.zappi as ZappiConfig | undefined;
        const plugState = getEntity(this.hass, z?.plug)?.state;
        const status = getEntity(this.hass, z?.status)?.state;
        const plugged = plugState
          ? !['off', 'unplugged', 'disconnected', 'unavailable', 'unknown'].includes(
              String(plugState).toLowerCase(),
            )
          : signed !== 0;
        if (!plugged) {
          color = 'var(--myenergi-grey)';
          badge = 'plug-off';
        } else if (signed > 0) {
          color = 'var(--myenergi-green)';
          badge = /boost/i.test(String(status)) ? 'bolt' : 'play';
        } else {
          color = 'var(--myenergi-grey)';
        }
      } else if (slot === 'grid') {
        color = signed > 0 ? 'var(--myenergi-orange)' : 'var(--myenergi-green)';
      }

      out.push({
        slot,
        x: pos.x,
        y: pos.y,
        labelX: outward.x,
        labelY: outward.y,
        labelAnchor,
        name: slotCfg?.name ?? def.name,
        icon,
        color,
        power: signed,
        displayPower: Math.abs(signed),
        available,
        flow,
        badge,
        soc,
      });
    }

    return out;
  }

  private _flowForSlot(slot: NodeSlot, signed: number): 'in' | 'out' | 'none' {
    // Sign conventions – see docs/configuration.md.
    switch (slot) {
      case 'solar':
        // Solar always flows toward the centre (generating).
        return signed > 0 ? 'in' : 'none';
      case 'home':
        // Home always flows from the centre to the home.
        return signed > 0 ? 'out' : 'none';
      case 'grid':
        // Positive = importing = into centre; Negative = exporting = out of centre.
        return signed > 0 ? 'in' : 'out';
      case 'libbi':
        // Positive = discharging → into centre; Negative = charging → out of centre.
        return signed > 0 ? 'in' : 'out';
      case 'zappi':
        // Positive = car charging = out of centre; Negative = V2H = into centre.
        return signed > 0 ? 'out' : 'in';
      case 'eddi':
        // Positive = diverting to hot water = out of centre.
        return signed > 0 ? 'out' : 'none';
      default:
        return 'none';
    }
  }

  // ---------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------

  private _renderLine(n: NodeRender): SVGTemplateResult {
    const from = pointOnCircleToward(CENTER.x, CENTER.y, n.x, n.y, CENTER_RADIUS);
    const to = pointOnCircleToward(n.x, n.y, CENTER.x, CENTER.y, NODE_RADIUS);

    let chevrons: SVGTemplateResult | typeof nothing = nothing;
    if (n.flow !== 'none') {
      const src = n.flow === 'in' ? to : from;
      const dst = n.flow === 'in' ? from : to;
      const angle = Math.atan2(dst.y - src.y, dst.x - src.x);
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      // Bake the chevron's orientation straight into the path's vertices
      // (a chevron pointing along +x rotated by `angle`). This removes the
      // need for a nested <g transform="rotate(…)"> which, combined with
      // an <animateTransform> on an outer <g> with no base transform, made
      // Chrome-Windows park the whole thing at (0,0) until the next paint
      // invalidation (Chrome-Android doesn't apply the same optimisation).
      const rot = (x: number, y: number): [number, number] => [
        x * cos - y * sin,
        x * sin + y * cos,
      ];
      const p1 = rot(-4, -4);
      const p2 = rot(5, 0);
      const p3 = rot(-4, 4);
      const fmt = (v: number): string => v.toFixed(2);
      const d =
        `M ${fmt(p1[0])} ${fmt(p1[1])} ` +
        `L ${fmt(p2[0])} ${fmt(p2[1])} ` +
        `L ${fmt(p3[0])} ${fmt(p3[1])} Z`;

      const duration = 1.8;
      const count = 3;
      const initialTransform = `translate(${src.x} ${src.y})`;

      chevrons = svg`
        ${Array.from({ length: count }).map((_, i) => {
          // Stagger with POSITIVE begin values — negative begin has a
          // Chrome-Windows bug where the "already-elapsed" phase can
          // freeze the element at the origin.
          const begin = (i * duration) / count;
          return svg`
            <g transform=${initialTransform}>
              <path class="chevron" d=${d} />
              <animateTransform
                attributeName="transform"
                type="translate"
                from=${`${src.x} ${src.y}`}
                to=${`${dst.x} ${dst.y}`}
                dur=${`${duration}s`}
                begin=${`${begin}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.15;0.85;1"
                dur=${`${duration}s`}
                begin=${`${begin}s`}
                repeatCount="indefinite"
              />
            </g>
          `;
        })}
      `;
    }

    return svg`
      <g>
        <line
          class="line"
          x1=${from.x}
          y1=${from.y}
          x2=${to.x}
          y2=${to.y}
        />
        ${chevrons}
      </g>
    `;
  }

  private _renderCenter(ecoScore: number | undefined): SVGTemplateResult {
    const label = ecoScore !== undefined ? `${ecoScore}%` : '';
    const leafY = CENTER.y - (ecoScore !== undefined ? 10 : 0);
    return svg`
      <g>
        <circle
          class="node-bg"
          cx=${CENTER.x}
          cy=${CENTER.y}
          r=${CENTER_RADIUS}
          stroke="var(--myenergi-green)"
        />
        ${leafGlyph(CENTER.x, leafY, 'var(--myenergi-green)')}
        ${
          ecoScore !== undefined
            ? svg`<text class="center-label" x=${CENTER.x} y=${CENTER.y + 14}>${label}</text>`
            : nothing
        }
      </g>
    `;
  }

  private _renderNode(n: NodeRender, unit: PowerUnit): SVGTemplateResult {
    const classes = classMap({ dim: !n.available });
    const powerLabel = n.available ? formatPower(n.displayPower, unit) : '—';
    const showName = this._shouldShowName(n);

    // Place labels on the outward side of the node relative to the centre.
    const above = n.y <= CENTER.y + 1;
    const outerOffset = 6;
    const lineHeight = 14;

    const valueY = above
      ? n.y - NODE_RADIUS - outerOffset
      : n.y + NODE_RADIUS + outerOffset + 10;

    const nameY = above ? valueY - lineHeight : valueY + lineHeight;

    return svg`
      <g class=${classes}>
        <title>${n.name} – ${powerLabel}</title>

        ${
          showName
            ? svg`<text
                class="node-label"
                x=${n.x}
                y=${nameY}
                fill=${n.color}
              >${n.name}</text>`
            : nothing
        }

        <text
          class="node-value"
          x=${n.x}
          y=${valueY}
          fill=${n.color}
        >${powerLabel}</text>

        <circle
          class="node-bg"
          cx=${n.x}
          cy=${n.y}
          r=${NODE_RADIUS}
          stroke=${n.color}
        />
        ${this._renderNodeIcon(n)}
        ${this._renderBadge(n)}
      </g>
    `;
  }

  /**
   * Renders the glyph inside a node. If the user supplied a custom MDI icon
   * (starts with "mdi:"), fall back to the <ha-icon> foreignObject path;
   * otherwise use the myenergi-app SVG assets.
   *
   * The glyph itself is always drawn in the card foreground colour (white
   * on the default dark background) — just like the myenergi app. The
   * state colour lives on the node ring and the power label only.
   */
  private _renderNodeIcon(n: NodeRender): SVGTemplateResult {
    const slotCfg = this._config?.[n.slot] as NodeConfig | undefined;
    const userIcon = slotCfg?.icon;
    const iconColor = 'var(--myenergi-fg)';
    if (userIcon && /^mdi:/i.test(userIcon)) {
      return this._renderIcon(userIcon, n.x, n.y, 28, iconColor);
    }
    if (n.slot === 'libbi') {
      // The libbi asset has 10 internal bars; light the first ceil(soc/10).
      return batteryIcon(n.x, n.y, 46, iconColor, n.soc);
    }
    if (n.slot === 'eddi') {
      const eddi = this._config?.eddi as EddiConfig | undefined;
      return builtinIcon(n.slot, n.x, n.y, iconColor, eddi?.heater_type ?? 'tank');
    }
    return builtinIcon(n.slot, n.x, n.y, iconColor);
  }

  private _shouldShowName(n: NodeRender): boolean {
    const cfg = this._config;
    if (!cfg) return false;
    const slotCfg = cfg[n.slot] as NodeConfig | undefined;
    // If the user explicitly configured a name, honour it.
    if (slotCfg?.name !== undefined) return Boolean(slotCfg.name);
    // Default: only show the name for the battery slot (matches myenergi app).
    return n.slot === 'libbi';
  }

  private _renderIcon(
    icon: string,
    x: number,
    y: number,
    size: number,
    color: string,
  ): SVGTemplateResult {
    // HA's <ha-icon> isn't an SVG element, so we embed it inside a
    // <foreignObject> so the icon scales with the SVG view-box.
    return svg`
      <foreignObject
        x=${x - size / 2}
        y=${y - size / 2}
        width=${size}
        height=${size}
        style="overflow: visible;"
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style=${`
            width:${size}px;
            height:${size}px;
            display:flex;
            align-items:center;
            justify-content:center;
            color:${color};
          `}
        >
          <ha-icon
            icon=${icon}
            style=${`--mdc-icon-size:${size}px;color:${color};`}
          ></ha-icon>
        </div>
      </foreignObject>
    `;
  }

  private _renderBadge(n: NodeRender): SVGTemplateResult | typeof nothing {
    if (!n.badge) return nothing;
    const cx = n.x + NODE_RADIUS * 0.75;
    const cy = n.y - NODE_RADIUS * 0.75;
    const r = 9;
    const isPlugOff = n.badge === 'plug-off';
    return svg`
      <g>
        <circle
          cx=${cx}
          cy=${cy}
          r=${r}
          fill=${isPlugOff ? 'var(--myenergi-blue)' : 'var(--myenergi-bg)'}
          stroke=${isPlugOff ? 'var(--myenergi-blue)' : 'var(--myenergi-fg)'}
          stroke-width=${isPlugOff ? 0 : 1}
        />
        ${this._renderBadgeGlyph(n.badge, cx, cy)}
      </g>
    `;
  }

  private _renderBadgeGlyph(badge: NodeBadge, cx: number, cy: number): SVGTemplateResult {
    switch (badge) {
      case 'play':
        return svg`<path d=${`M ${cx - 2.5} ${cy - 3.5} L ${cx + 3.5} ${cy} L ${cx - 2.5} ${cy + 3.5} Z`} fill="var(--myenergi-fg)" />`;
      case 'pause':
        return svg`
          <rect x=${cx - 3} y=${cy - 3} width="2" height="6" fill="var(--myenergi-fg)" />
          <rect x=${cx + 1} y=${cy - 3} width="2" height="6" fill="var(--myenergi-fg)" />
        `;
      case 'charging':
      case 'bolt':
        return svg`<path d=${`M ${cx - 1} ${cy - 4} L ${cx + 3} ${cy - 1} L ${cx} ${cy - 1} L ${cx + 2} ${cy + 4} L ${cx - 3} ${cy + 1} L ${cx} ${cy + 1} Z`} fill="var(--myenergi-fg)" />`;
      case 'plug-off':
      default:
        return unpluggedGlyph(cx, cy, 12, 'var(--myenergi-fg)');
    }
  }

  private _renderFooter(): TemplateResult {
    return html`
      <div class="footer">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M 2 3 L 6 3 L 8 8 L 10 3 L 14 3 L 10 13 L 6 13 Z"
            fill="var(--myenergi-green)"
          />
        </svg>
        <span>myenergi</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_NAME]: MyenergiCard;
  }
}
