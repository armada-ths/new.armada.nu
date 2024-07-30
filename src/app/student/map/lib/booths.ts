import { LocationId, locations } from "@/app/student/map/lib/locations"
import type { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import type { Feature, FeatureCollection, Polygon, Position } from "geojson"
import boothDataRaw from "../data/booths.json"

export type BoothID = number

export type GeoJsonBoothProperties = { id: BoothID; location: LocationId }

export type GeoJsonBooth = Feature<Polygon, GeoJsonBoothProperties>

export type GeoJsonBoothsData = FeatureCollection<
	Polygon,
	GeoJsonBoothProperties
>

export type Booth = {
	id: BoothID
	location: LocationId
	exhibitor: Exhibitor
	polygon: Polygon
	center: Position
}

export type BoothMap = Map<BoothID, Booth>

export const geoJsonBoothData = boothDataRaw as GeoJsonBoothsData

export const geoJsonBoothDataByLocation = new Map<
	LocationId,
	GeoJsonBoothsData
>(locations.map(loc => [loc.id, { type: "FeatureCollection", features: [] }]))

geoJsonBoothData.features.forEach(feat => {
	geoJsonBoothDataByLocation.get(feat.properties.location)?.features.push(feat)
})
