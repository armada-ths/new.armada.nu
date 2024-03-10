import { env } from "@/env"
import { useQuery } from "@tanstack/react-query"
import { DateTime } from "luxon"

export interface Exhibitor {
	id: number
	name: string
	type: string
	tier?: string
	company_website?: string
	about?: string
	purpose?: string
	logo_squared?: string
	logo_freesize?: string
	industries: Industry[]
	values: unknown[] // TODO Define this
	employments: Employment[]
	locations: Location[]
	competences: unknown[] // TODO Define this
	cities: string
	benefits: unknown[] // TODO Define this
	average_age: unknown // TODO Define this
	founded: unknown // TODO Define this
	groups: Group[]
	fair_location: string
	vyer_position: string
	location_special: string
	climate_compensation: boolean
	flyer: string
	booths: unknown[] // TODO Define this
	map_coordinates?: number[][]
}

export interface Industry {
	id: number
	name: string
}

export interface Employment {
	id: number
	name: string
}

export interface Location {
	id: number
	name: string
}

export interface Group {
	id: number
	name: string
}

const defaultYear = DateTime.now().minus({ months: 6 }).year

export async function fetchExhibitors(options?: { year?: number }) {
	const res = await fetch(
		`${env.NEXT_PUBLIC_API_URL}/api/exhibitors?year=${options?.year ?? defaultYear}`,
		{
			next: {
				revalidate: 3600 * 24, // 24 cache hours
				tags: [
					"exhibitors",
					options?.year?.toString() ?? defaultYear.toString()
				]
			}
		}
	)
	const result = await res.json()
	return result as Exhibitor[]
}

/**
 * Fetch all exhibitors up until the year 2022,
 * this is ok since this is statically compiled in
 * next. This should NOT be called in a client component
 */
export async function fetchAllYearExhibitors() {
	const exhibitorYears = await Promise.allSettled(
		new Array(DateTime.now().year - 2021).fill(0).map(async (_, i) => {
			const year = DateTime.now().year - i
			return {
				year: year.toString(),
				exhibitors: await fetchExhibitors({ year })
			}
		})
	)

	return exhibitorYears
		.filter(x => x.status === "fulfilled")
		.map(x => (x.status == "fulfilled" ? x.value : null))
		.filter(Boolean)
}

export function useExhibitors(options?: { year?: number }) {
	const year = options?.year ?? defaultYear
	return useQuery({
		queryKey: ["exhibitors", { year }],
		queryFn: async () =>
			fetchExhibitors({
				year
			})
	})
}
