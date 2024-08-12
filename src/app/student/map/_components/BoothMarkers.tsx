"use client"

import Image from "next/image"
import { Marker } from "react-map-gl/maplibre"
import { Booth, BoothMap } from "../lib/booths"

function BoothMarker({ booth, scale }: { booth: Booth; scale: number }) {
	const logoSrc = booth.exhibitor.logo_squared ?? booth.exhibitor.logo_freesize
	return (
		<Marker
			key={booth.id}
			longitude={booth.center[0]}
			latitude={booth.center[1]}>
			<div style={{ transform: `scale(${scale})` }}>
				{logoSrc ? (
					<div className="size-[60px] flex" >
						<Image
							className="my-auto"
							src={logoSrc}
							alt={booth.exhibitor.name}
							width={300}
							height={300}></Image>
					</div>
				) : (
					<span className="text-black">{booth.exhibitor.name}</span>
				)}
			</div>
		</Marker>
	)
}

export function BoothMarkers({
	boothMap,
	scale
}: {
	boothMap: BoothMap
	scale: number
}) {
	return (
		<>
			{Array.from(boothMap.values()).map(booth => (
				<BoothMarker key={booth.id} booth={booth} scale={scale} />
			))}
		</>
	)
}
