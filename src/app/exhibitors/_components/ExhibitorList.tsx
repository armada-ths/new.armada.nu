"use client"
import { ExhibitorCard } from "@/app/exhibitors/_components/ExhibitorCard"
import ExhibitorListFilteringHeader from "@/app/exhibitors/_components/ExhibitorListFilteringHeader"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import { DateTime } from "luxon"
import { useSearchParams } from "next/navigation"
import { createContext, useMemo } from "react"

interface ExhibitorFilter {
	year?: number
	setYear?: (year: number) => void
	textSearch?: string
	setTextSearch?: (text: string) => void
}

export const ExhibitorContext = createContext<ExhibitorFilter>({})

export function ExhibitorList({
	exhibitorYears
}: {
	exhibitorYears: { year: string; exhibitors: Exhibitor[] }[]
}) {
	const { get } = useSearchParams()
	const year =
		get("year") ?? DateTime.now().minus({ months: 6 }).year.toString()
	const search = get("search")

	const exhibitors = useMemo(
		() =>
			exhibitorYears.find(x => x.year === year)?.exhibitors ??
			exhibitorYears[0].exhibitors,
		[exhibitorYears, year]
	)

	const filteredExhibitors = useMemo(
		() =>
			exhibitors?.filter(exhibitor =>
				exhibitor.name.toLowerCase().includes(search?.toLowerCase() ?? "")
			),
		[exhibitors, search]
	)

	return (
		<div className="mt-10">
			<ExhibitorListFilteringHeader
				filtered={filteredExhibitors.length}
				total={exhibitors.length}
			/>
			<div className="mt-10 flex flex-wrap gap-4">
				{filteredExhibitors.map(exhibitor => (
					<ExhibitorCard key={exhibitor.id} year={year} exhibitor={exhibitor} />
				))}
			</div>
		</div>
	)
}
