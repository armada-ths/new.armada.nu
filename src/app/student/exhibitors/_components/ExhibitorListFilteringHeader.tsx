import MultiSelect from "@/app/student/exhibitors/_components/MultiSelect"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import { DateTime } from "luxon"
import { useState, useMemo } from "react"

export type FilterKey = "employments" | "industries"
export type FilterItem = Exhibitor[FilterKey][number]

export type Filter = {
	key: FilterKey
	items: FilterItem[]
	selected: FilterItem[]
	label: string
}

function satisfiesFilter(exhibitor: Exhibitor, filter: Filter) {
	if (filter.selected.length === 0) return true
	return exhibitor[filter.key].some(({ id }) =>
		filter.selected.map(s => s.id).includes(id)
	)
}

function applyFilters(exhibitors: Exhibitor[], filters: Filter[]) {
	return exhibitors.filter(e => filters.every(f => satisfiesFilter(e, f)))
}

// Gets all the possible options by looping over each exhibitor
// Ideally we would just get this info from the api but couldnt find any endpoint for it
function getAllFilterOptions(
	key: FilterKey,
	exhibitors: Exhibitor[]
): FilterItem[] {
	const distinct = new Map<FilterItem["id"], FilterItem>()
	exhibitors.forEach(e => {
		e[key].forEach(item => distinct.set(item.id, item))
	})
	return Array.from(distinct.values())
}

function getAllYears() {
	const currentYear = DateTime.now().year
	return new Array(currentYear - 2021).fill(0).map((_, i) => currentYear - i)
}

export default function ExhibitorListFilteringHeader({
	exhibitors,
	onChange
}: {
	exhibitors: Exhibitor[]
	onChange: (filtered: Exhibitor[]) => void
}) {
	const [searchText, setSearchText] = useState("")
	const [year, setYear] = useState(
		DateTime.now().minus({ months: 6 }).year.toString()
	)
	const allYears = getAllYears()

	function makeFilter(key: FilterKey, label: string): Filter {
		return {
			key,
			label,
			selected: [],
			items: getAllFilterOptions(key, exhibitors)
		}
	}

	const [filters, setFilters] = useState<{ [K in FilterKey]: Filter }>({
		employments: makeFilter("employments", "Employments"),
		industries: makeFilter("industries", "Industries")
	})

	const [numFiltered, setNumFiltered] = useState(exhibitors.length)

	function onFilterChange(filter: Filter, newSelections: FilterItem[]) {
		const newFilters = {
			...filters,
			[filter.key]: { ...filter, selected: newSelections }
		}
		setFilters(newFilters)
		const filteredExhibitors = applyFilters(exhibitors, Object.values(newFilters))
		setNumFiltered(filteredExhibitors.length)
		onChange(filteredExhibitors)
	}

	return (
		<div className="flex flex-col">
			<div className="flex w-full flex-wrap gap-3 items-center">
				<Select value={year} onValueChange={setYear}>
					<SelectTrigger className="w-[120px]">
						<SelectValue placeholder="Fair Year" />
					</SelectTrigger>
					<SelectContent>
						{allYears.map(year => (
							<SelectItem key={year} value={year.toString()}>
								{year}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{Object.values(filters).map(f => (
					<MultiSelect
						key={f.key}
						filter={f}
						onChange={selected => onFilterChange(f, selected)}></MultiSelect>
				))}

				<Input
					type="text"
					placeholder="Search all"
					className="w-[200px]"
					value={searchText}
					onChange={e => setSearchText(e.target.value)}
				/>
			</div>
			<p className="mt-4">
				{numFiltered} out of {exhibitors.length}
			</p>
		</div>
	)
}
