"use client"

import { cn } from "@/lib/utils"
import { useScreenSize } from "@/components/shared/hooks/useScreenSize"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import { Drawer, DrawerContent, DrawerPortal } from "@/components/ui/drawer"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronsLeft, ChevronsRight } from "lucide-react"

export default function Sidebar({ exhibitors }: { exhibitors: Exhibitor[] }) {
	const { width } = useScreenSize()
	const isMobile = width ? width <= 640 : false

	return (
		<SidebarContainer isMobile={isMobile}>
			<div className="h-[72px] text-2xl">Filters and stuff</div>
			<ul className="p-2">
				{exhibitors.map(exhibitor => (
					<li key={exhibitor.id}>{exhibitor.name}</li>
				))}
			</ul>
		</SidebarContainer>
	)
}

function SidebarContainer({
	isMobile,
	children
}: {
	isMobile: boolean
	children: React.ReactNode
}) {
	const [open, setOpen] = useState<boolean>(true)
	const drawerRef = useRef<HTMLDivElement>(null)

	if (isMobile) {
		return (
			<Drawer
				noBodyStyles={true}
				modal={false}
				setBackgroundColorOnScale={false}
				shouldScaleBackground={false}
				open={open}
				snapPoints={["100px", 0.8]}
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
		<div className={cn("relative h-full", open ? "w-[400px]" : "w-0")}>
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
