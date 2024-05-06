import featureFlags from "@/feature_flags"
import { cookies } from "next/headers"

export function feature(feature: keyof typeof featureFlags) {
	const rawOverrides = cookies().get("vercel-flag-overrides")
	const overrides =
		rawOverrides == null
			? {}
			: (JSON.parse(rawOverrides.value) as Record<string, boolean>)

	if (overrides[feature] != null) {
		return overrides[feature]
	} else if (featureFlags[feature] != null) {
		return featureFlags[feature]
	}
	return false
}
