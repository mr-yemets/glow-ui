import type { Preview } from "@storybook/react-vite"

import "../src/styles.css"

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Glow theme mode",
      toolbar: { icon: "contrast", items: ["light", "dark"], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = context.globals.theme
      return Story()
    },
  ],
  parameters: {
    controls: { expanded: true },
    a11y: { test: "error" },
  },
}

export default preview
