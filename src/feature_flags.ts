import { FlagDefinitionsType } from "@vercel/flags"

const FEATURE_FLAG_DEFINITIONS = {
	test: {}
} satisfies FlagDefinitionsType

export const FEATURE_FLAGS: Record<
	keyof typeof FEATURE_FLAG_DEFINITIONS,
	boolean
> = {
	test: true
}

export default FEATURE_FLAG_DEFINITIONS
