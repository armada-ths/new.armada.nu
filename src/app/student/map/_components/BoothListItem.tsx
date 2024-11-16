"use client"
import { LocationId, locations } from "@/app/student/map/lib/locations"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Booth, BoothID } from "../lib/booths"

export function BoothListItem({
  booth,
  onBoothClick,
  currentLocationId
}: {
  booth: Booth
  onBoothClick: (boothId: BoothID) => void
  currentLocationId: LocationId
}) {
  const logoSrc = booth.exhibitor.logo_squared ?? booth.exhibitor.logo_freesize
  return (
    <Card className="cursor-pointer" onClick={() => onBoothClick(booth.id)}>
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
          <div
            className={cn(
              "ml-auto mr-2 text-xs text-stone-400",
              booth.location === currentLocationId && "font-extrabold"
            )}>
            {locations.find(loc => loc.id === booth.location)?.label}
          </div>
        </div>
      </div>
    </Card>
  )
}
