"use client"

import ExhibitorDetails from "@/app/student/_components/ExhibitorDetails"
import { FilterMap, makeFilter } from "@/app/student/lib/filters"
import { BoothListItem } from "@/app/student/map/_components/BoothListItem"
import MapFilters from "@/app/student/map/_components/MapFilters"
import { Booth, BoothID, BoothMap } from "@/app/student/map/lib/booths"
import { LocationId } from "@/app/student/map/lib/locations"
import { sortBooths } from "@/app/student/map/lib/utils"
import { useScreenSize } from "@/components/shared/hooks/useScreenSize"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ArrowLeft, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useState } from "react"

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

  const booths = Array.from(boothsById.values())
  const exhibitors = booths.map(b => b.exhibitor)

  const [filters, setFilters] = useState<FilterMap>({
    employments: makeFilter("employments", "Employments", exhibitors),
    industries: makeFilter("industries", "Industries", exhibitors)
  })

  const displayedBooths = sortBooths(filteredBooths, currentLocation)

  if (activeBoothId != null) {
    const exhibitor = boothsById.get(activeBoothId)?.exhibitor
    if (!exhibitor) {
      console.error(`No exhibitor found for booth with id ${activeBoothId}`)
      return null
    }
    return (
      <SidebarContainer smallScreen={smallScreen}>
        <div className="p-2">
          <Button variant="ghost" onClick={() => setActiveBoothId(null)}>
            <ArrowLeft size={30} />
          </Button>
          <ExhibitorDetails exhibitor={exhibitor} />
        </div>
      </SidebarContainer>
    )
  }
  return (
    <SidebarContainer smallScreen={smallScreen}>
      <div className="mb-2 p-2">
        <MapFilters
          booths={booths}
          filters={filters}
          setFilters={setFilters}
          setFilteredBooths={setFilteredBooths}
        />
      </div>
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
  children
}: {
  smallScreen: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState<boolean>(true)

  if (smallScreen) {
    return (
      <Drawer
        dismissible={false}
        noBodyStyles={true}
        modal={false}
        setBackgroundColorOnScale={false}
        shouldScaleBackground={false}
        open={open}
        snapPoints={["120px", 0.8]}
        onOpenChange={setOpen}
        direction={"bottom"}>
        <DrawerContent
          withHandle={true}
          className={
            "z-10 h-full w-full focus-visible:outline-none dark:bg-neutral-900/90"
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
