"use client"
import { LocationId } from "@/app/student/map/lib/locations"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { MapIcon } from "lucide-react"
import Image from "next/image"
import { Booth, BoothID } from "../lib/booths"

export function BoothListItem({
  booth,
  onBoothClick,
  onBoothNavigate,
  onMouseEnter,
  onMouseLeave,
  closeDrawer
}: {
  booth: Booth
  onBoothClick: (boothId: BoothID) => void
  onBoothNavigate: (boothId: BoothID | null) => void
  currentLocationId: LocationId
  onMouseEnter: () => void
  onMouseLeave: () => void
  closeDrawer: () => void
}) {
  const logoSrc = booth.exhibitor.logo_squared ?? booth.exhibitor.logo_freesize

  function onBoothMapNavigate() {
    /* Sorry to the person that has to read this code
      At this point we're on hour 20 of trying to hotfix
      the map, we're tired, we want to go home, and there
      is no coffe left, I'm starting to question my choices.
      But we're here to make the fair great, and great it will be!
    */
    onBoothNavigate(null)
    setTimeout(() => onBoothNavigate(booth.id))
  }

  return (
    <Card
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "cursor-pointer rounded-none first-of-type:rounded-tl-md first-of-type:rounded-tr-md last-of-type:rounded-bl-md last-of-type:rounded-br-md",
        {}
      )}
      onClick={() => onBoothClick(booth.id)}>
      <div className="h-12 transition hover:bg-lime-950">
        <div className="ml-4 flex h-full items-center">
          {logoSrc ? (
            <Image
              className="mr-2 size-16 object-contain py-4"
              src={logoSrc}
              alt={booth.exhibitor.name}
              width={300}
              height={300}></Image>
          ) : (
            <div className="mr-2 size-16"></div>
          )}
          <div>{booth.exhibitor.name}</div>
          {/*           <div
            className={cn(
              "ml-auto mr-2 text-xs text-stone-400",
              booth.location === currentLocationId && "font-extrabold"
            )}>
            {locations.find(loc => loc.id === booth.location)?.label}
          </div> */}
          <div
            className="ml-auto "
            onClick={event => {
              event.stopPropagation()
              event.preventDefault()
              closeDrawer()
            }}>
            <div
              className="flex size-16 items-center justify-center px-1"
              onClick={onBoothMapNavigate}>
              <MapIcon size={18} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
