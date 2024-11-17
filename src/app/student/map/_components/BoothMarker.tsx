"use client"

import Image from "next/image"
import { Marker } from "react-map-gl/maplibre"
import { Booth } from "../lib/booths"

export function BoothMarker({ booth, scale }: { booth: Booth; scale: number }) {
  const logoSrc = booth.exhibitor.logo_squared ?? booth.exhibitor.logo_freesize
  return (
    <Marker
      key={booth.id}
      longitude={booth.center[0]}
      latitude={booth.center[1]}>
      <div
        className="cursor-default transition"
        style={{ transform: `scale(${scale})` }}>
        {logoSrc ? (
          <div className="flex size-[60px]">
            <Image
              className="my-auto"
              src={logoSrc}
              alt={booth.exhibitor.name}
              width={300}
              height={300}></Image>
          </div>
        ) : (
          <div className="max-w-[100px] truncate text-neutral-200">
            {booth.exhibitor.name}
          </div>
        )}
      </div>
    </Marker>
  )
}
