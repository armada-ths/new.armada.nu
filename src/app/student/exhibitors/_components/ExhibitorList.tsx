"use client"

import { ExhibitorCard } from "@/app/student/exhibitors/_components/ExhibitorCard"
import ExhibitorListFilteringHeader from "@/app/student/exhibitors/_components/ExhibitorListFilteringHeader"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import { DateTime } from "luxon"
import { useSearchParams } from "next/navigation"
import { Suspense, createContext, useMemo, useState } from "react"

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

	const exhibitors = useMemo(
		() =>
			exhibitorYears.find(x => x.year === year)?.exhibitors ??
			exhibitorYears[0].exhibitors,
		[exhibitorYears, year]
	)

	const [filteredExhibitors, setFilteredExhibitors] = useState(exhibitors)

	return (
		<div className="mt-10">
			<Suspense>
				<ExhibitorListFilteringHeader
					exhibitors={exhibitors} onChange={setFilteredExhibitors}
				/>
			</Suspense>
			<div className="mt-10 grid auto-rows-[200px] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
				{filteredExhibitors.map(exhibitor => (
					<ExhibitorCard key={exhibitor.id} year={year} exhibitor={exhibitor} />
				))}
			</div>
		</div>
	)
}
