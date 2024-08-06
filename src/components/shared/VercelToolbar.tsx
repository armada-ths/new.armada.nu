"use client"
import featureFlags from "@/feature_flags"
import { FlagValues } from "@vercel/flags/react"
import { VercelToolbar } from "@vercel/toolbar/next"

export function DevToolbar() {
  return (
    <>
      <FlagValues values={featureFlags} />
      {process.env.NODE_ENV === "development" && <VercelToolbar />}
    </>
  )
}
