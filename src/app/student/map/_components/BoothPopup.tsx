"use client"

import { Booth } from "@/app/student/map/lib/types"
import { Popup } from "react-map-gl/maplibre"

export function BoothPopup({ booth }: { booth: Booth }) {
	return (
		<div>
			<Popup
				key={booth.id}
				anchor="bottom"
				longitude={booth.center[0]}
				latitude={booth.center[1]}
				closeButton={false}>
				<div className="text-black ">{booth.exhibitor.name}</div>
			</Popup>
		</div>
	)
}
