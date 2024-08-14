"use client"

import { MapComponent } from "@/app/student/map/_components/MapComponent"
import Sidebar from "@/app/student/map/_components/Sidebar"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useState } from "react"
import { BoothID, BoothMap } from "../lib/booths"
import { LocationId, locations } from "../lib/locations"

export default function MainView({
  boothsByLocation,
  boothsById,
  exhibitorsById,
  editorMode = false
}: {
  boothsByLocation: Map<LocationId, BoothMap>
  boothsById: BoothMap
  exhibitorsById: Map<number, Exhibitor>
  editorMode?: boolean
}) {
  const [locationId, setLocationId] = useState<LocationId>("nymble/1")
  const location = locations.find(loc => loc.id === locationId)!
  const currentLocationBoothsById = boothsByLocation.get(locationId)!

  const [activeBoothId, setActiveBoothId] = useState<BoothID | null>(null)
  const [hoveredBoothId, setHoveredBoothId] = useState<BoothID | null>(null)

  const onBoothClick = (boothId: BoothID) => {
    setActiveBoothId(boothId)
  }

  return (
    <div className="relative flex h-full w-full">
      <Sidebar
        boothsById={boothsById}
        activeBoothId={activeBoothId}
        onBoothClick={onBoothClick}
      />

      <div className="flex-grow">
        <MapComponent
          boothsById={currentLocationBoothsById}
          location={location}
          activeBoothId={activeBoothId}
          hoveredBoothId={hoveredBoothId}
          setActiveBoothId={setActiveBoothId}
          setHoveredBoothId={setHoveredBoothId}
        />
      </div>

      <SelectLocation />
    </div>
  )

  function SelectLocation() {
    return (
      <div className="absolute top-2 justify-self-center rounded-full sm:right-2">
        <Select
          value={locationId}
          onValueChange={(id: LocationId) => {
            setLocationId(id)
            setActiveBoothId(null)
          }}>
          <SelectTrigger className="w-[180px] rounded-full py-5 dark:ring-offset-0 dark:focus:ring-0">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map(loc => (
              <SelectItem key={loc.id} value={loc.id}>
                {loc.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }
}
