"use client"

import { FilterMap } from "@/app/student/lib/filters"
import { FILTERS_LOCAL_STORAGE_KEY } from "@/app/student/map/lib/survey"
import { useEffect, useState } from "react"

export function useFilterData() {
  const [filterData, setfilterData] = useState<FilterMap | null>(null)

  useEffect(() => {
    const rawStoredData = localStorage.getItem(FILTERS_LOCAL_STORAGE_KEY)

    const storedData = rawStoredData
      ? (JSON.parse(rawStoredData) as FilterMap)
      : null
    setfilterData(storedData)
  }, [])
  return filterData
}
