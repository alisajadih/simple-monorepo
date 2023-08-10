import path from "path";
import { defineConfig, mergeConfig, type UserConfigExport } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

const srcDir = path.resolve(process.cwd(), "src");
const srcEntry = path.resolve(srcDir, "index.ts");

export const createConfig = (config: UserConfigExport) =>
  mergeConfig(
    defineConfig({
      plugins: [
        tsconfigPaths(),
        dts({
          insertTypesEntry: true,
          copyDtsFiles: true,
          entryRoot: srcDir,
        }),
      ],
      build: {
        lib: {
          entry: srcEntry,
          formats: ["es", "cjs"],
          fileName(format) {
            const formatsName = {
              es: "module",
              cjs: "common",
            };
            return `index.${formatsName[format]}.js`;
          },
        },
        rollupOptions: {
          external: (id) =>
            !(
              id.startsWith(".") ||
              id.startsWith("src/") ||
              path.isAbsolute(id)
            ),
        },
      },
    }),
    config as any
  );
