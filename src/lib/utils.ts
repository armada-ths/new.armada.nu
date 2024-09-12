import { clsx, type ClassValue } from "clsx"
import { DateTime } from "luxon"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDateFormatString(date: DateTime) {
  return `d MMMM ${date.year !== DateTime.now().year ? " YYYY" : ""}`
}

export function formatDate(isoString: string) {
  const date = DateTime.fromISO(isoString)
  return date.toFormat(getDateFormatString(date))
}

export function formatTimestampAsDate(epochSeconds: number) {
  const date = adjustTimezone(
    DateTime.fromMillis(epochSeconds * 1000, {
      zone: "Europe/London"
    })
  )
  return date.toFormat(getDateFormatString(date))
}

export function formatTimestampAsTime(epochSeconds: number) {
  const date = adjustTimezone(
    DateTime.fromMillis(epochSeconds * 1000, {
      zone: "Europe/London"
    })
  )
  return date.toFormat("HH:mm")
}

/**
 * The AIS API gives us dates in Epoch timestamp for GMT-0 without timezone info
 * If someone sets a time for a event as 17, it will be stored as 19 in the AIS
 * This functions adds the context of the timezone back
 */
function adjustTimezone(date: DateTime) {
  return date.setZone("UTC-0")
}
