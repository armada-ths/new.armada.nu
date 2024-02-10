import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
	server: {
		CONTENTFUL_SPACE_ID: z.string().min(1),
		CONTENTFUL_DELIVERY_TOKEN: z.string().min(1),
		CONTENTFUL_PREVIEW_TOKEN: z.string().min(1)
	},
	client: {
		NEXT_PUBLIC_API_URL: z.string().min(1)
	},
	runtimeEnv: {
		CONTENTFUL_DELIVERY_TOKEN: process.env.CONTENTFUL_DELIVERY_TOKEN,
		CONTENTFUL_PREVIEW_TOKEN: process.env.CONTENTFUL_PREVIEW_TOKEN,
		CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
	}
	// If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
	// For Next.js >= 13.4.4, you only need to destructure client variables:
	/* 	experimental__runtimeEnv: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_PUBLIC_API_URL
	} */
})
