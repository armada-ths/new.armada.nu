"use client"

import ExhibitorDetails from "@/app/student/_components/ExhibitorDetails"
import { BoothListItem } from "@/app/student/map/_components/BoothListItem"
import MapListFilteringHeader from "@/app/student/map/_components/MapListFilteringHeader"
import { Booth, BoothID, BoothMap } from "@/app/student/map/lib/booths"
import { LocationId } from "@/app/student/map/lib/locations"
import { useScreenSize } from "@/components/shared/hooks/useScreenSize"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ArrowLeft, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useState } from "react"

// import { ArrowLeft, ChevronsLeft, ChevronsRight } from "lucide-react"
// import { useState } from "react"

// export default function Sidebar({
//   boothsById,
//   activeBoothId,
//   hoveredBoothId,
//   setActiveBoothId,
//   setHoveredBoothId,
//   currentLocation
// }: {
//   boothsById: BoothMap
//   activeBoothId: BoothID | null
//   hoveredBoothId: BoothID | null
//   setActiveBoothId: (id: BoothID | null) => void
//   setHoveredBoothId: (id: BoothID | null) => void
//   currentLocation: LocationId
// }) {
//   // Show booths in the current location first, then sort by location, then exhibitor name
//   function sortBooths(booths: Booth[]) {
//     return booths.sort((a, b) => {
//       const c1 =
//         (b.location === currentLocation ? 1 : 0) -
//         (a.location === currentLocation ? 1 : 0)
//       if (c1 !== 0) return c1
//       const c2 = a.location.localeCompare(b.location)
//       if (c2 !== 0) return c2
//       const c3 = a.exhibitor.name.localeCompare(b.exhibitor.name)
//       return c3
//     })
//   }

// 	const booths = Array.from(boothsById.values())
// 	const [filteredBooths, setFilteredBooths] = useState(booths)
//   const displayedBooths = sortBooths(filteredBooths)

//   const { width } = useScreenSize()
//   const smallScreen = width ? width <= 800 : false

//   if (activeBoothId != null) {
//     const exhibitor = boothsById.get(activeBoothId)?.exhibitor
//     if (!exhibitor) {
//       console.error(`No exhibitor found for booth with id ${activeBoothId}`)
//       return null
//     }
//     return (
//       // <SidebarContainer smallScreen={smallScreen}>
//       //   {!smallScreen && (
//       //     <div className="flex">
//       //       <button
//       //         title="Back to list view"
//       //         className="p-1 text-stone-400 transition hover:text-stone-200"
//       //         onClick={() => setActiveBoothId(null)}>
//       //         <List size={25} />
//       //       </button>
//       //     </div>
//       //   )}
//       //   <div className="p-3 pt-0 sm:pt-3">
//       //     <ExhibitorDetails exhibitor={exhibitor} />
//       //   </div>
//       // </SidebarContainer>
//       <SidebarContainer smallScreen={smallScreen}>
// 				<div className="p-2">
// 					<Button variant="ghost" onClick={() => setActiveBoothId(null)}>
// 						<ArrowLeft size={30} />
// 					</Button>
// 					<ExhibitorDetails exhibitor={exhibitor} />
// 				</div>
// 			</SidebarContainer>

//     )
//   }

//   return (
//     // <SidebarContainer smallScreen={smallScreen}>
//     //   <div className="mb-6 border-b border-stone-600 p-3">
//     //     <ExhibitorFilters
//     //       exhibitors={exhibitors}
//     //       onChange={setFilteredExhibitors}
//     //     />
//     //   </div>
//     //   <ul className="divide-y divide-neutral-400">
//     //     {displayedBooths.map(({ id, exhibitor, location }) => (
//     //       <li
//     //         key={id}
//     //         onClick={() => setActiveBoothId(id)}
//     //         onMouseEnter={() => setHoveredBoothId(id)}
//     //         onMouseLeave={() => setHoveredBoothId(null)}
//     //         className="flex cursor-default p-2 hover:bg-slate-800">
//     //         <div>{exhibitor.name}</div>
//     //         <div className="ml-auto text-sm text-stone-400">
//     //           {locations.find(loc => loc.id === location)?.label}
//     //         </div>
//     //       </li>
//     //     ))}

//     //   </ul>
//     // </SidebarContainer>

//     <SidebarContainer smallScreen={smallScreen}>
// 			<div className="h-[72px] p-2 text-2xl">Search for the booths</div>
// 			<div className="p-2">
// 				<MapListFilteringHeader booths={Array.from(boothsById.values())} onChange={setFilteredBooths} />
// 			</div>
// 			{filteredBooths.map(booth => (
// 				<BoothListItem
// 					key={booth.id}
// 					booth={booth}
// 					onBoothClick={setActiveBoothId}
// 				/>
// 			))}
// 		</SidebarContainer>

//   )

// =======

export default function Sidebar({
  boothsById,
  activeBoothId,
  hoveredBoothId,
  setActiveBoothId,
  setHoveredBoothId,
  currentLocation
}: {
  boothsById: BoothMap
  activeBoothId: BoothID | null
  hoveredBoothId: BoothID | null
  setActiveBoothId: (id: BoothID | null) => void
  setHoveredBoothId: (id: BoothID | null) => void
  currentLocation: LocationId
}) {
  function sortBooths(booths: Booth[]) {
    return booths.sort((a, b) => {
      const c1 =
        (b.location === currentLocation ? 1 : 0) -
        (a.location === currentLocation ? 1 : 0)
      if (c1 !== 0) return c1
      const c2 = a.location.localeCompare(b.location)
      if (c2 !== 0) return c2
      const c3 = a.exhibitor.name.localeCompare(b.exhibitor.name)
      return c3
    })
  }

  const { width } = useScreenSize()
  const smallScreen = width ? width <= 800 : false

  const booths = Array.from(boothsById.values())
  const [filteredBooths, setFilteredBooths] = useState(booths)
  const displayedBooths = sortBooths(filteredBooths)

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
      <div className="h-[72px] p-2 text-2xl">Search for the booths</div>
      <div className="p-2">
        <MapListFilteringHeader booths={booths} onChange={setFilteredBooths} />
      </div>
      {displayedBooths.map(booth => (
        <div
          onMouseEnter={() => setHoveredBoothId(booth.id)}
          onMouseLeave={() => setHoveredBoothId(null)}>
          <BoothListItem
            key={booth.id}
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
