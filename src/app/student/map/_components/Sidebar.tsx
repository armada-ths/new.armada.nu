"use client"

import ExhibitorDetails from "@/app/student/_components/ExhibitorDetails"
import {
  applyFilters,
  filterBySearch,
  FilterMap,
  makeFilter
} from "@/app/student/lib/filters"
import { BoothListItem } from "@/app/student/map/_components/BoothListItem"
import MapFilters from "@/app/student/map/_components/MapFilters"
import { Booth, BoothID, BoothMap } from "@/app/student/map/lib/booths"
import { LocationId } from "@/app/student/map/lib/locations"
import { FILTERS_LOCAL_STORAGE_KEY } from "@/app/student/map/lib/survey"
import { sortBooths } from "@/app/student/map/lib/utils"
import { useScreenSize } from "@/components/shared/hooks/useScreenSize"
import { useFilterData } from "@/components/shared/hooks/useSurveyData"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  ChevronsLeft,
  ChevronsRight,
  FilterIcon,
  ListIcon,
  MapIcon,
  X
} from "lucide-react"
import { useRef, useState } from "react"

export default function Sidebar({
  boothsById,
  activeBoothId,
  setActiveBoothId,
  setHoveredBoothId,
  currentLocation,
  filteredBooths,
  setFilteredBooths
}: {
  boothsById: BoothMap
  activeBoothId: BoothID | null
  hoveredBoothId: BoothID | null
  setActiveBoothId: (id: BoothID | null) => void
  setHoveredBoothId: (id: BoothID | null) => void
  currentLocation: LocationId
  filteredBooths: Booth[]
  setFilteredBooths: (booths: Booth[]) => void
}) {
  const { width } = useScreenSize()
  const smallScreen = width ? width <= 800 : false
  const [open, setOpen] = useState<boolean>(false)
  const [showFilters, setShowFilters] = useState(false)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchText, setSearchText] = useState("")

  const booths = Array.from(boothsById.values())
  const exhibitors = booths.map(b => b.exhibitor)
  const displayedBooths = sortBooths(filteredBooths, currentLocation)

  const defaultFilters: FilterMap = {
    employments: makeFilter("employments", "Employments", exhibitors),
    industries: makeFilter("industries", "Industries", exhibitors)
  }

  const filterData = useFilterData() || defaultFilters
  const [filters, setFilters] = useState<FilterMap>(filterData)

  // useEffect(() => {
  //   if (activeBoothId != null) setOpen(true)
  // }, [activeBoothId])

  function clearFilters() {
    setFilters(defaultFilters)
    setFilteredBooths(applyFilters(booths, Object.values(defaultFilters)))
  }

  function onSearchChange(text: string) {
    setSearchText(text)
    if (text.trim() !== "") setFilteredBooths(filterBySearch(booths, text))
    else setFilteredBooths(applyFilters(booths, Object.values(filters))) // apply filters again when input is cleared
  }

  function onFilterSubmit() {
    setShowFilters(false)
    localStorage.setItem(FILTERS_LOCAL_STORAGE_KEY, JSON.stringify(filters))
  }

  if (activeBoothId != null) {
    const exhibitor = boothsById.get(activeBoothId)?.exhibitor
    if (!exhibitor) {
      console.error(`No exhibitor found for booth with id ${activeBoothId}`)
      return null
    }
    return (
      <SidebarContainer open={open} setOpen={setOpen} smallScreen={smallScreen}>
        <div className="p-2">
          <Button variant="ghost" onClick={() => setActiveBoothId(null)}>
            <ArrowLeft size={30} />
          </Button>
          <ExhibitorDetails exhibitor={exhibitor} />
        </div>
      </SidebarContainer>
    )
  }

  if (showFilters) {
    return (
      <SidebarContainer open={open} setOpen={setOpen} smallScreen={smallScreen}>
        <div className="p-2">
          <div className="flex">
            <Button
              variant="ghost"
              onClick={() => setShowFilters(false)}
              className="text-neutral-400">
              <ListIcon size={16} className="mr-1" />
              Back to list view
            </Button>
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="ml-auto text-neutral-400">
              <X size={16} className="mr-1" />
              Clear filters
            </Button>
          </div>
          <MapFilters
            booths={booths}
            filters={filters}
            setFilters={setFilters}
            setFilteredBooths={setFilteredBooths}
            onSelect={onFilterSubmit}
          />
        </div>
      </SidebarContainer>
    )
  }

  return (
    <SidebarContainer open={open} setOpen={setOpen} smallScreen={smallScreen}>
      {/* Action buttons */}
      <div className="mx-2 mt-1">
        <Input
          onClick={() => setOpen(true)}
          searchIcon={true}
          ref={searchInputRef}
          type="text"
          placeholder="Search exhibitors"
          className="w-full"
          value={searchText}
          onChange={e => onSearchChange(e.target.value)}
          onKeyDown={e => e.key === "Enter" && searchInputRef.current?.blur()}
        />
      </div>
      <div className="flex gap-1 p-2">
        {smallScreen && (
          <Button
            variant={"outline"}
            className="text-neutral-300"
            onClick={() => setOpen(!open)}>
            {open ? (
              <div className="flex">
                <MapIcon size={16} className="mr-2" />
                View map
              </div>
            ) : (
              <div className="flex">
                <ListIcon size={16} className="mr-2" />
                View list
              </div>
            )}
          </Button>
        )}
        <Button
          variant={"outline"}
          className="w-full text-neutral-300"
          onClick={() => {
            setShowFilters(true)
            setOpen(true)
          }}>
          <FilterIcon size={16} className="mr-2" />
          Show filters
        </Button>
      </div>

      {/* Num displayed + clear filters button */}
      <div className="flex w-full">
        <div className="m-2 text-sm text-neutral-400">
          Showing {displayedBooths.length} / {booths.length}
        </div>
        <Button
          variant="link"
          className="ml-auto dark:text-neutral-400"
          onClick={clearFilters}>
          <X size={16} className="mb-0.5 mr-1" />
          Clear filters
        </Button>
      </div>

      {/* Booth list */}
      {displayedBooths.map(booth => (
        <div
          key={booth.id}
          onMouseEnter={() => setHoveredBoothId(booth.id)}
          onMouseLeave={() => setHoveredBoothId(null)}>
          <BoothListItem
            booth={booth}
            onBoothClick={setActiveBoothId}
            currentLocationId={currentLocation}
          />
        </div>
      ))}
    </SidebarContainer>
  )
}

function SidebarContainer({
  smallScreen,
  children,
  open,
  setOpen
}: {
  smallScreen: boolean
  children: React.ReactNode
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const snapPoints = ["130px", 0.8]
  const snapPoint = open ? snapPoints[1] : snapPoints[0]

  if (smallScreen) {
    return (
      <Drawer
        dismissible={false}
        noBodyStyles={true}
        modal={false}
        setBackgroundColorOnScale={false}
        shouldScaleBackground={false}
        open={true}
        snapPoints={snapPoints}
        activeSnapPoint={snapPoint}
        preventScrollRestoration={true}
        setActiveSnapPoint={sp => setOpen(sp === snapPoints[1])}
        direction={"bottom"}>
        <DrawerContent
          withHandle={true}
          className={
            "z-10 h-full w-full focus-visible:outline-none dark:bg-neutral-900"
          }>
          <ScrollArea className="h-full">
            {children}
            <ScrollBar></ScrollBar>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <div className={cn("relative h-full", open ? "w-[500px]" : "w-0")}>
      <ScrollArea className="h-full">
        {children}
        <ScrollBar></ScrollBar>
      </ScrollArea>

      <div className="absolute right-[-38px] top-0 z-20">
        <Button
          variant="ghost"
          className="rounded-s-none border-none p-1"
          onClick={() => setOpen(!open)}
          title={open ? "Close sidebar" : "Open sidebar"}>
          {open ? <ChevronsLeft size={30} /> : <ChevronsRight size={30} />}
        </Button>
      </div>
    </div>
  )
}
