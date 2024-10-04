import { FeatureMap } from "@/app/student/map/editor/EditorMapComponent"
import {
  GeoJsonBoothsData,
  geoJsonBoothData,
  geoJsonBuildingData
} from "@/app/student/map/lib/booths"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DrawMode } from "@mapbox/mapbox-gl-draw"
import { MutableRefObject, useState } from "react"

function featMapToJson(featMap: FeatureMap) {
  const featureCollection = {
    type: "FeatureCollection",
    features: Array.from(featMap.values())
  } as GeoJsonBoothsData
  return JSON.stringify(featureCollection, null, 2)
}

export function EditorToolbar({
  draw,
  drawMode,
  setDrawMode,
  resetFeatures,
  showBuildings,
  setShowBuildings,
  featureMap
}: {
  draw: MapboxDraw
  drawMode: DrawMode
  setDrawMode: (mode: DrawMode) => void
  resetFeatures: (data: GeoJsonBoothsData) => void
  showBuildings: boolean
  setShowBuildings: (show: boolean) => void
  featureMap: MutableRefObject<FeatureMap>
}) {
  const [showJson, setShowJson] = useState(false)
  const json = featMapToJson(featureMap.current)
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
          draw.changeMode("draw_polygon")
          setDrawMode("draw_polygon")
        }}>
        Draw
      </Button>

      <Button
        onClick={() => {
          setShowBuildings(!showBuildings)
          resetFeatures(showBuildings ? geoJsonBoothData : geoJsonBuildingData)
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
          resetFeatures(showBuildings ? geoJsonBuildingData : geoJsonBoothData)
        }}>
        Reset
      </Button>
    </div>
  )
}
