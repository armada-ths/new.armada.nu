import { verifyAccess, type ApiData } from "@vercel/flags"
import { NextRequest, NextResponse } from "next/server"
import { FEATURE_FLAG_DEFINITIONS } from "../../../../feature_flags"

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get("Authorization"))
  if (!access) return NextResponse.json(null, { status: 401 })

  const apiData = {
    definitions: FEATURE_FLAG_DEFINITIONS
  }

  return NextResponse.json<ApiData>(apiData)
}
