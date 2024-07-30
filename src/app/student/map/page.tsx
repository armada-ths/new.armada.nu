import MainView from "@/app/student/map/_components/MainView"
import {
	BoothID,
	geoJsonBoothData,
	Booth,
	BoothMap,
	GeoJsonBooth
} from "@/app/student/map/lib/booths"
import { getPolygonCenter } from "@/app/student/map/lib/utils"
import {
	Exhibitor,
	fetchExhibitors
} from "@/components/shared/hooks/api/useExhibitors"
import { LocationId, locations } from	"@/app/student/map/lib/locations"

export default async function MapPage() {
	const boothIDToExhibitorID: { [key: BoothID]: Exhibitor["id"] } = {
		0: 1434,
		1: 1323,
		2: 1324,
		3: 1325,
		4: 1326,
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

		console.log(id, location, exhibitorID)

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
		geoJsonBoothData.features.map(feat => [feat.properties.id, makeBooth(feat)])
	)

	const boothsByLocation: Map<LocationId, BoothMap> = new Map(
		locations.map(loc => [loc.id, new Map()])
	)
	boothsByID.forEach((booth, id) => {
		boothsByLocation.get(booth.location)!.set(id, booth)
	})

	return (
		// TODO: pt-16 is to account for the navbar, will break if navbar size changes
		<div className="h-screen pt-16">
			<MainView boothsByLocation={boothsByLocation} exhibitors={exhibitors} />
		</div>
	)
}
