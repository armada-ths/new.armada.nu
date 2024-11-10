"use client"

import { Filter, FilterItem } from "@/app/student/lib/filters"
import { FilterSelectionItem } from "@/app/student/map/_components/FilterSelectionItem"
import { useState } from "react"

export default function IndustryTypeSelection({
  filter,
  onChange
}: {
  filter: Filter
  onChange: (selected: FilterItem[]) => void
}) {
  const { items, selected, label } = filter

  const maxDisplayed = 7
  const [numDisplayed, setNumDisplayed] = useState(maxDisplayed)

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
        <h2 className="m-2 text-left text-xl text-stone-200">{label}</h2>
        <div className="m-1 mt-3 flex flex-wrap gap-4">
          {items.slice(0, numDisplayed).map(item => (
            <div className="" key={item.id}>
              <FilterSelectionItem
                name={item.name}
                isSelected={filter.selected.includes(item)}
                onClick={() => onSelectionChange(item)}
              />
            </div>
          ))}
          {maxDisplayed < items.length && (
            <button
              onClick={() =>
                setNumDisplayed(
                  numDisplayed < items.length ? items.length : maxDisplayed
                )
              }
              className="flex w-auto rounded-3xl border border-neutral-400 px-3 py-2 text-center text-xs text-neutral-400 xs:px-4 xs:py-2 xs:text-base">
              {numDisplayed < items.length ? (
                <span>Show all {items.length}</span>
              ) : (
                <span>Show less</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
