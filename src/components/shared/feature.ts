import featureFlags, { FEATURE_FLAGS } from "@/feature_flags"
import { decrypt, FlagOverridesType } from "@vercel/flags"
import { cookies } from "next/headers"

export async function feature(feature: keyof typeof featureFlags) {
  const overrideCookie = cookies().get("vercel-flag-overrides")?.value
  const overrides = overrideCookie
    ? await decrypt<FlagOverridesType>(overrideCookie)
    : {}

  return overrides?.[feature] ?? FEATURE_FLAGS[feature] ?? false
}
