import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const input = {
  ".": "src/index.ts", // ✅ instead of "index"
  "hooks/useToggle": "src/hooks/useToggle/index.ts",
  "hooks/useDebounce": "src/hooks/useDebounce/index.ts",
  "hooks/useEventListener": "src/hooks/useEventListener/index.ts",
  "hooks/useLocalStorage": "src/hooks/useLocalStorage/index.ts",
  "hooks/useAsync": "src/hooks/useAsync/index.ts",
};

export default [
  {
    input,
    output: {
      dir: "dist",
      format: "esm",
      entryFileNames: ({ name }) => {
        // Avoid './' or '/' at start
        if (name === ".") return "index.esm.js";
        return `${name}/index.esm.js`;
      },
      sourcemap: true,
    },
    external: ["react"],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
    ],
  },
  {
    input,
    output: {
      dir: "dist",
      format: "cjs",
      entryFileNames: ({ name }) => {
        // Avoid './' or '/' at start
        if (name === ".") return "index.cjs.js";
        return `${name}/index.cjs.js`;
      },
      exports: "named",
      sourcemap: true,
    },
    external: ["react"],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
];
