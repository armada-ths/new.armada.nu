import MainView from "@/app/student/map/_components/MainView"
import {
	Booth,
	BoothID,
	BoothMap,
	GeoJsonBooth,
	geoJsonBoothData
} from "@/app/student/map/lib/booths"
import { LocationId, locations } from "@/app/student/map/lib/locations"
import { getPolygonCenter } from "@/app/student/map/lib/utils"
import {
	Exhibitor,
	fetchExhibitors
} from "@/components/shared/hooks/api/useExhibitors"

export default async function MapPage() {

	const exhibitors = await fetchExhibitors({
		year: 2024,
		next: { revalidate: 3600 * 24 * 6 /* 6 days */ }
	})

	const exhibitorsByID = new Map(exhibitors.map(e => [e.id, e]))

	function makeBooth(data: GeoJsonBooth): Booth {
		const { id, location, exhibitorId } = data.properties

		const exhibitor = exhibitorsByID.get(exhibitorId)
		// const exhibitor: Partial<Exhibitor> = {
		// 	id: 1323,
		// 	name: "Hello",
		// }

		if (!exhibitor) {
			throw new Error(
				`No exhibitor found for booth with id ${id} (exhibitor id ${exhibitorId})`
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

	const boothsById: BoothMap = new Map(
		geoJsonBoothData.features.map(feat => [feat.properties.id, makeBooth(feat)])
	)

	const boothsByLocation: Map<LocationId, BoothMap> = new Map(
		locations.map(loc => [loc.id, new Map()])
	)
	boothsById.forEach((booth, id) => {
		boothsByLocation.get(booth.location)!.set(id, booth)
	})

	return (
		// TODO: pt-16 is to account for the navbar, will break if navbar size changes
		<div className="flex h-screen pt-16">
			<MainView boothsByLocation={boothsByLocation} boothsById={boothsById} />
		</div>
	)
}
