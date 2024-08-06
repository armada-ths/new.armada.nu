"use client"

import { MapComponent } from "@/app/student/map/_components/MapComponent"
import Sidebar from "@/app/student/map/_components/Sidebar"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import { useState } from "react"
import { BoothMap } from "../lib/booths"
import { LocationId, locations } from "../lib/locations"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function MainView({
	boothsByLocation,
	exhibitors
}: {
	boothsByLocation: Map<LocationId, BoothMap>
	exhibitors: Exhibitor[]
}) {
	const [locationId, setLocationId] = useState<LocationId>("nymble/1")
	const location = locations.find(loc => loc.id === locationId)!
	const currentLocationBoothsById = boothsByLocation.get(locationId)!

	return (
		<div className="relative flex h-full w-full">
			<Sidebar exhibitors={exhibitors} />

			<div className="flex-grow" >
				<MapComponent
					// key={locationId}
					boothsById={currentLocationBoothsById}
					location={location}
				/>
			</div>

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
		<div className="absolute top-2 justify-self-center rounded-full sm:right-2">
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
