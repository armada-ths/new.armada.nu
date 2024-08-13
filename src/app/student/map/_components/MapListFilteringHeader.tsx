import MultiSelect from "@/app/student/exhibitors/_components/MultiSelect"
import { Booth } from "@/app/student/map/lib/booths"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import { Input } from "@/components/ui/input"

import { useRef, useState } from "react"

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

function satisfiesFilter(booth: Booth, filter: Filter) {
	if (filter.selected.length === 0) return true
	return booth["exhibitor"][filter.key].some(x =>
		filter.selected.some(y => x.id === y.id)
	)
}

function applyFilters(booths: Booth[], filters: Filter[]) {
	return booths.filter(e => filters.every(f => satisfiesFilter(e, f)))
}

function filterBySearch(booths: Booth[], text: string) {
	return booths.filter(e =>
		e.exhibitor.name.toLowerCase().includes(text.toLowerCase())
	)
}

// Gets all the possible options by looping over each exhibitor
function getAllFilterOptions(key: FilterKey, booths: Booth[]): FilterItem[] {
	const distinct = new Map<FilterItem["id"], FilterItem>()
	booths.forEach(e => {
		e.exhibitor[key].forEach(item => distinct.set(item.id, item))
	})
	return Array.from(distinct.values()).sort((a, b) =>
		a.name.localeCompare(b.name)
	)
}

export default function MapListFilteringHeader({
	booths,
	onChange
}: {
	booths: Booth[]
	onChange: (filtered: Booth[]) => void
}) {
	const [searchText, setSearchText] = useState("")

	const inputRef = useRef<HTMLInputElement>(null)

	function makeFilter(key: FilterKey, label: string): Filter {
		return {
			key,
			label,
			selected: [],
			items: getAllFilterOptions(key, booths)
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
		onChange(applyFilters(booths, Object.values(newFilters))) // do filtering and notify the parent
	}

	function onSearchChange(text: string) {
		setSearchText(text)
		if (text.trim() !== "") onChange(filterBySearch(booths, text))
		else onChange(applyFilters(booths, Object.values(filters))) // apply filters again when input is cleared
	}

	return (
		<div className="flex flex-wrap gap-3">
			<Input
				searchIcon={true}
				ref={inputRef}
				type="text"
				placeholder="Search all"
				className="w-full xs:w-[200px]"
				value={searchText}
				onChange={e => onSearchChange(e.target.value)}
				onKeyDown={e => e.key === "Enter" && inputRef.current?.blur()}
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
