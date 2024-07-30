"use client"

import { BoothPopup } from "@/app/student/map/_components/BoothPopup"
import {
	BoothID,
	geoJsonBoothDataByLocation
} from "@/app/student/map/lib/booths"
import { getPolygonCenter } from "@/app/student/map/lib/utils"
import "maplibre-gl/dist/maplibre-gl.css"
import { useEffect, useMemo, useRef, useState } from "react"
import {
	BackgroundLayer,
	FillLayer,
	Layer,
	Map as MapboxMap,
	MapLayerMouseEvent,
	MapRef,
	Source
} from "react-map-gl/maplibre"
import { BoothMap, GeoJsonBooth } from "../lib/booths"
import { BoothMarkers } from "./BoothMarkers"
import { Location } from "@/app/student/map/lib/locations"

const boothLayerStyle: FillLayer = {
	source: "booths",
	id: "booths",
	type: "fill",
	paint: {
		"fill-outline-color": "#0e3e08",
		"fill-color": [
			"case",
			["boolean", ["feature-state", "active"], false],
			"#21c00d",
			["boolean", ["feature-state", "hover"], false],
			"#a0df98",
			"#89bc82"
		]
	}
}

const backgroundLayerStyle: BackgroundLayer = {
	id: "background",
	type: "background",
	paint: {
		"background-color": "#40d07e",
		"background-opacity": 0.2
	}
}

export function MapComponent({
	boothsById,
	location
}: {
	boothsById: BoothMap
	location: Location
}) {
	const mapRef = useRef<MapRef>(null)

	const [markerScale, setMarkerScale] = useState(1)
	const [activeBoothId, setActiveBoothId] = useState<BoothID | null>(null)
	const [hoveredBoothId, setHoveredBoothId] = useState<BoothID | null>(null)

	// Fly to location center on change
	useEffect(() => {
		const { longitude, latitude, zoom } = location.center
		mapRef.current?.flyTo({
			center: [longitude, latitude],
			zoom: zoom
		})
	}, [location])

	// Keep mapbox feature state in sync with activeBoothId and hoveredBoothId
	// (to allow for styling of the features)
	function useFeatureState(
		boothId: BoothID | null,
		stateKey: "active" | "hover"
	) {
		useEffect(() => {
			const map = mapRef.current
			if (map == null || boothId == null) return

			map.setFeatureState(
				{ source: "booths", id: boothId },
				{ [stateKey]: true }
			)

			return () => {
				map.setFeatureState(
					{ source: "booths", id: boothId },
					{ [stateKey]: false }
				)
			}
		}, [boothId, stateKey])
	}

	useFeatureState(activeBoothId, "active")
	useFeatureState(hoveredBoothId, "hover")

	const activeBooth =
		activeBoothId != null ? boothsById.get(activeBoothId) : null

	const currentGeoJsonBoothData = geoJsonBoothDataByLocation.get(location.id)!

	// Don't want to rerender markers on every map render
	const markers = useMemo(
		() => BoothMarkers({ boothMap: boothsById, scale: markerScale }),
		[boothsById, markerScale]
	)

	function onMapClick(e: MapLayerMouseEvent) {
		const feature = e.features?.[0] as GeoJsonBooth | undefined // no other features for now

		if (feature) {
			setActiveBoothId(feature.properties.id)

			mapRef.current?.flyTo({
				center: getPolygonCenter(feature) as [number, number],
				zoom: 18.5,
				speed: 0.8
			})
		} else {
			setActiveBoothId(null) // outside click
		}
	}

	function onBoothMouseEnter(e: MapLayerMouseEvent) {
		const feature = e.features?.[0] as GeoJsonBooth | undefined
		if (feature) {
			setHoveredBoothId(feature.properties.id)
		}
	}

	function onBoothMouseLeave(e: MapLayerMouseEvent) {
		const feature = e.features?.[0] as GeoJsonBooth | undefined
		if (feature) {
			setHoveredBoothId(null)
		}
	}

	function onZoomChange() {
		// console.log(mapRef.current?.getCenter(), mapRef.current?.getZoom())

		const zoom = mapRef.current?.getZoom()
		if (zoom === undefined) return
		const scale = Math.max(0.3, Math.min(2, 1 + (zoom - 18) * 0.3))
		setMarkerScale(scale)
	}

	return (
		<div className="h-full w-full">
			<MapboxMap
				ref={mapRef}
				onClick={onMapClick}
				onMouseEnter={onBoothMouseEnter}
				onMouseLeave={onBoothMouseLeave}
				onZoom={onZoomChange}
				interactiveLayerIds={["booths"]}
				initialViewState={{
					longitude: 18.070567,
					latitude: 59.34726,
					zoom: 18
				}}
				cursor={"auto"}
				minZoom={16}
				maxZoom={20}
				maxBounds={[
					[18.063, 59.345],
					[18.079, 59.35]
				]}
				mapStyle="https://api.maptiler.com/maps/977e9770-60b4-4b8a-94e9-a9fa8db4c68d/style.json?key=57xj41WPFBbOEWiVSSwL">
				<Layer {...backgroundLayerStyle}></Layer>

				<Source
					id="booths"
					type="geojson"
					promoteId={"id"}
					data={currentGeoJsonBoothData}>
					<Layer {...boothLayerStyle}></Layer>
				</Source>

				{markers}

				{activeBooth && <BoothPopup key={activeBooth.id} booth={activeBooth} />}
			</MapboxMap>
		</div>
	)
}
