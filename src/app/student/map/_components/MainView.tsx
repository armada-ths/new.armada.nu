"use client"

import LocationSelect from "@/app/student/map/_components/LocationSelect"
import { MapComponent } from "@/app/student/map/_components/MapComponent"
import Sidebar from "@/app/student/map/_components/Sidebar"
import EditorMapComponent from "@/app/student/map/editor/EditorMapComponent"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { ViewState } from "react-map-gl/dist/esm/types"
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
  // url: /student/map?floor=[nymble/2|nymble/3|library]&lat=[number]&lng=[number]&zoom=[number]
  // if floor is not provided or is invalid, default to nymble/2
  // if lat, lng or zoom is not provided, default to location center

  const searchParams = useSearchParams()

  const floorUrlString = searchParams.get("floor") ?? "nymble/2"
  const [locationId, setLocationId] = useState<LocationId>(
    validLocationId(floorUrlString) ? floorUrlString : defaultLocation.id
  )
  const [preLocationId, setPreLocationId] = useState<LocationId>(locationId)
  const location = locations.find(loc => loc.id === locationId)!
  const currentLocationBoothsById = useMemo(() => {
    const boothsById =
      locationId !== "library"
        ? new Map([
            ...Array.from(boothsByLocation.get("library")!.entries()),
            ...Array.from(boothsByLocation.get(locationId)!.entries()) // Merge library booths with default location booths
          ])
        : new Map([
            ...Array.from(boothsByLocation.get(preLocationId)!.entries()),
            ...Array.from(boothsByLocation.get(locationId)!.entries()) // Merge library booths with default location booths
          ])
    setPreLocationId(location.id)
    return boothsById
  }, [location.id])

  const latitude =
    parseFloat(searchParams.get("lat") ?? "") || location.center.latitude
  const longitude =
    parseFloat(searchParams.get("lng") ?? "") || location.center.longitude
  const zoom =
    parseFloat(searchParams.get("zoom") ?? "") || location.center.zoom

  const initialView = {
    latitude,
    longitude,
    zoom,
    pitch: 40
  } satisfies Partial<ViewState>

  const [activeBoothId, setActiveBoothId] = useState<BoothID | null>(null)
  const [activeDrawerBoothId, setActiveDrawerBoothId] =
    useState<BoothID | null>(null)
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
            setActiveBoothId={setActiveBoothId}
            activeDrawerBoothId={activeDrawerBoothId}
            setActiveDrawerBoothId={setActiveDrawerBoothId}
            hoveredBoothId={hoveredBoothId}
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
              setActiveBoothId={setActiveBoothId}
              hoveredBoothId={hoveredBoothId}
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

      {process.env.NODE_ENV === "development" && ( // toggle for editor mode, only visible in dev
        <Button
          className="absolute bottom-2 left-2"
          onClick={() => setEditorMode(prev => !prev)}>
          {editorMode ? "Switch to normal mode" : "Switch to edit mode"}
        </Button>
      )}

      <LocationSelect
        locationId={locationId}
        setLocationId={setLocationId}
        setActiveBoothId={setActiveBoothId}
      />
    </div>
  )
}
