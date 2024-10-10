import { FlagDefinitionsType } from "@vercel/flags"

export const FEATURE_FLAG_DEFINITIONS = {
  EVENT_PAGE: {
    description: "Access to Event Page",
    options: [
      { value: true, label: "Show" },
      { value: false, label: "Hidden" }
    ]
  },
  MAP_PAGE: {
    description: "Access to Map Page",
    options: [
      { value: true, label: "Show" },
      { value: false, label: "Hidden" }
    ]
  },
  AT_FAIR_PAGE: {
    description: "Access to At the Fair Page",
    options: [
      { value: true, label: "Show" },
      { value: false, label: "Hidden" }
    ]
  }
} satisfies FlagDefinitionsType

export const FEATURE_FLAGS: Record<
  keyof typeof FEATURE_FLAG_DEFINITIONS,
  boolean
> = {
  EVENT_PAGE: true,
  MAP_PAGE: false,
  AT_FAIR_PAGE: true
}

export default FEATURE_FLAGS
