"use client"

import { Booth, BoothMap } from "@/app/student/map/lib/types"
import Image from "next/image"
import { Marker } from "react-map-gl/maplibre"

function BoothMarker({ booth }: { booth: Booth }) {
	const logoSrc = booth.exhibitor.logo_squared ?? booth.exhibitor.logo_freesize
	return (
		<Marker
			key={booth.id}
			longitude={booth.center[0]}
			latitude={booth.center[1]}>
			{logoSrc ? (
				<div className="">
					<Image
						className="h-16 w-16"
						src={logoSrc}
						alt={booth.exhibitor.name}
						width={300}
						height={300}></Image>
				</div>
			) : (
				<span className="text-black">{booth.exhibitor.name}</span>
			)}
		</Marker>
	)
}

export async function BoothMarkers({ boothMap }: { boothMap: BoothMap }) {
	return (
		<>
			{Array.from(boothMap.values()).map(booth => (
				<BoothMarker key={booth.id} booth={booth} />
			))}
		</>
	)
}
