import graphqlLoaderPluginPkg from "@luckycatfactory/esbuild-graphql-loader";
import { execa } from "execa";
import getPort from "get-port";
import { defineConfig } from "tsup";

const graphqlLoaderPlugin = graphqlLoaderPluginPkg.default;
// Assign a single port for the process
const port = await getPort({ port: 4444 });
const { SERVER_BUILD } = process.env;

const isServerBuild = SERVER_BUILD === "true";

export default defineConfig((options) => ({
  outDir: "dist",
  splitting: true,
  format: ["esm", "cjs"],
  sourcemap: true,
  clean: false,
  dts: !isServerBuild,
  minify: false,
  esbuildPlugins: [graphqlLoaderPlugin()],
  entry: { index: "src/bin/index.ts" },
  async onSuccess() {
    if (isServerBuild) return;
    const cmd = execa("node", ["--import", "tsx/esm", "./dist/index.js"], {
      stdio: "inherit",
      cleanup: true,
      env: {
        SERVER_PORT: port,
        CODE_GEN: true,
        WATCH: Boolean(options.watch),
        FUEL_PROVIDER: process.env.FUEL_PROVIDER,
      },
    });
    // Wait process to close until restarting
    return async () => {
      const killProcess = new Promise((resolve) => {
        cmd.on("close", () => resolve(true));
      });
      cmd.kill("SIGTERM");
      await killProcess;
    };
  },
}));
