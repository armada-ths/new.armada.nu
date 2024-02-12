"use client"
import { ExhibitorCard } from "@/app/exhibitors/_components/ExhibitorCard"
import ExhibitorListFilteringHeader from "@/app/exhibitors/_components/ExhibitorListFilteringHeader"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import { createContext, useMemo, useState } from "react"

interface ExhibitorFilter {
	year?: number
	setYear?: (year: number) => void
	textSearch?: string
	setTextSearch?: (text: string) => void
}

export const ExhibitorContext = createContext<ExhibitorFilter>({})

export function ExhibitorList({ exhibitors }: { exhibitors: Exhibitor[] }) {
	const [year, setYear] = useState<number>()
	const [textSearch, setTextSearch] = useState<string>()

	const filteredExhibitors = useMemo(
		() =>
			exhibitors?.filter(exhibitor =>
				exhibitor.name.toLowerCase().includes(textSearch?.toLowerCase() ?? "")
			),
		[exhibitors, textSearch]
	)

	return (
		<ExhibitorContext.Provider
			value={{ year, setYear, textSearch, setTextSearch }}>
			<div className="mt-10">
				<ExhibitorListFilteringHeader
					filteredMatches={filteredExhibitors.length}
					total={exhibitors.length}
				/>
				<div className="mt-10 flex flex-wrap gap-4">
					{filteredExhibitors.map(exhibitor => (
						<ExhibitorCard key={exhibitor.id} exhibitor={exhibitor} />
					))}
				</div>
			</div>
		</ExhibitorContext.Provider>
	)
}
