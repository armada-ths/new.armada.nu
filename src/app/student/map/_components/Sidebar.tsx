"use client"

import ExhibitorDetails from "@/app/student/_components/ExhibitorDetails"
import { Booth, BoothID, BoothMap } from "@/app/student/map/lib/booths"
import { LocationId, locations } from "@/app/student/map/lib/locations"
import { useScreenSize } from "@/components/shared/hooks/useScreenSize"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ChevronsLeft, ChevronsRight } from "lucide-react"
import { useRef, useState } from "react"


export default function Sidebar({
	boothsById,
	activeBoothId,
	hoveredBoothId,
	setActiveBoothId,
	setHoveredBoothId,
	currentLocation
}: {
	boothsById: BoothMap
	activeBoothId: BoothID | null
	hoveredBoothId: BoothID | null
	setActiveBoothId: (id: BoothID | null) => void
	setHoveredBoothId: (id: BoothID | null) => void
	currentLocation: LocationId
}) {

	// First show the booths in the current location, then sort by location
	function sortBooths(booths: Booth[]) {
		return booths.sort((a, b) => {
			const x = (b.location === currentLocation ? 1 : 0) - (a.location === currentLocation ? 1 : 0)
			if (x !== 0) return x
			return a.location.localeCompare(b.location)
		})	
	}
	const sortedBooths = sortBooths(Array.from(boothsById.values()))

	const { width } = useScreenSize()
	const smallScreen = width ? width <= 800 : false

	if (activeBoothId != null) {
		const exhibitor = boothsById.get(activeBoothId)?.exhibitor
		if (!exhibitor) {
			console.error(`No exhibitor found for booth with id ${activeBoothId}`)
			return null
		}
		return (
			<SidebarContainer smallScreen={smallScreen}>
				<div className="p-2">
					<ExhibitorDetails exhibitor={exhibitor} />
				</div>
			</SidebarContainer>
		)
	}

	return (
		<SidebarContainer smallScreen={smallScreen}>
			<div className="h-[100px] text-2xl">Filters and stuff</div>
			<ul className="divide-y divide-neutral-400">
				{sortedBooths.map(({ id, exhibitor, location }) => (
					<li	
						key={id}
						onClick={() => setActiveBoothId(id)}
						onMouseEnter={() => setHoveredBoothId(id)}
						onMouseLeave={() => setHoveredBoothId(null)}
						className="flex cursor-default px-1 py-2 hover:bg-slate-800">
						<div>{exhibitor.name}</div>
						<div className="ml-auto text-sm text-neutral-400">
							{locations.find(loc => loc.id === location)?.label}
						</div>
					</li>
				))}
			</ul>
		</SidebarContainer>
	)
}

function SidebarContainer({
	smallScreen: isMobile,
	children
}: {
	smallScreen: boolean
	children: React.ReactNode
}) {
	const [open, setOpen] = useState<boolean>(true)
	const drawerRef = useRef<HTMLDivElement>(null)

	if (isMobile) {
		return (
			<Drawer
				dismissible={false}
				noBodyStyles={true}
				modal={false}
				setBackgroundColorOnScale={false}
				shouldScaleBackground={false}
				open={open}
				snapPoints={["120px", 0.8]}
				onOpenChange={setOpen}
				direction={"bottom"}>
				<DrawerContent
					ref={drawerRef}
					withHandle={true}
					className={"z-10 h-full w-full focus-visible:outline-none"}>
					<ScrollArea className="h-full">
						{children}
						<ScrollBar></ScrollBar>
					</ScrollArea>
				</DrawerContent>
			</Drawer>
		)
	}

	return (
		<div className={cn("relative h-full", open ? "w-[500px]" : "w-0")}>
			<ScrollArea className="h-full">
				{children}
				<ScrollBar></ScrollBar>
			</ScrollArea>

			<div className="absolute right-[-38px] top-0 z-20">
				<Button
					variant="ghost"
					className="rounded-s-none border-none p-1"
					onClick={() => setOpen(!open)}
					title={open ? "Close sidebar" : "Open sidebar"}>
					{open ? <ChevronsLeft size={30} /> : <ChevronsRight size={30} />}
				</Button>
			</div>
		</div>
	)
}
