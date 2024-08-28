import path, { resolve } from "path";
import { defineConfig } from "vite";
import { glob } from "glob";

// Encuentra todos los archivos index.tsx dentro de la carpeta 'working'
const entries = glob.sync("src/**/index.tsx").reduce((acc, file) => {
    const entryName = file.replace("src/", "").replace(".tsx", "");
    acc[entryName] = resolve(__dirname, file);
    return acc;
}, {});

export default defineConfig({
    plugins: [],
    esbuild: {
        jsxFactory: "DOMcreateElement",
        jsxFragment: "DOMcreateFragment",
        jsxInject: "import { DOMcreateElement, DOMcreateFragment } from '@root/core/jsxsupport';",
    },
    build: {
        rollupOptions: {
            input: { ...entries, main: resolve(__dirname, "index.html") },
            output: {
                entryFileNames: (chunkInfo) => {
                    // Genera una estructura de nombres de archivo basada en la ubicación original
                    const name = chunkInfo.name.replace(/src\//, "");
                    return `assets/${name}.js`;
                },
                chunkFileNames: "assets/[name].js",
                assetFileNames: "assets/[name].[ext]",
                preserveModules: true,
                preserveModulesRoot: "src",
            },
            preserveEntrySignatures: "allow-extension",
        },
    },
    resolve: {
        alias: {
            "@root": path.resolve(__dirname, "./src/"),
        },
    },
});
