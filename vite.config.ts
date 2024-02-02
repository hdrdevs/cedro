import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [],
    esbuild: {
        jsxFactory: "DOMcreateElement",
        jsxFragment: "DOMcreateFragment",
        jsxInject:
            "import { DOMcreateElement, DOMcreateFragment } from '@root/core/jsxsupport';",
    },

    resolve: {
        alias: {
            "@root": path.resolve(__dirname, "./src/"),
        },
    },
});
