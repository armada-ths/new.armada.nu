"use server"
import { env } from "@/env"
import axios from "axios"
import { z } from "zod"

const ContactSalesSlackSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	company: z.string(),
	message: z.string()
})

export async function sendToSlack(
	args: z.infer<typeof ContactSalesSlackSchema>
) {
	const result = ContactSalesSlackSchema.safeParse(args)
	if (!result.success) {
		return { success: false }
	}
	const msg = {
		text: `
        # New External Contact Message #\n*Name:* ${args.name}\n*Email:* ${args.email}\n*Company:* ${args.company}\n*Description:*\n${args.message
					.split("\n")
					.map(line => `>${line}`)
					.join("\n")}\n`
	}
	axios
		.post(env.SLACK_SALES_HOOK_URL, msg, {
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(response => {
			console.log("Message sent successfully:", response.data)
		})
		.catch(error => {
			console.error("Error sending message:", error)
		})

	return { success: true }
}
