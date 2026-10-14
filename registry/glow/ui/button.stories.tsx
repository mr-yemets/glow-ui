import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"

/*
 * Figma metadata lives in `parameters`:
 *  - `design`      → shown next to the story by @storybook/addon-designs
 *  - `glow.figma`  → mapping Figma → code, collected into the AI mapping file (step 5)
 * Placeholder values until the Figma audit (step 2).
 */
const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "", // TODO step 2: link to Button in the Glow Figma original
    },
    glow: {
      figma: {
        component: "Button",
        props: {
          Variant: { prop: "variant", values: { Primary: "primary", Secondary: "secondary", Outline: "outline" } },
          Size: { prop: "size", values: { Small: "small", Medium: "medium", Large: "large" } },
          State: { prop: "disabled", values: { Disabled: true } },
        },
      },
    },
  },
  args: { children: "Button" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "outline"] },
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Secondary: Story = { args: { variant: "secondary" } }
export const Outline: Story = { args: { variant: "outline" } }
export const Disabled: Story = { args: { disabled: true } }

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="small">Small</Button>
      <Button {...args} size="medium">Medium</Button>
      <Button {...args} size="large">Large</Button>
    </div>
  ),
}
