"use client"

import { BoothPopup } from "@/app/student/map/_components/BoothPopup"
import { boothData } from "@/app/student/map/lib/booths"
import { getPolygonCenter } from "@/app/student/map/lib/utils"
import "maplibre-gl/dist/maplibre-gl.css"
import { useMemo, useRef, useState } from "react"
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

export function MapComponent({ boothMap }: { boothMap: BoothMap }) {
	const mapRef = useRef<MapRef>(null)
	const [activeFeature, setActiveFeature] = useState<GeoJsonBooth | null>(null)
	const [hoveredFeature, setHoveredFeature] = useState<GeoJsonBooth | null>(
		null
	)
	const [markerScale, setMarkerScale] = useState(1)

	const markers = useMemo(
		() => BoothMarkers({ boothMap: boothMap, scale: markerScale }),
		[boothMap, markerScale]
	)

	function onMapClick(e: MapLayerMouseEvent) {
		if (activeFeature) {
			mapRef.current?.setFeatureState(
				{ source: "booths", id: activeFeature?.id },
				{ active: false }
			)
			setActiveFeature(null)
		}
		if (hoveredFeature) {
			mapRef.current?.setFeatureState(
				{ source: "booths", id: hoveredFeature?.id },
				{ hover: false }
			)
			setHoveredFeature(null)
		}

		const feature = e.features?.[0] as GeoJsonBooth | undefined // no other features for now
		if (!feature) return

		mapRef.current?.setFeatureState(
			{ source: "booths", id: feature.id },
			{ active: true }
		)
		setActiveFeature(feature)

		mapRef.current?.flyTo({
			center: getPolygonCenter(feature) as [number, number],
			zoom: 18.5,
			speed: 0.8
		})
	}

	function onBoothMouseEnter(e: MapLayerMouseEvent) {
		const feature = e.features?.[0] as GeoJsonBooth | undefined
		if (!feature) return

		mapRef.current?.setFeatureState(
			{ source: "booths", id: feature.id },
			{ hover: true }
		)
		setHoveredFeature(feature)
	}

	function onBoothMouseLeave(e: MapLayerMouseEvent) {
		const feature = e.features?.[0] as GeoJsonBooth | undefined
		if (!feature) return
		
		mapRef.current?.setFeatureState(
			{ source: "booths", id: feature.id },
			{ hover: false }
		)
		setHoveredFeature(null)
	}

	function onZoomChange() {
		const zoom = mapRef.current?.getZoom()
		if (zoom === undefined) return
		const scale = Math.max(0.3, Math.min(2, 1 + (zoom - 18) * 0.3))
		console.log(zoom, scale)
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

				<Source id="booths" type="geojson" data={boothData}>
					<Layer {...boothLayerStyle}></Layer>
				</Source>

				{markers}

				{activeFeature && (
					<BoothPopup booth={boothMap.get(activeFeature.properties.id)!} />
				)}
			</MapboxMap>
		</div>
	)
}
