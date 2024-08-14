"use client"
import ExhibitorDetails from "@/app/student/_components/ExhibitorDetails"
import { BoothListItem } from "@/app/student/map/_components/BoothListItem"
import MapListFilteringHeader from "@/app/student/map/_components/MapListFilteringHeader"
import { BoothID, BoothMap } from "@/app/student/map/lib/booths"
import { useScreenSize } from "@/components/shared/hooks/useScreenSize"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ArrowLeft, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function Sidebar({
  boothsById,
  activeBoothId,
  onBoothClick
}: {
  boothsById: BoothMap
  activeBoothId: BoothID | null
  onBoothClick: (boothId: BoothID) => void
}) {
  const { width } = useScreenSize()
  const smallScreen = width ? width <= 800 : false
  const booths = Array.from(boothsById.values())
  const [filteredBooths, setFilteredBooths] = useState(booths)
  const [boothId, setBoothId] = useState(activeBoothId)

  useEffect(() => {
    setBoothId(activeBoothId)
  }, [activeBoothId])

  if (boothId != null) {
    const exhibitor = boothsById.get(boothId)?.exhibitor
    if (!exhibitor) {
      console.error(`No exhibitor found for booth with id ${boothId}`)
      return null
    }
    return (
      <SidebarContainer smallScreen={smallScreen}>
        <div className="p-2">
          <Button variant="ghost" onClick={() => setBoothId(null)}>
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
      {filteredBooths.map(booth => (
        <BoothListItem
          key={booth.id}
          booth={booth}
          onBoothClick={onBoothClick}
        />
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
  const drawerRef = useRef<HTMLDivElement>(null)
  if (isMobile) {
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
          ref={drawerRef}
          withHandle={true}
          className={"z-10 h-full w-full focus-visible:outline-none"}>
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
