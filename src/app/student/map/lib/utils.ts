import centerOfMass from "@turf/center-of-mass"
import { Feature, Polygon } from "geojson"

export function getPolygonCenter(feature: Feature<Polygon>) {
  return centerOfMass(feature).geometry.coordinates
}
