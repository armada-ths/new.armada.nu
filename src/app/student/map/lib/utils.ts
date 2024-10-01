import { Booth } from "@/app/student/map/lib/booths"
import { LocationId } from "@/app/student/map/lib/locations"
import centerOfMass from "@turf/center-of-mass"
import { Feature, Polygon } from "geojson"

export function getPolygonCenter(feature: Feature<Polygon>) {
  return centerOfMass(feature).geometry.coordinates
}

export function sortBooths(booths: Booth[], currentLocation: LocationId) {
  return booths.sort((a, b) => {
    const c1 =
      (b.location === currentLocation ? 1 : 0) -
      (a.location === currentLocation ? 1 : 0)
    if (c1 !== 0) return c1
    const c2 = a.location.localeCompare(b.location)
    if (c2 !== 0) return c2
    const c3 = a.exhibitor.name.localeCompare(b.exhibitor.name)
    return c3
  })
}
