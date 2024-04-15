import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
	server: {},
	client: {
		NEXT_PUBLIC_API_URL: z.string().min(1)
	},
	runtimeEnv: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
	}
	// If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
	// For Next.js >= 13.4.4, you only need to destructure client variables:
	/* 	experimental__runtimeEnv: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_PUBLIC_API_URL
	} */
})
