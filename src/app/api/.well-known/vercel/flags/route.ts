import { type ApiData } from "@vercel/flags"
import { NextResponse } from "next/server"

export async function GET() {
	const apiData = {
		definitions: {
			newFeature: {
				description: "Something very coolt",
				origin: "https://armada.nu/#new-feature",
				options: [
					{ value: false, label: "Off" },
					{ value: true, label: "On" }
				]
			}
		}
	}
	return NextResponse.json<ApiData>(apiData)
}
