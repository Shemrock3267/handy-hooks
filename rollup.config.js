import typescript from "rollup-plugin-ts";
import terser from "@rollup/plugin-terser";

const packageName = require('./package.json').name;

export default {
  input: "src/index.ts",
  plugins: [typescript(), terser()],
  output: [
    {
      file: `./dist/${packageName}.esm.js`,
      format: "esm",
      exports: "auto"
    },
    {
      file: `./dist/${packageName}.js`,
      format: "cjs",
      exports: "auto"
    },
  ],
};
