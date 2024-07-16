"use client"

import { BoothPopup } from "@/app/student/map/_components/BoothPopup"
import { boothData } from "@/app/student/map/data/data"
import { BoothMap, GeoJsonBooth } from "@/app/student/map/lib/types"
import { getPolygonCenter } from "@/app/student/map/lib/utils"
import "maplibre-gl/dist/maplibre-gl.css"
import { useMemo, useRef, useState } from "react"
import {
	BackgroundLayer,
	FillLayer,
	Layer,
	Map,
	MapLayerMouseEvent,
	MapRef,
	Source
} from "react-map-gl/maplibre"
import { BoothMarkers } from "./BoothMarkers"

const boothLayerStyle: FillLayer = {
	source: "data",
	id: "data",
	type: "fill",
	paint: {
		"fill-color": "#9053be",
		"fill-outline-color": "#000000",
		// from https://docs.mapbox.com/mapbox-gl-js/example/hover-styles/
		"fill-opacity": [
			"case",
			["boolean", ["feature-state", "active"], false],
			1,
			0.5
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

	const markers = useMemo(
		() => BoothMarkers({ boothMap: boothMap }),
		[boothMap]
	)

	function onMapClick(e: MapLayerMouseEvent) {
		if (activeFeature) {
			mapRef.current?.setFeatureState(
				{ source: "data", id: activeFeature?.id },
				{ active: false }
			)
			setActiveFeature(null)
		}

		const feature = e.features?.[0] as GeoJsonBooth | undefined // no other features for now
		if (!feature) return
		mapRef.current?.setFeatureState(
			{ source: "data", id: feature.properties.id },
			{ active: true }
		)
		setActiveFeature(feature)

		mapRef.current?.flyTo({
			center: getPolygonCenter(feature) as [number, number],
			zoom: 18.5,
			speed: 0.8
		})
	}

	return (
		<div className="h-full w-full">
			<Map
				ref={mapRef}
				onClick={onMapClick}
				interactiveLayerIds={["data"]}
				initialViewState={{
					longitude: 18.070567,
					latitude: 59.34726,
					zoom: 17
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

				<Source id="data" type="geojson" data={boothData}>
					<Layer {...boothLayerStyle}></Layer>
				</Source>

				{markers}

				{activeFeature && (
					<BoothPopup booth={boothMap.get(activeFeature.properties.id)!} />
				)}
			</Map>
		</div>
	)
}
