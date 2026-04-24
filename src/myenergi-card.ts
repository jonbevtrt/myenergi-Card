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
            <defs>
              <symbol id="me-chevron" viewBox="-6 -6 12 12" overflow="visible">
                <path d="M-3 -4 L3 0 L-3 4 Z" class="chevron" />
              </symbol>
            </defs>

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
      let icon = slotCfg?.icon ?? def.icon;
      let badge: NodeBadge | undefined;
      let soc: number | undefined;

      if (slot === 'libbi') {
        const b = cfg.libbi as BatteryConfig | undefined;
        soc = normaliseSoc(getEntity(this.hass, b?.soc));
        icon = this._batteryIcon(soc);
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

  private _batteryIcon(soc: number | undefined): string {
    if (soc === undefined) return 'mdi:battery';
    if (soc >= 95) return 'mdi:battery';
    if (soc >= 80) return 'mdi:battery-90';
    if (soc >= 65) return 'mdi:battery-70';
    if (soc >= 50) return 'mdi:battery-50';
    if (soc >= 35) return 'mdi:battery-30';
    if (soc >= 15) return 'mdi:battery-20';
    return 'mdi:battery-10';
  }

  // ---------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------

  private _renderLine(n: NodeRender): SVGTemplateResult {
    const from = pointOnCircleToward(CENTER.x, CENTER.y, n.x, n.y, CENTER_RADIUS);
    const to = pointOnCircleToward(n.x, n.y, CENTER.x, CENTER.y, NODE_RADIUS);

    const chevrons: SVGTemplateResult[] = [];
    if (n.flow !== 'none') {
      const fromPoint = n.flow === 'in' ? to : from; // start at source
      const toPoint = n.flow === 'in' ? from : to;   // end at sink
      const pathId = `flow-${n.slot}`;

      chevrons.push(svg`
        <path
          id=${pathId}
          d=${`M ${fromPoint.x} ${fromPoint.y} L ${toPoint.x} ${toPoint.y}`}
          fill="none"
          stroke="none"
        />
        ${[0, 0.33, 0.66].map(
          (offset) => svg`
            <use href="#me-chevron" class="animated-chevron">
              <animateMotion
                dur="1.8s"
                repeatCount="indefinite"
                rotate="auto"
                keyPoints="0;1"
                keyTimes="0;1"
                begin=${`${offset * -1.8}s`}
              >
                <mpath href=${`#${pathId}`} />
              </animateMotion>
            </use>
          `,
        )}
      `);
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
    return svg`
      <g>
        <circle
          class="node-bg"
          cx=${CENTER.x}
          cy=${CENTER.y}
          r=${CENTER_RADIUS}
          stroke="var(--myenergi-green)"
        />
        ${this._renderIcon('mdi:leaf', CENTER.x, CENTER.y - (ecoScore !== undefined ? 12 : 0), 24, 'var(--myenergi-green)')}
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
        ${this._renderBatteryFill(n)}
        ${this._renderIcon(n.icon, n.x, n.y, 28, n.color)}
        ${this._renderBadge(n)}
      </g>
    `;
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

  private _renderBatteryFill(n: NodeRender): SVGTemplateResult | typeof nothing {
    if (n.slot !== 'libbi' || n.soc === undefined) return nothing;
    const pct = Math.max(0, Math.min(100, n.soc));
    // Subtle radial fill at the bottom of the circle to suggest SOC.
    const r = NODE_RADIUS - 6;
    const fillHeight = (pct / 100) * r * 2;
    const yTop = n.y + r - fillHeight;
    const clipId = `clip-${n.slot}`;
    return svg`
      <defs>
        <clipPath id=${clipId}>
          <circle cx=${n.x} cy=${n.y} r=${r} />
        </clipPath>
      </defs>
      <rect
        x=${n.x - r}
        y=${yTop}
        width=${r * 2}
        height=${fillHeight}
        fill=${n.color}
        opacity="0.14"
        clip-path=${`url(#${clipId})`}
      />
    `;
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
        return svg`<path d=${`M ${cx - 1} ${cy - 4} L ${cx + 3} ${cy - 1} L ${cx} ${cy - 1} L ${cx + 2} ${cy + 4} L ${cx - 3} ${cy + 1} L ${cx} ${cy + 1} Z`} fill="var(--myenergi-fg)" />`;
      case 'bolt':
        return svg`<path d=${`M ${cx - 1} ${cy - 4} L ${cx + 3} ${cy - 1} L ${cx} ${cy - 1} L ${cx + 2} ${cy + 4} L ${cx - 3} ${cy + 1} L ${cx} ${cy + 1} Z`} fill="var(--myenergi-fg)" />`;
      case 'plug-off':
      default:
        // Plug with a diagonal strike.
        return svg`
          <g fill="none" stroke="var(--myenergi-fg)" stroke-width="1.2" stroke-linecap="round">
            <path d=${`M ${cx - 3.5} ${cy - 1} L ${cx - 1.5} ${cy - 3} M ${cx - 1.5} ${cy - 3} L ${cx + 1} ${cy - 0.5} L ${cx - 1} ${cy + 1.5} L ${cx - 3.5} ${cy - 1} Z`} />
            <line x1=${cx - 4} y1=${cy + 4} x2=${cx + 4} y2=${cy - 4} stroke="var(--myenergi-fg)" stroke-width="1.4" />
          </g>
        `;
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
