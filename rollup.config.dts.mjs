import dts from "rollup-plugin-dts";
import { typescriptPaths } from "rollup-plugin-typescript-paths";

export default [{
  input: "./src/icons/assets/index.d.ts",
  output: [{ file: "dist/icons/MaterialIcons.d.ts", format: "es" }],
  plugins: [typescriptPaths(), dts()],
},{
  input: "./src/symbols/assets/index.d.ts",
  output: [{ file: "dist/symbols/MaterialSymbols.d.ts", format: "es" }],
  plugins: [typescriptPaths(), dts()],
}];
