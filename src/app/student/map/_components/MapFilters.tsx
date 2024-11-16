import {
  Filter,
  FilterItem,
  FilterMap,
  applyFilters
} from "@/app/student/lib/filters"
import FilterSection from "@/app/student/map/_components/FilterSection"
import { Booth } from "@/app/student/map/lib/booths"
import { Button } from "@/components/ui/button"

export default function MapFilters({
  booths,
  setFilteredBooths,
  filters,
  setFilters,
  onSelect
}: {
  booths: Booth[]
  filters: FilterMap
  setFilters: (filters: FilterMap) => void
  setFilteredBooths: (filtered: Booth[]) => void
  onSelect: () => void
}) {
  function onFilterChange(filter: Filter, newSelection: FilterItem[]) {
    const newFilters = {
      ...filters,
      [filter.key]: { ...filter, selected: newSelection }
    }
    setFilters(newFilters)
    setFilteredBooths(applyFilters(booths, Object.values(newFilters))) // do filtering and notify the parent
  }

  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {Object.values(filters).map(f => (
          <FilterSection
            key={f.key}
            filter={f}
            onChange={selected => onFilterChange(f, selected)}></FilterSection>
        ))}
      </div>
      <div className="flex px-5">
        <Button onClick={onSelect} className="ml-auto px-7">
          Select
        </Button>
      </div>
    </div>
  )
}
