import {
  BoothID,
  geoJsonBoothDataByLocation
} from "@/app/student/map/lib/booths"
import { Location, LocationId } from "@/app/student/map/lib/locations"
import { useFeatureState } from "@/components/shared/hooks/useFeatureState"
import { useGeoJsonPlanData } from "@/components/shared/hooks/useGeoJsonPlanData"
import "maplibre-gl/dist/maplibre-gl.css"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  Layer,
  MapLayerMouseEvent,
  MapRef,
  Map as MapboxMap,
  Source
} from "react-map-gl/maplibre"
import { BoothMap, GeoJsonBooth } from "../lib/booths"
import {
  addMapIconAssets,
  backgroundLayerStyle,
  boothLayerStyle,
  boothOutlineStyle,
  buildingLayerStyle,
  lineLayerStyle,
  roomLayerStyle,
  routeLayerStyle,
  symbolLayerStyle
} from "../lib/config"
import { BoothMarker } from "./BoothMarker"

export function MapComponent({
  boothsById,
  location,
  activeBoothId,
  setActiveBoothId,
  hoveredBoothId,
  setHoveredBoothId,
  initialView,
  filteredBoothIds
}: {
  boothsById: BoothMap
  location: Location
  activeBoothId: BoothID | null
  hoveredBoothId: BoothID | null
  setActiveBoothId: (id: BoothID | null) => void
  setHoveredBoothId: (id: BoothID | null) => void
  initialView: { longitude: number; latitude: number; zoom: number }
  filteredBoothIds: BoothID[]
}) {
  const mapRef = useRef<MapRef>(null)

  const [mapZoom, setMapZoom] = useState(initialView.zoom)

  const [markerScale, setMarkerScale] = useState(1)

  const [preLocationId, setPreLocationId] = useState<LocationId>(location.id)
  // Fly to location center on change
  useEffect(() => {
    const { longitude, latitude, zoom } = location.center
    const timeout = setTimeout(() => {
      mapRef.current?.flyTo({
        center: [longitude, latitude],
        zoom
      })
    }, 300)
    return () => clearTimeout(timeout)
    setMarkerScale(0.6)
  }, [location])

  useEffect(() => {
    // Load icon assets for points location
    if (mapRef && !mapRef.current?.hasImage("exit-icon")) {
      addMapIconAssets(mapRef)
    }
  }, [mapRef.current])

  //Change layer style data source based on selected location
  const [geoJsonPlanData, geoJsonPlanRoutesData, geoJsonPlanRoomsData] =
    useGeoJsonPlanData(location)

  // Fly to selected booth on change
  useEffect(() => {
    if (activeBoothId == null) return
    const booth = boothsById.get(activeBoothId)
    if (!booth) return
    mapRef.current?.flyTo({
      center: booth.center as [number, number],
      zoom: 20,
      speed: 0.8
    })
  }, [activeBoothId, boothsById])

  useFeatureState(mapRef, activeBoothId ? [activeBoothId] : [], "active")
  useFeatureState(mapRef, hoveredBoothId ? [hoveredBoothId] : [], "hover")
  useFeatureState(mapRef, filteredBoothIds, "filtered")

  const currentGeoJsonBoothData = useMemo(() => {
    const currentData = geoJsonBoothDataByLocation.get(
      location.id === "library" ? preLocationId : location.id
    ) ?? {
      type: "FeatureCollection",
      features: []
    }
    const libraryFeatures = geoJsonBoothDataByLocation.get("library")!.features
    // Merge library features with the current location's features
    const mergedFeatures = [
      ...libraryFeatures,
      ...currentData.features.filter(
        feature =>
          !libraryFeatures.some(
            libraryFeature =>
              libraryFeature.properties.id === feature.properties.id
          )
      )
    ]
    setPreLocationId(location.id)
    return { ...currentData, features: mergedFeatures }
  }, [location.id])

  // Don't want to rerender markers on every map render
  const markers = useMemo(
    () =>
      Array.from(boothsById.values()).map(booth => (
        <BoothMarker key={booth.id} booth={booth} scale={markerScale} />
      )),
    [boothsById, markerScale]
  )

  function onMapClick(e: MapLayerMouseEvent) {
    const feature = e.features?.[0] as GeoJsonBooth | undefined // no other features for now
    if (feature) {
      setActiveBoothId(feature.properties.id)
    } else {
      setActiveBoothId(null) // outside click
    }
  }

  // Avoid delays in booth switching
  function onBoothMouseMove(e: MapLayerMouseEvent) {
    const feature = e.features?.[0] as GeoJsonBooth | undefined
    if (feature) {
      const boothId = feature.properties.id
      if (boothId !== hoveredBoothId) {
        setHoveredBoothId(boothId)
      }
    }
  }

  function onBoothMouseLeave(e: MapLayerMouseEvent) {
    const feature = e.features?.[0] as GeoJsonBooth | undefined
    if (feature) {
      setHoveredBoothId(null)
    }
  }

  function onZoomChange() {
    const zoom = mapRef.current?.getZoom()
    if (zoom === undefined) return
    const scale = Math.max(0.2, Math.min(1, 1 + (zoom - 20) * 0.5))
    setMarkerScale(scale)
    setMapZoom(zoom)
  }

  return (
    <div className="h-full w-full">
      <MapboxMap
        ref={mapRef}
        onClick={onMapClick}
        onMouseMove={onBoothMouseMove}
        onMouseLeave={onBoothMouseLeave}
        onZoom={onZoomChange}
        interactiveLayerIds={["booths"]}
        initialViewState={initialView}
        cursor={"auto"}
        minZoom={17}
        maxZoom={22}
        maxBounds={[
          [18.063, 59.345],
          [18.079, 59.35]
        ]}
        pitch={40}
        touchZoomRotate={false}
        dragRotate={false}
        mapStyle="https://api.maptiler.com/maps/376fa556-c405-4a91-8e9e-15be82eb3a58/style.json?key=mgMcr2yF2fWUHzf27ygv">
        <Layer {...backgroundLayerStyle}></Layer>

        {/** Order sensitive! */}
        <Source
          id="buildings"
          type="geojson"
          promoteId={"id"}
          data={geoJsonPlanData}>
          <Layer {...buildingLayerStyle}></Layer>
        </Source>

        <Source
          id="rooms"
          type="geojson"
          promoteId={"id"}
          data={geoJsonPlanRoomsData}>
          <Layer {...roomLayerStyle}></Layer>
        </Source>

        <Source
          id="booths"
          type="geojson"
          promoteId={"id"}
          data={currentGeoJsonBoothData}>
          <Layer {...boothLayerStyle}></Layer>
        </Source>

        <Source
          id="booths-outline"
          type="geojson"
          promoteId={"id"}
          data={currentGeoJsonBoothData}>
          <Layer {...boothOutlineStyle}></Layer>
        </Source>

        <Source
          id="nymble-plan-style"
          type="geojson"
          promoteId={"id"}
          data={geoJsonPlanData}>
          <Layer {...lineLayerStyle}></Layer>
        </Source>

        {mapZoom > 19 && (
          <Source
            id="nymble-plan-routes"
            type="geojson"
            promoteId={"id"}
            data={geoJsonPlanRoutesData}>
            <Layer {...routeLayerStyle}></Layer>
          </Source>
        )}

        {mapZoom > 19 && (
          <Source
            id="nymble-plan-points"
            type="geojson"
            promoteId={"id"}
            data={geoJsonPlanData}>
            <Layer {...symbolLayerStyle}></Layer>
          </Source>
        )}

        {markers}
      </MapboxMap>
    </div>
  )
}
