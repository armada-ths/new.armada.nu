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
  const date = DateTime.fromMillis(epochSeconds * 1000)
  return date.toFormat(getDateFormatString(date))
}

export function formatTimestampAsTime(epochSeconds: number) {
  const date = DateTime.fromMillis(epochSeconds * 1000)
  return date.toFormat("HH:mm")
}
