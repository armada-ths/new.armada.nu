import { Viewport } from "next"
import "./map.css"

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width, initial-scale=1, maximum-scale=1",
  height: "device-height, initial-scale=1, shrink-to-fit=no"
}

export default function Layout({ children }: React.PropsWithChildren) {
  return children
}
