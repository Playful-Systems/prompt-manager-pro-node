import { defineConfig } from 'tsup'


export default defineConfig({
  entry: ['src/index.ts'],
  outDir: "dist",
  treeshake: true,
  sourcemap: true,
  dts: true,
  format: 'esm',
  clean: true,
  minify: true,
  splitting: true,
})