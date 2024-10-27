"use client"

import {
  geoJsonNymblePlan2Data,
  geoJsonNymblePlan2RoomsData,
  geoJsonNymblePlan2RoutesData,
  geoJsonNymblePlan3Data,
  geoJsonNymblePlan3RoomsData,
  geoJsonNymblePlan3RoutesData
} from "@/app/student/map/lib/config"
import { Location } from "@/app/student/map/lib/locations"
import { useEffect, useState } from "react"

//Change layer style data source based on selected location
export function useGeoJsonPlanData(location: Location) {
  const [geoJsonPlanData, setGeoJsonPlanData] = useState(geoJsonNymblePlan2Data)
  const [geoJsonPlanRoutesData, setGeoJsonPlanRoutesData] = useState(
    geoJsonNymblePlan2RoutesData
  )
  const [geoJsonPlanRoomsData, setGeoJsonPlanRoomsData] = useState(
    geoJsonNymblePlan2RoomsData
  )

  useEffect(() => {
    switch (location.id) {
      case "nymble/2": {
        setGeoJsonPlanData(geoJsonNymblePlan2Data)
        setGeoJsonPlanRoutesData(geoJsonNymblePlan2RoutesData)
        setGeoJsonPlanRoomsData(geoJsonNymblePlan2RoomsData)
        break
      }
      case "nymble/3": {
        setGeoJsonPlanData(geoJsonNymblePlan3Data)
        setGeoJsonPlanRoutesData(geoJsonNymblePlan3RoutesData)
        setGeoJsonPlanRoomsData(geoJsonNymblePlan3RoomsData)
        break
      }
      case "library":
        //TODO: library plan data
        break
    }
  }, [location])
  return [geoJsonPlanData, geoJsonPlanRoutesData, geoJsonPlanRoomsData]
}
