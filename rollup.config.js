import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import { string } from 'rollup-plugin-string';

const dev = process.env.ROLLUP_WATCH === 'true';

export default {
  input: 'src/myenergi-card.ts',
  output: {
    file: 'dist/myenergi-card.js',
    format: 'es',
    sourcemap: true,
    inlineDynamicImports: true,
  },
  plugins: [
    string({ include: '**/*.svg' }),
    resolve({ browser: true }),
    commonjs(),
    json(),
    typescript({ tsconfig: './tsconfig.json', sourceMap: true, inlineSources: true }),
    !dev && terser({ format: { comments: false } }),
  ],
};
