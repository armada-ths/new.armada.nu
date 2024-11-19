import MainView from "@/app/student/map/_components/MainView"
import {
  BoothMap,
  geoJsonBoothData,
  makeBooth
} from "@/app/student/map/lib/booths"
import { LocationId, locations } from "@/app/student/map/lib/locations"
import { feature } from "@/components/shared/feature"
import { fetchExhibitors } from "@/components/shared/hooks/api/useExhibitors"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Armada Map",
  description: "Interactive map of the fair"
}

export default async function Page() {
  if (!(await feature("MAP_PAGE"))) {
    return notFound()
  }

  const exhibitors = await fetchExhibitors({
    year: 2024,
    next: { revalidate: 3600 / 3 /* 20 min */ }
  })

  const exhibitorsByID = new Map(exhibitors.map(e => [e.id, e]))

  const boothsById: BoothMap = new Map(
    geoJsonBoothData.features.map(feat => [
      feat.properties.id,
      makeBooth(feat, exhibitorsByID)
    ])
  )

  const boothsByLocation: Map<LocationId, BoothMap> = new Map(
    locations.map(loc => [loc.id, new Map()])
  )
  boothsById.forEach((booth, id) => {
    boothsByLocation.get(booth.location)!.set(id, booth)
  })

  return (
    // TODO: pt-16 is to account for the navbar, will break if navbar size changes
    <div className="flex h-[100dvh] pt-16">
      <Suspense>
        <MainView
          exhibitorsById={exhibitorsByID}
          boothsByLocation={boothsByLocation}
          boothsById={boothsById}
        />
      </Suspense>
    </div>
  )
}
