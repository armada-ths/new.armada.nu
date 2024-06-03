import { type ApiData } from "@vercel/flags"
import { NextResponse } from "next/server"
import { FEATURE_FLAG_DEFINITIONS } from "../../../../feature_flags"

export async function GET() {
	const apiData = {
		definitions: FEATURE_FLAG_DEFINITIONS
	}
	return NextResponse.json<ApiData>(apiData)
}
