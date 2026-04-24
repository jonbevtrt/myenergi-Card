import { LitElement, html, css, type TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';

import type { MyenergiCardConfig, NodeSlot, NodeConfig } from './types.js';
import { EDITOR_NAME } from './const.js';

const POWER_DOMAINS = ['sensor', 'input_number'];
const BINARY_DOMAINS = ['binary_sensor', 'input_boolean', 'switch'];
const STATUS_DOMAINS = ['sensor', 'input_select', 'input_text'];

interface SlotSpec {
  slot: NodeSlot;
  label: string;
  extraFields: Array<{
    key: string;
    label: string;
    domains: string[];
  }>;
}

const SLOTS: SlotSpec[] = [
  { slot: 'grid',  label: 'Grid',  extraFields: [] },
  { slot: 'solar', label: 'Solar', extraFields: [] },
  { slot: 'home',  label: 'Home',  extraFields: [] },
  {
    slot: 'libbi',
    label: 'Libbi (Battery)',
    extraFields: [{ key: 'soc', label: 'State of charge', domains: ['sensor'] }],
  },
  {
    slot: 'zappi',
    label: 'Zappi (EV Charger)',
    extraFields: [
      { key: 'plug', label: 'Plug state', domains: BINARY_DOMAINS },
      { key: 'status', label: 'Status', domains: STATUS_DOMAINS },
    ],
  },
  { slot: 'eddi', label: 'Eddi (Hot Water)', extraFields: [] },
];

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
    .section {
      margin-bottom: 12px;
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
    }
    .section h3 {
      margin: 0 0 8px 0;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color);
    }
    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 8px;
    }
    .row.full {
      grid-template-columns: 1fr;
    }
    ha-textfield,
    ha-entity-picker,
    ha-icon-picker,
    ha-select,
    ha-formfield {
      width: 100%;
    }
  `;

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;

    return html`
      <div class="section">
        <h3>General</h3>
        <div class="row">
          <ha-textfield
            label="Title"
            .value=${this._titleValue()}
            @input=${(e: Event) => this._updateTitle((e.target as HTMLInputElement).value)}
          ></ha-textfield>
          ${this._entityPicker('eco_score', 'Eco score entity', ['sensor'])}
        </div>
        <div class="row">
          <ha-select
            label="Power unit"
            .value=${this._config.power_unit ?? 'kW'}
            @selected=${(e: CustomEvent) => {
              const v = (e.detail as { value?: string }).value;
              if (v) this._updateRoot({ power_unit: v as 'kW' | 'W' });
            }}
            @closed=${(e: Event) => e.stopPropagation()}
          >
            <mwc-list-item value="kW">kW</mwc-list-item>
            <mwc-list-item value="W">W</mwc-list-item>
          </ha-select>
          <ha-textfield
            label="Flow threshold (kW)"
            type="number"
            step="0.01"
            .value=${String(this._config.flow_threshold ?? 0.05)}
            @input=${(e: Event) => {
              const v = Number((e.target as HTMLInputElement).value);
              this._updateRoot({ flow_threshold: Number.isFinite(v) ? v : undefined });
            }}
          ></ha-textfield>
        </div>
        <div class="row">
          <ha-formfield label="Show footer">
            <ha-switch
              .checked=${this._config.show_footer !== false}
              @change=${(e: Event) =>
                this._updateRoot({ show_footer: (e.target as HTMLInputElement).checked })}
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>

      ${SLOTS.map((spec) => this._renderSlot(spec))}
    `;
  }

  private _renderSlot(spec: SlotSpec): TemplateResult {
    const slotCfg = (this._config?.[spec.slot] as NodeConfig | undefined) ?? {};
    return html`
      <div class="section">
        <h3>${spec.label}</h3>
        <div class="row">
          ${this._slotEntityPicker(spec.slot, 'power', 'Power entity', POWER_DOMAINS)}
          <ha-textfield
            label="Name"
            .value=${String(slotCfg.name ?? '')}
            @input=${(e: Event) =>
              this._updateSlot(spec.slot, { name: (e.target as HTMLInputElement).value || undefined })}
          ></ha-textfield>
        </div>
        ${spec.extraFields.length
          ? html`
              <div class="row">
                ${spec.extraFields.map((f) =>
                  this._slotEntityPicker(spec.slot, f.key, f.label, f.domains),
                )}
              </div>
            `
          : nothing}
        <div class="row">
          <ha-formfield label="Invert sign">
            <ha-switch
              .checked=${Boolean(slotCfg.invert)}
              @change=${(e: Event) =>
                this._updateSlot(spec.slot, {
                  invert: (e.target as HTMLInputElement).checked || undefined,
                })}
            ></ha-switch>
          </ha-formfield>
          <ha-textfield
            label="Icon (optional)"
            .value=${String(slotCfg.icon ?? '')}
            placeholder="mdi:home"
            @input=${(e: Event) =>
              this._updateSlot(spec.slot, {
                icon: (e.target as HTMLInputElement).value || undefined,
              })}
          ></ha-textfield>
        </div>
      </div>
    `;
  }

  private _titleValue(): string {
    const t = this._config?.title;
    if (t === false) return '';
    return (t as string) ?? '';
  }

  private _updateTitle(v: string): void {
    this._updateRoot({ title: v || undefined });
  }

  private _entityPicker(
    key: keyof MyenergiCardConfig,
    label: string,
    domains: string[],
  ): TemplateResult {
    return html`
      <ha-entity-picker
        .hass=${this.hass}
        label=${label}
        .value=${(this._config?.[key] as string | undefined) ?? ''}
        allow-custom-entity
        .includeDomains=${domains}
        @value-changed=${(e: CustomEvent) => {
          const v = (e.detail as { value?: string }).value;
          this._updateRoot({ [key]: v || undefined } as Partial<MyenergiCardConfig>);
        }}
      ></ha-entity-picker>
    `;
  }

  private _slotEntityPicker(
    slot: NodeSlot,
    key: string,
    label: string,
    domains: string[],
  ): TemplateResult {
    const slotCfg = (this._config?.[slot] as Record<string, unknown> | undefined) ?? {};
    const value = (slotCfg[key] as string | undefined) ?? '';
    return html`
      <ha-entity-picker
        .hass=${this.hass}
        label=${label}
        .value=${value}
        allow-custom-entity
        .includeDomains=${domains}
        @value-changed=${(e: CustomEvent) => {
          const v = (e.detail as { value?: string }).value;
          this._updateSlot(slot, { [key]: v || undefined });
        }}
      ></ha-entity-picker>
    `;
  }

  private _updateRoot(patch: Partial<MyenergiCardConfig>): void {
    if (!this._config) return;
    const next: MyenergiCardConfig = { ...this._config, ...patch };
    for (const k of Object.keys(next) as Array<keyof MyenergiCardConfig>) {
      if ((next as Record<string, unknown>)[k as string] === undefined) {
        delete (next as Record<string, unknown>)[k as string];
      }
    }
    this._config = next;
    this._emitChange();
  }

  private _updateSlot(slot: NodeSlot, patch: Record<string, unknown>): void {
    if (!this._config) return;
    const existing = (this._config[slot] as Record<string, unknown> | undefined) ?? {};
    const merged: Record<string, unknown> = { ...existing, ...patch };
    for (const k of Object.keys(merged)) {
      if (merged[k] === undefined || merged[k] === '') delete merged[k];
    }
    const next = { ...this._config } as Record<string, unknown>;
    if (Object.keys(merged).length === 0) {
      delete next[slot];
    } else {
      next[slot] = merged;
    }
    this._config = next as MyenergiCardConfig;
    this._emitChange();
  }

  private _emitChange(): void {
    if (!this._config) return;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_NAME]: MyenergiCardEditor;
  }
}
