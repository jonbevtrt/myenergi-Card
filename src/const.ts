import type { NodeSlot } from './types.js';

export const CARD_NAME = 'myenergi-card';
export const EDITOR_NAME = 'myenergi-card-editor';
export const CARD_VERSION = '0.1.0';

export const VIEWBOX = 400;

export const CENTER = { x: 200, y: 220 };
export const NODE_RADIUS = 36;
export const CENTER_RADIUS = 42;
export const ORBIT_RADIUS = 135;

export const FLOW_THRESHOLD_DEFAULT = 0.05;

/** Each slot has a fixed angle (degrees, 0 = east, 90 = south) */
export const SLOT_ANGLES: Record<NodeSlot, number> = {
  home: 270,
  grid: 330,
  solar: 30,
  eddi: 90,
  zappi: 150,
  libbi: 210,
};

export const SLOT_DEFAULTS: Record<
  NodeSlot,
  { name: string; icon: string; color: string }
> = {
  home:  { name: 'Home',  icon: 'mdi:home-variant-outline', color: 'var(--myenergi-magenta)' },
  grid:  { name: 'Grid',  icon: 'mdi:transmission-tower',   color: 'var(--myenergi-orange)'  },
  solar: { name: 'Solar', icon: 'mdi:solar-panel',          color: 'var(--myenergi-green)'   },
  libbi: { name: 'LIBBI', icon: 'mdi:battery-high',         color: 'var(--myenergi-orange)'  },
  zappi: { name: 'ZAPPI', icon: 'mdi:car-electric-outline', color: 'var(--myenergi-blue)'    },
  eddi:  { name: 'EDDI',  icon: 'mdi:water-boiler',         color: 'var(--myenergi-red)'     },
};
