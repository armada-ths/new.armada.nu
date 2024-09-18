"use client"

import { BoothMarker } from "@/app/student/map/_components/BoothMarker"
import {
  Booth,
  BoothID,
  GeoJsonBooth,
  geoJsonBoothData,
  geoJsonBuildingData,
  GeoJsonBoothsData,
  makeBooth
} from "@/app/student/map/lib/booths"
import { Location } from "@/app/student/map/lib/locations"
import { getPolygonCenter } from "@/app/student/map/lib/utils"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import MapboxDraw, { DrawMode } from "@mapbox/mapbox-gl-draw"
import { Feature, Polygon } from "geojson"
import "maplibre-gl/dist/maplibre-gl.css"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  BackgroundLayer,
  Layer,
  Map as MapboxMap,
  MapRef,
  Popup
} from "react-map-gl/maplibre"

const backgroundLayerStyle: BackgroundLayer = {
  id: "background",
  type: "background",
  paint: {
    "background-color": "#40d07e",
    "background-opacity": 0.2
  }
}

type FeatureMap = Map<BoothID, GeoJsonBooth>

function toFeatureCollection(featMap: FeatureMap) {
  return {
    type: "FeatureCollection",
    features: Array.from(featMap.values())
  }
}

export default function EditorMapComponent({
  location,
  exhibitorsById: exhibitorsByID
}: {
  location: Location
  exhibitorsById: Map<number, Exhibitor>
}) {
  const mapRef = useRef<MapRef>(null)

  const [mapLoaded, setMapLoaded] = useState(false)

  const [drawMode, setDrawMode] = useState<DrawMode>("simple_select")

  const [activeFeatureId, setActiveFeatureId] = useState<BoothID | null>(null)

  const [showBuildings, setShowBuildings] = useState(false)

  const geoJsonData = showBuildings ? geoJsonBuildingData : geoJsonBoothData

  const featureMap = useRef<FeatureMap>(
    new Map(geoJsonData.features.map(feat => [feat.properties.id, feat]))
  )

  function resetFeatures(geoJsonData: GeoJsonBoothsData) {
    featureMap.current = new Map(
      geoJsonData.features.map(feat => [feat.properties.id, feat])
    )
    updateBooths()
    updateDrawFeatures()
  }

  function setFeature(feat: GeoJsonBooth) {
    featureMap.current.set(feat.properties.id, feat)
  }
  function deleteFeature(feat: GeoJsonBooth) {
    featureMap.current.delete(feat.properties.id)
  }

  function onModeChange(e: { mode: DrawMode }) {
    console.log("Mode change", e.mode)
    setDrawMode(e.mode)
  }

  function onSelectionChange(e: { features: GeoJsonBooth[] }) {
    console.log("Selection change", drawMode, e)
    if (e.features.length === 0) return
    if (activeFeature == null) setActiveFeatureId(e.features[0].properties.id)
    else setActiveFeatureId(null)
  }

  function onCreate(e: { features: Feature<Polygon>[] }) {
    e.features.forEach(feat => {
      const id = Math.max(...Array.from(featureMap.current.keys())) + 1
      const newFeat = {
        ...feat,
        id,
        properties: { id, location: location.id, exhibitorId: -1 }
      }
      setFeature(newFeat)
      setActiveFeatureId(id)
      draw.delete(feat.id as string)
      draw.add(newFeat)
    })
  }

  function onUpdate(e: { features: GeoJsonBooth[] }) {
    e.features.forEach(feat => setFeature(feat))
    updateBooths()
  }

  function onDelete(e: { features: GeoJsonBooth[] }) {
    e.features.forEach(feat => deleteFeature(feat))
    updateBooths()
  }

  const draw = useMemo(() => {
    return new MapboxDraw({
      displayControlsDefault: false,
      defaultMode: "simple_select"
    })
  }, [])

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return
    const map = mapRef.current

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!map.hasControl(draw)) map.addControl(draw, "top-left")

    map.on("draw.create", onCreate)
    map.on("draw.update", onUpdate)
    map.on("draw.delete", onDelete)
    map.on("draw.selectionchange", onSelectionChange)
    map.on("draw.modechange", onModeChange)

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      map.removeControl(draw)
      map.off("draw.create", onCreate)
      map.off("draw.update", onUpdate)
      map.off("draw.delete", onDelete)
      map.off("draw.selectionchange", onSelectionChange)
      map.off("draw.modechange", onModeChange)
    }
  }, [mapLoaded, location])

  function updateDrawFeatures() {
    if (!mapLoaded) return
    const currentFeatures: GeoJsonBoothsData = {
      type: "FeatureCollection",
      features: Array.from(featureMap.current.values()).filter(
        feat => feat.properties.location === location.id
      )
    }
    draw.set(currentFeatures)
  }

  useEffect(updateDrawFeatures, [location, mapLoaded])

  const [booths, setBooths] = useState<Booth[]>([])

  const markers = booths.map(booth => (
    <BoothMarker key={booth.id} booth={booth} scale={1} />
  ))

  function updateBooths() {
    const feats = Array.from(featureMap.current.values())
    const booths = feats
      .filter(
        feat =>
          feat.properties.location === location.id &&
          feat.properties?.exhibitorId >= 0 // booths that were just created have exhibitorId -1
      )
      .map(feat => makeBooth(feat as GeoJsonBooth, exhibitorsByID))

    setBooths(booths)
  }

  useEffect(updateBooths, [location, mapLoaded])

  const activeFeature = activeFeatureId
    ? featureMap.current.get(activeFeatureId)!
    : null
  const popupLocation = activeFeature ? getPolygonCenter(activeFeature) : null

  return (
    <div className="flex h-full w-full justify-center">
      <MapboxMap
        ref={mapRef}
        onLoad={() => setMapLoaded(true)}
        initialViewState={{
          longitude: 18.070567,
          latitude: 59.34726,
          zoom: 18
        }}
        cursor={"auto"}
        minZoom={16}
        maxZoom={25}
        maxBounds={[
          [18.063, 59.345],
          [18.079, 59.35]
        ]}
        mapStyle="https://api.maptiler.com/maps/977e9770-60b4-4b8a-94e9-a9fa8db4c68d/style.json?key=57xj41WPFBbOEWiVSSwL">
        <Layer {...backgroundLayerStyle}></Layer>

        {mapLoaded && !showBuildings && markers}

        {mapLoaded && activeFeatureId != null && (
          <Popup
            key={activeFeatureId}
            longitude={popupLocation![0]}
            latitude={popupLocation![1]}
            closeButton={true}
            onClose={() => setActiveFeatureId(null)}>
            <FeatureEditor
              feat={activeFeature!}
              onSave={feat => {
                setFeature(feat)
                draw.add(feat)
                updateBooths()
              }}
              onDelete={feat => {
                deleteFeature(feat)
                draw.delete(feat.id as string)
                updateBooths()
                setActiveFeatureId(null)
              }}
            />
          </Popup>
        )}
      </MapboxMap>

      {mapLoaded && <Toolbar />}
    </div>
  )

  function FeatureEditor({
    feat,
    onSave,
    onDelete
  }: {
    feat: GeoJsonBooth
    onSave: (feat: GeoJsonBooth) => void
    onDelete: (feat: GeoJsonBooth) => void
  }) {
    const props = feat.properties

    const [exhibitorId, setExhibitorId] = useState<number>(props.exhibitorId)

    return (
      <div className="z-50 flex flex-col gap-4 divide-neutral-400 text-base text-stone-950">
        <div className="">
          <b>Booth ID:</b> {props.id}
        </div>
        <div className="flex items-center">
          <b>Exhibitor:</b>
          <select
            className="ml-1 w-full rounded-md bg-stone-300 p-0.5 hover:cursor-pointer"
            value={exhibitorId}
            onChange={e => {
              const newExhibitorId = parseInt(e.target.value)
              setExhibitorId(newExhibitorId)
              onSave({
                ...feat,
                properties: { ...props, exhibitorId: newExhibitorId }
              })
            }}>
            <option value={-1}>None</option>
            {Array.from(exhibitorsByID.values()).map(e => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between border-t border-stone-300 pt-3">
          <button
            className="w-max flex-none rounded-md bg-red-300 p-1 transition hover:bg-red-400"
            onClick={() => {
              onDelete(feat)
            }}>
            Delete
          </button>
          <button
            className="w-max flex-none rounded-md bg-stone-300 p-1 transition hover:bg-stone-400"
            onClick={() => {
              setActiveFeatureId(null)
            }}>
            Close
          </button>
        </div>
      </div>
    )
  }

  function Toolbar() {
    const [showJson, setShowJson] = useState(false)
    const json = JSON.stringify(
      toFeatureCollection(featureMap.current),
      null,
      2
    )
    const copyToClipboard = () => {
      navigator.clipboard
        .writeText(json)
        .then(() => setDidCopy(true))
        .catch(() => console.error("Failed to copy to clipboard"))
    }
    const [didCopy, setDidCopy] = useState(false)

    return (
      <div className="absolute bottom-2 flex gap-1">
        <Button
          className={cn(drawMode === "draw_polygon" && "dark:text-melon-700")}
          onClick={() => {
            if (!mapLoaded) return
            draw.changeMode("draw_polygon")
            setDrawMode("draw_polygon")
          }}>
          Draw
        </Button>

        <Button
          onClick={() => {
            setShowBuildings(!showBuildings)
            resetFeatures(
              showBuildings ? geoJsonBoothData : geoJsonBuildingData
            )
          }}>
          {showBuildings ? "Edit booths" : "Edit buildings"}
        </Button>

        <div className="relative flex justify-center">
          <Button onClick={() => setShowJson(!showJson)}>
            {showJson ? "Hide JSON" : "Show JSON"}
          </Button>
          {showJson && (
            <div className="absolute bottom-[45px] h-[500px] w-[500px] overflow-auto rounded-md bg-stone-200 p-2 text-stone-900">
              {!didCopy ? (
                <Button className="dark:bg-slate-400" onClick={copyToClipboard}>
                  Copy to clipboard
                </Button>
              ) : (
                <div>Copied!</div>
              )}
              <pre>{json}</pre>
            </div>
          )}
        </div>

        {/* reset button */}
        <Button
          className="dark:bg-gray-400"
          onClick={() => {
            resetFeatures(
              showBuildings ? geoJsonBuildingData : geoJsonBoothData
            )
          }}>
          Reset
        </Button>
      </div>
    )
  }
}
