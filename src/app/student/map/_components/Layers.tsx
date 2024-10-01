import {
  BackgroundLayer,
  FillLayer,
  LineLayer
} from "react-map-gl/dist/esm/types/style-spec-maplibre"

export const boothLayerStyle: FillLayer = {
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

export const buildingLayerStyle: LineLayer = {
  source: "buildings",
  id: "buildings",
  type: "line",
  paint: {
    "line-color": "#ff0000",
    "line-width": 2
  }
}

export const backgroundLayerStyle: BackgroundLayer = {
  id: "background",
  type: "background",
  paint: {
    "background-color": "#40d07e",
    "background-opacity": 0.2
  }
}
