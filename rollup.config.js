import typescript from 'rollup-plugin-typescript2';
import {terser} from "rollup-plugin-terser";
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';
// import path from 'path';

export default {
  external: [
    'jquery',
    // 'bootstrap',
    'sweetalert2',
    'clipboard',
    'daterangepicker'
  ],
  input: './src/index.ts',
  plugins: [
    typescript({
      tsconfigDefaults: {compilerOptions: {}},
      tsconfig: "tsconfig.json",
      tsconfigOverride: {compilerOptions: {}},
      useTsconfigDeclarationDir: true
    }),
    terser(),
    json(),
    commonjs(),
    resolve({
      mainFields: ['module', 'main'],
      browser: true
    }),
    postcss({
      // include: 'src/index.css',
      // extract: path.resolve(`dist/${pkg.name}.css`),
      minimize: true,
    }),
  ],
  output: [
    // ES module (for bundlers) build.
    {
      format: 'esm',
      file: pkg.module,
      globals: {
        jquery: '$'
      }
    },
    // browser-friendly UMD build
    {
      format: 'umd',
      file: pkg.browser,
      name: pkg.name
        .replace(/^.*\/|\.js$/g, '')
        .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', '')),
      globals: {
        jquery: '$'
      }
    }
  ],
  watch: {
    exclude: 'node_modules/**',
    include: 'src/**'
  }
}