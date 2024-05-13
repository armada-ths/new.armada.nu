import MultiSelect from "@/app/student/exhibitors/_components/MultiSelect"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import { Input } from "@/components/ui/input"

import { useState } from "react"

// Filtering assumptions:
// - selecting multiple options for a filter gives the union (not intersection) of those options
// - selecting no options is the same as selecting all options
// - filters are ignored when using the search bar

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

function filterBySearch(exhibitors: Exhibitor[], text: string) {
	return exhibitors.filter(e =>
		e.name.toLowerCase().includes(text.toLowerCase())
	)
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
	return Array.from(distinct.values()).sort((a, b) => a.name.localeCompare(b.name))
}

export default function ExhibitorListFilteringHeader({
	exhibitors,
	onChange
}: {
	exhibitors: Exhibitor[]
	onChange: (filtered: Exhibitor[]) => void
}) {
	const [searchText, setSearchText] = useState("")

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

	function onFilterChange(filter: Filter, newSelection: FilterItem[]) {
		const newFilters = {
			...filters,
			[filter.key]: { ...filter, selected: newSelection }
		}
		setFilters(newFilters)
		onChange(applyFilters(exhibitors, Object.values(newFilters))) // do filtering and notify the parent
	}

	function onSearchChange(text: string) {
		setSearchText(text)
		if (text.trim() !== "") onChange(filterBySearch(exhibitors, text))
		else onChange(applyFilters(exhibitors, Object.values(filters))) // apply filters again when input is cleared
	}

	return (
			<div className="flex flex-wrap gap-3">
				<Input
					type="text"
					placeholder="Search all"
					className="w-[150px]"
					value={searchText}
					onChange={e => onSearchChange(e.target.value)}
				/>
				{Object.values(filters).map(f => (
					<MultiSelect
						key={f.key}
						filter={f}
						onChange={selected => onFilterChange(f, selected)}></MultiSelect>
				))}
			</div>
	)
}
