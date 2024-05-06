import { FlagDefinitionsType } from "@vercel/flags"

export const FEATURE_FLAG_DEFINITIONS = {} satisfies FlagDefinitionsType

export const FEATURE_FLAGS: Record<
	keyof typeof FEATURE_FLAG_DEFINITIONS,
	boolean
> = {}

export default FEATURE_FLAGS
