import featureFlags, { FEATURE_FLAGS } from "@/feature_flags"
import { decrypt, FlagOverridesType } from "@vercel/flags"
import { cookies } from "next/headers"

export async function features() {
  const overrideCookie = cookies().get("vercel-flag-overrides")?.value
  const overrides = overrideCookie
    ? await decrypt<FlagOverridesType>(overrideCookie)
    : {}
  return {
    ...FEATURE_FLAGS,
    ...overrides
  }
}

export async function feature(feature: keyof typeof featureFlags) {
  return (await features())[feature] ?? false
}
