"use client"
import { ExhibitorCard } from "@/app/student/exhibitors/_components/ExhibitorCard"
import ExhibitorListFilteringHeader from "@/app/student/exhibitors/_components/ExhibitorListFilteringHeader"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import { DateTime } from "luxon"
import { useSearchParams } from "next/navigation"
import { Suspense, createContext, useMemo } from "react"

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
			<Suspense>
				<ExhibitorListFilteringHeader
					filtered={filteredExhibitors.length}
					total={exhibitors.length}
				/>
			</Suspense>
			<div className="mt-10 flex flex-wrap justify-center gap-4">
				{filteredExhibitors.map(exhibitor => (
					<ExhibitorCard key={exhibitor.id} year={year} exhibitor={exhibitor} />
				))}
			</div>
		</div>
	)
}
