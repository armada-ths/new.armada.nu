"use client"

import { MapComponent } from "@/app/student/map/_components/MapComponent"
import Sidebar from "@/app/student/map/_components/Sidebar"
import EditorMapComponent from "@/app/student/map/editor/EditorMapComponent"
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
import { Button } from "@/components/ui/button"

export default function MainView({
  boothsByLocation,
  boothsById,
  exhibitorsById
}: {
  boothsByLocation: Map<LocationId, BoothMap>
  boothsById: BoothMap
  exhibitorsById: Map<number, Exhibitor>
}) {
  const [locationId, setLocationId] = useState<LocationId>("nymble/1")
  const location = locations.find(loc => loc.id === locationId)!
  const currentLocationBoothsById = boothsByLocation.get(locationId)!

  const [activeBoothId, setActiveBoothId] = useState<BoothID | null>(null)
  const [hoveredBoothId, setHoveredBoothId] = useState<BoothID | null>(null)

  const [editorMode, setEditorMode] = useState(false)

  return (
    <div className="relative flex h-full w-full">
      {!editorMode ? (
        <>
          <Sidebar
            boothsById={boothsById}
            activeBoothId={activeBoothId}
            hoveredBoothId={hoveredBoothId}
            setActiveBoothId={setActiveBoothId}
            setHoveredBoothId={setHoveredBoothId}
            currentLocation={locationId}
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
        </>
      ) : (
        <EditorMapComponent
          location={location}
          exhibitorsById={exhibitorsById}
        />
      )}

      {process.env.NODE_ENV === "development" && <EditorToggle />}

      <SelectLocation />
    </div>
  )

  function EditorToggle() {
    return (
      <Button
        className="absolute bottom-2 left-2"
        onClick={() => setEditorMode(prev => !prev)}>
        {editorMode ? "Switch to normal mode" : "Switch to edit mode"}
      </Button>
    )
  }

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
