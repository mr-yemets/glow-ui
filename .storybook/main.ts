import type { StorybookConfig } from "@storybook/react-vite"
import tailwindcss from "@tailwindcss/vite"
import { fileURLToPath } from "node:url"

const config: StorybookConfig = {
  stories: ["../registry/**/*.stories.@(ts|tsx)", "../docs/**/*.mdx"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-designs"],
  framework: { name: "@storybook/react-vite", options: {} },
  core: { disableTelemetry: true },
  viteFinal: async (cfg) => {
    cfg.plugins = [...(cfg.plugins ?? []), tailwindcss()]
    cfg.resolve = {
      ...cfg.resolve,
      alias: { ...(cfg.resolve?.alias ?? {}), "@": fileURLToPath(new URL("..", import.meta.url)) },
    }
    return cfg
  },
}

export default config
