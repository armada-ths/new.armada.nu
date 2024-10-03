"use client"

import { Popup } from "react-map-gl/maplibre"
import { Booth } from "../lib/booths"

export function BoothPopup({ booth }: { booth: Booth }) {
  return (
    <Popup
      key={booth.id}
      anchor="bottom"
      longitude={booth.center[0]}
      latitude={booth.center[1]}
      closeButton={false}>
      <div className="text-black ">{booth.exhibitor.name}</div>
    </Popup>
  )
}
