"use client"

import "maplibre-gl/dist/maplibre-gl.css"
import {
	Map,
	Source,
	Layer,
	BackgroundLayer,
	FillLayer,
	MapRef,
	MapLayerMouseEvent,
	Popup
} from "react-map-gl/maplibre"
import { useRef, useState } from "react"
import boothData from "../data/booths.json"
import { Feature, Polygon } from "geojson"
import { centerOfMass } from "@turf/center-of-mass"

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

function getCenter(feature: Feature<Polygon>) {
	return centerOfMass(feature).geometry.coordinates as [number, number]
}

export default function MapComponent() {
	const mapRef = useRef<MapRef>(null)
	const [activeFeature, setActiveFeature] = useState<Feature<Polygon> | null>(
		null
	)

	function onMapClick(e: MapLayerMouseEvent) {
		if (activeFeature) {
			mapRef.current?.setFeatureState(
				{ source: "data", id: activeFeature?.id },
				{ active: false }
			)
			setActiveFeature(null)
		}

		const feature = e.features?.[0] as Feature<Polygon>
		if (!feature) return
		mapRef.current?.setFeatureState(
			{ source: "data", id: feature.id },
			{ active: true }
		)
		setActiveFeature(feature)

		mapRef.current?.flyTo({
			center: getCenter(feature),
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

				{activeFeature && (
					<Popup
						key={Math.random()} // force rerender (TODO: wtf)
						anchor="bottom"
						longitude={getCenter(activeFeature)[0]}
						latitude={getCenter(activeFeature)[1]}
						closeButton={false}>
						<div className="text-black">ID: {activeFeature.properties?.id}</div>
					</Popup>
				)}
			</Map>
		</div>
	)
}
