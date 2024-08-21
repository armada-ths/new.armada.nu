"use client"

import {
  BoothID,
  GeoJsonBooth,
  geoJsonBoothData,
  GeoJsonBoothsData
} from "@/app/student/map/lib/booths"
import { Location } from "@/app/student/map/lib/locations"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import MapboxDraw, { DrawMode } from "@mapbox/mapbox-gl-draw"
import "maplibre-gl/dist/maplibre-gl.css"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  BackgroundLayer,
  Layer,
  Map as MapboxMap,
  MapRef
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

function toFeatureCollection(featMap: FeatureMap): GeoJsonBoothsData {
  return {
    type: "FeatureCollection",
    features: Array.from(featMap.values())
  }
}

export default function EditorMapComponent({
  location
}: {
  location: Location
}) {
  const mapRef = useRef<MapRef>(null)

  const [mapLoaded, setMapLoaded] = useState(false)

  const [drawMode, setDrawMode] = useState<DrawMode>("simple_select")

  const featureMap = useRef<FeatureMap>(
    new Map(geoJsonBoothData.features.map(feat => [feat.properties.id, feat]))
  )
  function setFeature(feat: GeoJsonBooth) {
    featureMap.current.set(feat.properties.id, feat)
  }
  function deleteFeature(feat: GeoJsonBooth) {
    featureMap.current.delete(feat.properties.id)
  }

  function onModeChange(e: { mode: DrawMode }) {
    setDrawMode(e.mode)
  }

  function onSelectionChange(e: { features: GeoJsonBooth[] }) {
    console.log("Selection change", e)
    if (e.features.length === 0) return
    console.log(e.features.map(e => e.id))
  }

  function onCreate(e: { features: GeoJsonBooth[] }) {
    e.features.forEach(feat => {
      const newFeat = {
        ...feat,
        properties: { ...feat.properties, location: location.id }
      }
      setFeature(newFeat)
    })
  }

  function onUpdate(e: { features: GeoJsonBooth[] }) {
    e.features.forEach(feat => setFeature(feat))
  }

  function onDelete(e: { features: GeoJsonBooth[] }) {
    e.features.forEach(feat => deleteFeature(feat))
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
    console.log("Map loaded", map)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map.addControl(draw, "top-left")

    map.on("draw.create", onCreate)
    map.on("draw.update", onUpdate)
    map.on("draw.delete", onDelete)
    map.on("draw.selectionchange", onSelectionChange)
    map.on("draw.modechange", onModeChange)

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      map.removeControl(draw)
    }
  }, [mapLoaded])

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
        maxZoom={20}
        maxBounds={[
          [18.063, 59.345],
          [18.079, 59.35]
        ]}
        mapStyle="https://api.maptiler.com/maps/977e9770-60b4-4b8a-94e9-a9fa8db4c68d/style.json?key=57xj41WPFBbOEWiVSSwL">
        <Layer {...backgroundLayerStyle}></Layer>
      </MapboxMap>

      {mapLoaded && <Toolbar />}
    </div>
  )

  function Toolbar() {
    return (
      <div className="absolute bottom-2 flex ">
        <Button
          className={cn(drawMode === "draw_polygon" && "dark:text-melon-700")}
          onClick={() => {
            draw.changeMode("draw_polygon")
            setDrawMode("draw_polygon")
          }}>
          Draw
        </Button>
      </div>
    )
  }
}
