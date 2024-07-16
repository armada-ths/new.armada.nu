import type { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import type { Feature, FeatureCollection, Polygon, Position } from "geojson"

export const locationNames = ["nymble/1", "nymble/2", "nymble/3", "library"] as const
export type LocationName = (typeof locationNames)[number]

export type BoothID = number

type GeoJsonBoothProperties = { id: number; location: LocationName }
export type GeoJsonBooth = Feature<Polygon, GeoJsonBoothProperties>
export type GeoJsonBoothsData = FeatureCollection<
	Polygon,
	GeoJsonBoothProperties
>

export type Booth = {
	id: BoothID
	location: LocationName
	exhibitor: Exhibitor
	polygon: Polygon
	center: Position
}

export type BoothMap = Map<BoothID, Booth>
