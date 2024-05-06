import { type ApiData } from "@vercel/flags"
import { NextResponse } from "next/server"

export async function GET() {
	const apiData = {
		definitions: {
			events: {
				description: "Show event page",
				options: [
					{ value: false, label: "Off" },
					{ value: true, label: "On" }
				]
			}
		}
	}
	return NextResponse.json<ApiData>(apiData)
}
