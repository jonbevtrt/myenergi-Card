import { LitElement, html, css, type TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';

import type { MyenergiCardConfig } from './types.js';
import { EDITOR_NAME } from './const.js';

/**
 * ha-form schema types (subset – only what we actually use).
 *
 * HA's `ha-form` element is shipped with HA core and handles rendering of
 * entity pickers, icon pickers, booleans, numbers, selects and expandable
 * sections. Using `ha-form` sidesteps the common "ha-entity-picker renders
 * nothing" problem in custom card editors because HA guarantees its
 * dependencies are loaded whenever `<ha-form>` is on screen.
 */
type HaSelector = Record<string, unknown>;

interface HaFormBaseField {
  name: string;
  required?: boolean;
  selector?: HaSelector;
}

interface HaFormGrid {
  name: string;
  type: 'grid';
  schema: HaFormField[];
}

interface HaFormExpandable {
  name: string;
  type: 'expandable';
  title?: string;
  icon?: string;
  schema: HaFormField[];
}

type HaFormField = HaFormBaseField | HaFormGrid | HaFormExpandable;

const POWER_DOMAINS = ['sensor', 'input_number'];
const BINARY_DOMAINS = ['binary_sensor', 'input_boolean', 'switch'];
const STATUS_DOMAINS = ['sensor', 'input_select', 'input_text'];

// Helpers to build common selectors.
const entitySel = (domains: string[]): HaSelector => ({
  entity: { multiple: false, include_entities: undefined, filter: { domain: domains } },
});
const textSel = (): HaSelector => ({ text: {} });
const iconSel = (): HaSelector => ({ icon: {} });
const boolSel = (): HaSelector => ({ boolean: {} });
const numberSel = (
  min: number,
  step: number,
  unit?: string,
): HaSelector => ({
  number: { min, step, unit_of_measurement: unit, mode: 'box' },
});

const slotInnerSchema = (extras: HaFormField[] = []): HaFormField[] => [
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'power', selector: entitySel(POWER_DOMAINS) },
      { name: 'name', selector: textSel() },
    ],
  },
  ...extras,
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'icon', selector: iconSel() },
      { name: 'invert', selector: boolSel() },
    ],
  },
];

const SCHEMA: HaFormField[] = [
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'title', selector: textSel() },
      { name: 'eco_score', selector: entitySel(['sensor', 'input_number']) },
    ],
  },
  {
    name: '',
    type: 'grid',
    schema: [
      {
        name: 'power_unit',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'kW', label: 'kW' },
              { value: 'W', label: 'W' },
            ],
          },
        },
      },
      { name: 'flow_threshold', selector: numberSel(0, 0.01, 'kW') },
    ],
  },
  { name: 'show_footer', selector: boolSel() },

  {
    name: 'grid',
    type: 'expandable',
    title: 'Grid',
    icon: 'mdi:transmission-tower',
    schema: slotInnerSchema(),
  },
  {
    name: 'solar',
    type: 'expandable',
    title: 'Solar',
    icon: 'mdi:solar-panel',
    schema: slotInnerSchema(),
  },
  {
    name: 'home',
    type: 'expandable',
    title: 'Home',
    icon: 'mdi:home-variant-outline',
    schema: slotInnerSchema(),
  },
  {
    name: 'libbi',
    type: 'expandable',
    title: 'Libbi (Battery)',
    icon: 'mdi:battery-high',
    schema: slotInnerSchema([
      {
        name: '',
        type: 'grid',
        schema: [{ name: 'soc', selector: entitySel(['sensor', 'input_number']) }],
      },
    ]),
  },
  {
    name: 'zappi',
    type: 'expandable',
    title: 'Zappi (EV Charger)',
    icon: 'mdi:car-electric-outline',
    schema: slotInnerSchema([
      {
        name: '',
        type: 'grid',
        schema: [
          { name: 'plug', selector: entitySel(BINARY_DOMAINS) },
          { name: 'status', selector: entitySel(STATUS_DOMAINS) },
        ],
      },
    ]),
  },
  {
    name: 'eddi',
    type: 'expandable',
    title: 'Eddi (Hot Water)',
    icon: 'mdi:water-boiler',
    schema: slotInnerSchema(),
  },
];

const LABELS: Record<string, string> = {
  title: 'Title',
  eco_score: 'Eco score entity',
  power_unit: 'Power unit',
  flow_threshold: 'Flow threshold (kW)',
  show_footer: 'Show footer',

  power: 'Power entity',
  name: 'Name',
  icon: 'Icon (optional)',
  invert: 'Invert sign',

  soc: 'State of charge entity',
  plug: 'Plug state entity',
  status: 'Status entity',

  grid: 'Grid',
  solar: 'Solar',
  home: 'Home',
  libbi: 'Libbi (Battery)',
  zappi: 'Zappi (EV Charger)',
  eddi: 'Eddi (Hot Water)',
};

@customElement(EDITOR_NAME)
export class MyenergiCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: MyenergiCardConfig;

  public setConfig(config: MyenergiCardConfig): void {
    this._config = { ...config };
  }

  static styles = css`
    :host {
      display: block;
    }
    ha-form {
      display: block;
    }
  `;

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;

    const data = this._toFormData(this._config);

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._onValueChanged}
      ></ha-form>
    `;
  }

  private _computeLabel = (schema: { name: string }): string =>
    LABELS[schema.name] ?? schema.name;

  /**
   * ha-form binds directly to keys of the data object. Booleans must be
   * defined (undefined -> rendered as off but may re-emit undefined). We
   * normalise the config so ha-form always has a value to render.
   */
  private _toFormData(config: MyenergiCardConfig): Record<string, unknown> {
    const data: Record<string, unknown> = {
      title: typeof config.title === 'string' ? config.title : '',
      eco_score: config.eco_score ?? '',
      power_unit: config.power_unit ?? 'kW',
      flow_threshold: config.flow_threshold ?? 0.05,
      show_footer: config.show_footer !== false,
    };
    for (const slot of ['grid', 'solar', 'home', 'libbi', 'zappi', 'eddi'] as const) {
      data[slot] = { ...(config[slot] as Record<string, unknown> | undefined ?? {}) };
    }
    return data;
  }

  private _onValueChanged = (ev: CustomEvent): void => {
    ev.stopPropagation();
    if (!this._config) return;

    const raw = (ev.detail as { value: Record<string, unknown> }).value;

    const next: Record<string, unknown> = {
      type: this._config.type,
    };

    // Title: empty string -> remove.
    if (typeof raw.title === 'string' && raw.title.trim() !== '') {
      next.title = raw.title;
    }

    if (raw.eco_score) next.eco_score = raw.eco_score;
    if (raw.power_unit && raw.power_unit !== 'kW') next.power_unit = raw.power_unit;

    if (
      typeof raw.flow_threshold === 'number' &&
      Number.isFinite(raw.flow_threshold) &&
      raw.flow_threshold !== 0.05
    ) {
      next.flow_threshold = raw.flow_threshold;
    }

    if (raw.show_footer === false) next.show_footer = false;

    for (const slot of ['grid', 'solar', 'home', 'libbi', 'zappi', 'eddi'] as const) {
      const slotRaw = (raw[slot] as Record<string, unknown> | undefined) ?? {};
      const cleaned: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(slotRaw)) {
        if (v === undefined || v === null || v === '') continue;
        if (k === 'invert' && v === false) continue;
        cleaned[k] = v;
      }
      if (Object.keys(cleaned).length > 0) next[slot] = cleaned;
    }

    this._config = next as MyenergiCardConfig;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_NAME]: MyenergiCardEditor;
  }
}
