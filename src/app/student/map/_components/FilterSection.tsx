"use client"

import { Filter, FilterItem } from "@/app/student/lib/filters"
import { FilterSelectionItem } from "@/app/student/map/_components/FilterSelectionItem"

export default function FilterSection({
  filter,
  onChange
}: {
  filter: Filter
  onChange: (selected: FilterItem[]) => void
}) {
  const { items, selected, label } = filter

  function isSelected(item: FilterItem) {
    return selected.some(s => s.id === item.id)
  }

  function onSelectionChange(item: FilterItem) {
    if (isSelected(item)) {
      onChange(selected.filter(s => s.id !== item.id)) // remove item
    } else {
      onChange([...selected, item]) // add item
    }
  }

  return (
    <div className="flex flex-col justify-between">
      <div>
        <h2 className="mt-4 text-left text-xl text-stone-200">{label}</h2>
        <div className="my-1 mt-3 flex flex-wrap gap-4">
          {items.map(item => (
            <div className="" key={item.id}>
              <FilterSelectionItem
                name={item.name}
                isSelected={filter.selected.includes(item)}
                onClick={() => onSelectionChange(item)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
