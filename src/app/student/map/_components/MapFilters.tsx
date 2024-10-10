import MultiSelect from "@/app/student/_components/MultiSelect"
import {
  Filter,
  FilterItem,
  FilterMap,
  applyFilters,
  filterBySearch
} from "@/app/student/lib/filters"
import { Booth } from "@/app/student/map/lib/booths"
import { Input } from "@/components/ui/input"

import { useRef, useState } from "react"

export default function MapFilters({
  booths,
  filters,
  setFilters,
  setFilteredBooths
}: {
  booths: Booth[]
  filters: FilterMap
  setFilters: (filters: FilterMap) => void
  setFilteredBooths: (filtered: Booth[]) => void
}) {
  const [searchText, setSearchText] = useState("")

  const inputRef = useRef<HTMLInputElement>(null)

  function onFilterChange(filter: Filter, newSelection: FilterItem[]) {
    const newFilters = {
      ...filters,
      [filter.key]: { ...filter, selected: newSelection }
    }
    setFilters(newFilters)
    setFilteredBooths(applyFilters(booths, Object.values(newFilters))) // do filtering and notify the parent
  }

  function onSearchChange(text: string) {
    setSearchText(text)
    if (text.trim() !== "") setFilteredBooths(filterBySearch(booths, text))
    else setFilteredBooths(applyFilters(booths, Object.values(filters))) // apply filters again when input is cleared
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
