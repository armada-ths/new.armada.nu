export type LocationId = "nymble/2" | "nymble/3" | "library" //Removed nymble/1, we only show plan 2, 3 and library

export type Location = {
  id: LocationId
  label: string
  center: { longitude: number; latitude: number; zoom: number }
}

const nymbleCenter = {
  longitude: 18.070592659323438,
  latitude: 59.347274028818134,
  zoom: 18.891181298825842
}

const libraryCenter = {
  longitude: 18.072310911561203,
  latitude: 59.3479216743261,
  zoom: 18.11485244486189
}

export const locations: Location[] = [
  {
    id: "nymble/2",
    label: "Nymble Floor 2",
    center: nymbleCenter
  },
  {
    id: "nymble/3",
    label: "Nymble Floor 3",
    center: nymbleCenter
  },
  {
    id: "library",
    label: "Library",
    center: libraryCenter
  }
]

export const defaultLocation = locations[0]

export function validLocationId(locationId: string): locationId is LocationId {
  return locations.some(loc => loc.id === locationId)
}
