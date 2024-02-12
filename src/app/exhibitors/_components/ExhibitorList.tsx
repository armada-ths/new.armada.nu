"use client"
import { ExhibitorCard } from "@/app/exhibitors/_components/ExhibitorCard"
import ExhibitorListFilteringHeader from "@/app/exhibitors/_components/ExhibitorListFilteringHeader"
import { useExhibitors } from "@/components/shared/hooks/api/useExhibitors"
import { createContext, useMemo, useState } from "react"

interface ExhibitorFilter {
	year?: number
	setYear?: (year: number) => void
	textSearch?: string
	setTextSearch?: (text: string) => void
}

export const ExhibitorContext = createContext<ExhibitorFilter>({})

export function ExhibitorList() {
	const [year, setYear] = useState<number>()
	const [textSearch, setTextSearch] = useState<string>()
	const { data, isLoading } = useExhibitors({ year })

	const filteredExhibitors = useMemo(
		() =>
			data?.filter(exhibitor =>
				exhibitor.name.toLowerCase().includes(textSearch?.toLowerCase() ?? "")
			),
		[data, textSearch]
	)

	if (isLoading) return <div>Loading...</div>

	if (data == null || filteredExhibitors == null) return null

	return (
		<ExhibitorContext.Provider
			value={{ year, setYear, textSearch, setTextSearch }}>
			<div className="mt-10">
				<ExhibitorListFilteringHeader
					filteredMatches={filteredExhibitors.length}
					total={data.length}
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
