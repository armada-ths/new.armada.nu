import { MapComponent } from "@/app/student/map/_components/MapComponent"
import { boothData } from "@/app/student/map/data/data"
import {
	Booth,
	BoothID,
	BoothMap,
	GeoJsonBooth,
	locationNames
} from "@/app/student/map/lib/types"
import { getPolygonCenter } from "@/app/student/map/lib/utils"
import {
	Exhibitor,
	fetchExhibitors
} from "@/components/shared/hooks/api/useExhibitors"

export default async function MapPage() {
	const boothIDToExhibitorID: { [key: BoothID]: Exhibitor["id"] } = {
		0: 1434,
		1: 1434,
		2: 1434,
		3: 1434
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
		if (!locationNames.includes(location)) {
			throw new Error(`Invalid location name for booth with id ${id}: ${location}`)
		}

		return {
			id,
			exhibitor,
			location: location,
			polygon: data.geometry,
			center: getPolygonCenter(data)
		}
	}

	const boothsByID: BoothMap = new Map(
		boothData.features.map(feat => [feat.properties.id, makeBooth(feat)])
	)

	return (
		<div className="h-screen pt-16">
			<MapComponent boothMap={boothsByID} />
		</div>
	)
}
