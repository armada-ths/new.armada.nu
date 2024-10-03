"use client"

import { MapComponent } from "@/app/student/map/_components/MapComponent"
import Sidebar from "@/app/student/map/_components/Sidebar"
import EditorMapComponent from "@/app/student/map/editor/EditorMapComponent"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Booth, BoothID, BoothMap } from "../lib/booths"
import {
  defaultLocation,
  LocationId,
  locations,
  validLocationId
} from "../lib/locations"

export default function MainView({
  boothsByLocation,
  boothsById,
  exhibitorsById
}: {
  boothsByLocation: Map<LocationId, BoothMap>
  boothsById: BoothMap
  exhibitorsById: Map<number, Exhibitor>
}) {
  // url: /student/map?floor=[nymble/1|nymble/2|nymble/3|library]&lat=[number]&lng=[number]&zoom=[number]
  // if floor is not provided or is invalid, default to nymble/1
  // if lat, lng or zoom is not provided, default to location center
  const searchParams = useSearchParams()

  const floorUrlString = searchParams.get("floor") ?? "nymble/1"
  const [locationId, setLocationId] = useState<LocationId>(
    validLocationId(floorUrlString) ? floorUrlString : defaultLocation.id
  )
  const location = locations.find(loc => loc.id === locationId)!
  const currentLocationBoothsById = boothsByLocation.get(locationId)!

  const latitude =
    parseFloat(searchParams.get("lat") ?? "") || location.center.latitude
  const longitude =
    parseFloat(searchParams.get("lng") ?? "") || location.center.longitude
  const zoom =
    parseFloat(searchParams.get("zoom") ?? "") || location.center.zoom

  const initialView = { latitude, longitude, zoom }

  const [activeBoothId, setActiveBoothId] = useState<BoothID | null>(null)
  const [hoveredBoothId, setHoveredBoothId] = useState<BoothID | null>(null)
  const [filteredBooths, setFilteredBooths] = useState<Booth[]>(
    Array.from(boothsById.values())
  )

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
            filteredBooths={filteredBooths}
            setFilteredBooths={setFilteredBooths}
          />
          <div className="flex-grow">
            <MapComponent
              initialView={initialView}
              boothsById={currentLocationBoothsById}
              location={location}
              activeBoothId={activeBoothId}
              hoveredBoothId={hoveredBoothId}
              setActiveBoothId={setActiveBoothId}
              setHoveredBoothId={setHoveredBoothId}
              filteredBoothIds={filteredBooths.map(booth => booth.id)}
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
