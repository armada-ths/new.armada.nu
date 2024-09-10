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
 * There is something weird going on with the ais timestamp,
 * making luxon think we're in the wrong timezone, this way
 * we force it to be sweden specific.
 */
function adjustTimezone(date: DateTime) {
  if (date.isInDST) return date.setZone("UTC-2")
  return date.setZone("UTC-1")
}
