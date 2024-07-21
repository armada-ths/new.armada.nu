import { LocationId } from "@/app/student/map/lib/locations"
import type { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import type { Feature, FeatureCollection, Polygon, Position } from "geojson"
import boothDataRaw from "../data/booths.json"

export const boothData = boothDataRaw as GeoJsonBoothsData

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
