import MainView from "@/app/student/map/_components/MainView"
import { boothData, BoothID } from "@/app/student/map/lib/booths"
import { getPolygonCenter } from "@/app/student/map/lib/utils"
import {
	Exhibitor,
	fetchExhibitors
} from "@/components/shared/hooks/api/useExhibitors"
import { Booth, BoothMap, GeoJsonBooth } from "./lib/booths"
import { locations } from "./lib/locations"

export default async function MapPage() {
	const boothIDToExhibitorID: { [key: BoothID]: Exhibitor["id"] } = {
		0: 1434,
		1: 1323,
		2: 1324,
		3: 1325
	} // will come from a file later

	const exhibitors = await fetchExhibitors({
		year: 2023,
		next: { revalidate: 3600 * 24 * 6 /* 6 days */ }
	})

	const exhibitorsByID = new Map(exhibitors.map(e => [e.id, e]))

	function makeBooth(data: GeoJsonBooth): Booth {
		const { id, location } = data.properties
		const exhibitorID = boothIDToExhibitorID[id]
		const exhibitor = exhibitorsByID.get(exhibitorID)
		if (!exhibitor) {
			throw new Error(
				`No exhibitor found for booth with id ${id} (exhibitor id ${exhibitorID})`
			)
		}
		if (!locations.some(loc => loc.id === location)) {
			throw new Error(
				`Invalid location name for booth with id ${id}: ${location}`
			)
		}

		return {
			id,
			exhibitor,
			location,
			polygon: data.geometry,
			center: getPolygonCenter(data)
		}
	}

	const boothsByID: BoothMap = new Map(
		boothData.features.map(feat => [feat.properties.id, makeBooth(feat)])
	)

	return (
		// TODO: pt-16 is to account for the navbar, will break if navbar size changes
		<div className="h-screen pt-16">
			<MainView boothMap={boothsByID} exhibitors={exhibitors} />
		</div>
	)
}
