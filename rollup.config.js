import typescript from "rollup-plugin-ts";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  plugins: [typescript(), terser()],
  output: [
    {
      file: `./dist/esm/index.esm.js`,
      format: "esm",
      exports: "auto"
    },
    {
      file: `./dist/cjs/index.js`,
      format: "cjs",
      exports: "auto"
    },
  ],
};
