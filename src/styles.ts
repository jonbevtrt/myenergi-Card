import { css } from 'lit';

export const styles = css`
  :host {
    --myenergi-green: #2ecc71;
    --myenergi-orange: #f39c12;
    --myenergi-red: #e74c3c;
    --myenergi-magenta: #c71585;
    --myenergi-blue: #3498db;
    --myenergi-yellow: #f1c40f;
    --myenergi-grey: #555c66;
    --myenergi-bg: #0b0d10;
    --myenergi-fg: #ffffff;
    --myenergi-dim: rgba(255, 255, 255, 0.55);
    --myenergi-line: rgba(255, 255, 255, 0.15);
    display: block;
  }

  ha-card {
    background: var(--myenergi-bg);
    color: var(--myenergi-fg);
    overflow: hidden;
    padding: 0;
    position: relative;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 16px 4px 16px;
    font-size: 18px;
    font-weight: 400;
    color: var(--myenergi-fg);
  }

  .header ha-icon {
    --mdc-icon-size: 22px;
    color: var(--myenergi-fg);
    opacity: 0.9;
  }

  .header .title {
    flex: 1;
  }

  .diagram-wrap {
    padding: 0 12px 4px 12px;
  }

  svg.diagram {
    width: 100%;
    height: auto;
    display: block;
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 0 14px 0;
    color: var(--myenergi-dim);
    font-size: 13px;
    letter-spacing: 0.02em;
    gap: 6px;
  }

  .footer svg {
    height: 14px;
    width: auto;
  }

  /* SVG element styles */
  .line {
    stroke: var(--myenergi-line);
    stroke-width: 2;
    fill: none;
    stroke-linecap: round;
  }

  .chevron {
    fill: var(--myenergi-yellow);
    stroke: none;
  }

  .node-bg {
    fill: var(--myenergi-bg);
    stroke-width: 3;
  }

  .node-label,
  .node-value {
    font-family: var(--primary-font-family, 'Roboto', 'Noto', sans-serif);
    font-weight: 500;
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .node-label {
    font-size: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .node-value {
    font-size: 14px;
  }

  .center-label {
    fill: var(--myenergi-fg);
    font-size: 20px;
    font-weight: 600;
    text-anchor: middle;
    dominant-baseline: middle;
    font-family: var(--primary-font-family, 'Roboto', 'Noto', sans-serif);
  }

  .dim {
    opacity: 0.45;
  }

  .badge-bg {
    fill: var(--myenergi-blue);
  }

  @media (prefers-reduced-motion: reduce) {
    .chevron {
      display: none;
    }
  }
`;
