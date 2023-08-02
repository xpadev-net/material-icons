import {defineConfig, Options} from 'tsup'

const baseConfig: Options = {
  bundle: true,
  format: ["cjs","esm"],
  external: ["react"]
};

export default defineConfig([
  {
    ...baseConfig,
    entry: ["src/icons/MaterialIcons.tsx"],
    outDir: "./dist/icons/",
  },
  {
    ...baseConfig,
    entry: ["src/symbols/MaterialSymbols.tsx"],
    outDir: "./dist/symbols/",
  }
])