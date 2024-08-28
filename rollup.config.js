import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import inject from "@rollup/plugin-inject";

export default {
    input: "src/index.ts",
    output: [
        {
            file: "lib/index.js",
            format: "cjs",
        },
        {
            file: "lib/index.esm.js",
            format: "esm",
        },
    ],
    plugins: [
        resolve({
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        }),
        inject({
            DOMcreateElement: ["@root/core/jsxsupport", "DOMcreateElement"],
            DOMcreateFragment: ["@root/core/jsxsupport", "DOMcreateFragment"],
        }),
        typescript({
            tsconfig: "./tsconfig.json", // Asegúrate de que esta ruta sea correcta
        }),
        postcss({
            extract: true,
            minimize: true,
        }),
    ],
    external: ["react", "react-dom"],
};
