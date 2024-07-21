"use client"

import { MapComponent } from "@/app/student/map/_components/MapComponent"
import Sidebar from "@/app/student/map/_components/Sidebar"
import { useState } from "react"
import { BoothMap } from "../lib/booths"
import { LocationId, locations, Location } from "../lib/locations"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"

export default function MainView({ boothMap, exhibitors }: { boothMap: BoothMap, exhibitors: Exhibitor[] }) {
	const [locationId, setLocationId] = useState<LocationId>("nymble/1")
	const location = locations.find(loc => loc.id === locationId)!

	return (
		<div className="flex h-full w-full flex-col relative">
			<Sidebar exhibitors={exhibitors} />
			<MapComponent boothMap={boothMap} />
			<SelectLocation locationId={locationId} setLocationId={setLocationId} />
		</div>
	)
}

function SelectLocation({
	locationId,
	setLocationId
}: {
	locationId: LocationId
	setLocationId: (id: LocationId) => void
}) {
	return (
		<div className="absolute top-2 sm:right-2 self-center rounded-full">
			<Select
				value={locationId}
				onValueChange={(id: LocationId) => setLocationId(id)}>
				<SelectTrigger className="w-[180px] rounded-full py-5 dark:ring-offset-0 dark:focus:ring-0">
					<SelectValue placeholder="Location" />
				</SelectTrigger>
				<SelectContent>
					{locations.map(loc => (
						<SelectItem key={loc.id} value={loc.id}>
							{loc.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}
