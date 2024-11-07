import featureFlags from "@/feature_flags"
import { cookies } from "next/headers"

export function feature(feature: keyof typeof featureFlags) {
  const cookie = cookies()

  const result = cookie.get("vercel-flag-overrides")
  if (result != null) {
    return parseCookie(feature, result.value)
  }
  return false
}

function parseCookie(
  feature: keyof typeof featureFlags,
  rawOverrides: string | undefined
) {
  const overrides =
    rawOverrides == null
      ? {}
      : (JSON.parse(rawOverrides) as Record<string, boolean>)

  if (overrides[feature] != null) {
    return overrides[feature]
  } else if (featureFlags[feature] != null) {
    return featureFlags[feature]
  }
  return false
}
