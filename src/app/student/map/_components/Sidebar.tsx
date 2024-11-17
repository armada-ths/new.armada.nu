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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  ChevronsLeft,
  ChevronsRight,
  EraserIcon,
  FilterIcon,
  ListIcon,
  MapIcon,
  X,
  XIcon
} from "lucide-react"
import { useRef, useState } from "react"
import { createPortal } from "react-dom"

export default function Sidebar({
  boothsById,
  setActiveBoothId,
  activeDrawerBoothId,
  setActiveDrawerBoothId,
  setHoveredBoothId,
  currentLocation,
  filteredBooths,
  setFilteredBooths
}: {
  boothsById: BoothMap
  setActiveDrawerBoothId: (id: BoothID | null) => void
  activeDrawerBoothId: BoothID | null
  hoveredBoothId: BoothID | null
  setActiveBoothId: (id: BoothID | null) => void
  setHoveredBoothId: (id: BoothID | null) => void
  currentLocation: LocationId
  filteredBooths: Booth[]
  setFilteredBooths: (booths: Booth[]) => void
}) {
  const { width } = useScreenSize()
  const smallScreen = width ? width <= 800 : false
  const [open, setOpen] = useState<boolean>(true)
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

  if (activeDrawerBoothId != null) {
    const exhibitor = boothsById.get(activeDrawerBoothId)?.exhibitor
    if (!exhibitor) {
      console.error(
        `No exhibitor found for booth with id ${activeDrawerBoothId}`
      )
      return null
    }
    return (
      <SidebarContainer open={open} setOpen={setOpen} smallScreen={smallScreen}>
        <div className="h-[calc(80dvh-28px)] p-2">
          <Button variant="ghost" onClick={() => setActiveDrawerBoothId(null)}>
            <ArrowLeft size={30} />
          </Button>
          <ExhibitorDetails exhibitor={exhibitor} />
        </div>
      </SidebarContainer>
    )
  }

  /*   if (showFilters) {
    return (
      <SidebarContainer
        open={open}
        setOpen={setOpen}
        smallScreen={smallScreen}></SidebarContainer>
    )
  } */

  const appliedFilterCount =
    filters.employments.selected.length + filters.industries.selected.length
  const hasAppliedFilters = appliedFilterCount > 0

  return (
    <SidebarContainer
      open={open}
      setOpen={setOpen}
      smallScreen={smallScreen}
      header={
        <>
          {/* Action buttons */}
          <div className="flex gap-2">
            <Input
              onClick={() => setOpen(true)}
              searchIcon={true}
              ref={searchInputRef}
              type="search"
              placeholder="Search exhibitors"
              className="w-full"
              value={searchText}
              onChange={e => onSearchChange(e.target.value)}
              onKeyDown={e =>
                e.key === "Enter" && searchInputRef.current?.blur()
              }
            />
            <DialogClose asChild>
              <Button variant={"outline"} className="flex gap-2">
                <MapIcon size={15} /> Map
              </Button>
            </DialogClose>
          </div>
          <div className="flex gap-1">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full text-neutral-300", {
                    "font-bold": hasAppliedFilters
                  })}
                  onClick={() => {
                    /*                     setShowFilters(true)
                    setOpen(true) */
                  }}>
                  <FilterIcon size={16} className="mr-2" />
                  Show filters{" "}
                  {hasAppliedFilters ? `(${appliedFilterCount})` : ""}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80dvh] max-w-[90dvw] rounded-lg border-none [&>button]:hidden">
                <div className="flex justify-start">
                  {/*                   <Button
                    variant="ghost"
                    onClick={() => setShowFilters(false)}
                    className="text-neutral-400">
                    <ListIcon size={16} className="mr-1" />
                    Back to list view
                  </Button> */}
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="mr-auto text-neutral-400">
                    <X size={16} className="mr-1" />
                    Clear filters
                  </Button>
                  <DialogClose>
                    <XIcon />
                  </DialogClose>
                </div>
                <MapFilters
                  booths={booths}
                  filters={filters}
                  setFilters={setFilters}
                  setFilteredBooths={setFilteredBooths}
                  onSelect={onFilterSubmit}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Num displayed + clear filters button */}
          <div className="flex w-full pb-2">
            <div className="m-2 text-sm text-neutral-400">
              Showing {displayedBooths.length} / {booths.length}
            </div>
            <Button
              variant="outline"
              size={"sm"}
              className="ml-auto dark:text-neutral-400"
              onClick={clearFilters}>
              <EraserIcon size={16} className="mb-0.5 mr-1" />
              Clear filters
            </Button>
          </div>
        </>
      }>
      <div className="flex flex-col gap-0 px-1">
        {/* Booth list */}
        {displayedBooths.map(booth => (
          <BoothListItem
            key={booth.id}
            onMouseEnter={() => setHoveredBoothId(booth.id)}
            onMouseLeave={() => setHoveredBoothId(null)}
            booth={booth}
            onBoothClick={setActiveDrawerBoothId}
            currentLocationId={currentLocation}
            onBoothNavigate={setActiveBoothId}
            closeDrawer={() => setOpen(false)}
          />
        ))}
      </div>
    </SidebarContainer>
  )
}

function SidebarContainer({
  smallScreen,
  children,
  open,
  setOpen,
  header
}: {
  smallScreen: boolean
  children: React.ReactNode
  open: boolean
  setOpen: (open: boolean) => void
  header?: React.ReactNode
}) {
  if (smallScreen) {
    return (
      <Drawer
        //dismissible={false}
        //noBodyStyles={true}
        modal={true}
        open={open}
        onOpenChange={open => setOpen(open)}
        //setBackgroundColorOnScale={false}
        //shouldScaleBackground={false}
        /*         disablePreventScroll
        preventScrollRestoration
        fixed */
        //preventScrollRestoration={true}
        //setActiveSnapPoint={sp => setOpen(sp === snapPoints[1])}
        direction={"bottom"}
        onClose={() => setOpen(false)}>
        {createPortal(
          <DrawerTrigger className="absolute bottom-2 right-2 z-10">
            <Button className="flex gap-2" variant={"outline"}>
              <ListIcon size={15} /> All exhibitors
            </Button>
          </DrawerTrigger>,
          document.getElementById("root")!
        )}
        <DrawerContent
          className={
            "h-full max-h-[100dvh] w-full overflow-y-hidden overscroll-none focus-visible:outline-none dark:bg-neutral-900"
          }>
          <DrawerHeader className="overscroll-y-none pb-0 pt-1">
            {header}
          </DrawerHeader>
          {/* <ScrollArea className="h-full overflow-auto">{children}</ScrollArea> */}
          <div className="h-[calc(100dvh-168px)] overflow-scroll overscroll-none">
            {children}
          </div>
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
