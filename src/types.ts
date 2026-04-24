import type { HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';

export type PowerUnit = 'kW' | 'W';

export type HeaterType = 'tank' | 'pool' | 'radiator' | 'underfloor';

export interface NodeConfig {
  power?: string;
  name?: string;
  icon?: string;
  invert?: boolean;
}

export interface BatteryConfig extends NodeConfig {
  soc?: string;
}

export interface ZappiConfig extends NodeConfig {
  plug?: string;
  status?: string;
}

export interface EddiConfig extends NodeConfig {
  heater_type?: HeaterType;
}

export interface MyenergiCardConfig extends LovelaceCardConfig {
  type: string;
  title?: string | false;
  eco_score?: string;
  show_footer?: boolean;
  flow_threshold?: number;
  power_unit?: PowerUnit;

  grid?: NodeConfig;
  solar?: NodeConfig;
  home?: NodeConfig;
  libbi?: BatteryConfig;
  zappi?: ZappiConfig;
  eddi?: EddiConfig;
}

export type NodeSlot =
  | 'home'
  | 'grid'
  | 'solar'
  | 'libbi'
  | 'zappi'
  | 'eddi';

export interface NodeRender {
  slot: NodeSlot;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  labelAnchor: 'start' | 'middle' | 'end';
  name: string;
  icon: string;
  color: string;
  /** signed power in kW (positive = away from centre) */
  power: number;
  /** absolute power for label */
  displayPower: number;
  /** whether the entity is available */
  available: boolean;
  /** the direction of flow on the connection line */
  flow: 'none' | 'in' | 'out';
  /** optional secondary line above icon (e.g. name or status) */
  subtitle?: string;
  /** optional badge on the node */
  badge?: NodeBadge;
  /** extra: battery SOC (0-100) */
  soc?: number;
}

export type NodeBadge = 'play' | 'pause' | 'charging' | 'plug-off' | 'bolt';

export interface HassLike {
  hass: HomeAssistant;
}
