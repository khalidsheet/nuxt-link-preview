import { fileURLToPath } from "url";
import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImportsDir,
} from "@nuxt/kit";

export interface ModuleOptions {
  addPlugin: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-link-preview",
    configKey: "linkPreview",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  defaults: {
    addPlugin: true,
  },

  setup(options, nuxt) {
    if (options.addPlugin) {
      const { resolve } = createResolver(import.meta.url);
      const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
      nuxt.options.build.transpile.push(runtimeDir);

      addPlugin({
        src: resolve(runtimeDir, "plugin"),
        mode: "server",
      });

      nuxt.hook("imports:dirs", (dirs) => {
        dirs.push(resolve(runtimeDir, "composables"));
        dirs.push(resolve(runtimeDir, "types"));
      });
    }
  },
});
