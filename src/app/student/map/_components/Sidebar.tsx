"use client"

import { cn } from "@/lib/utils"
import { useScreenSize } from "@/components/shared/hooks/useScreenSize"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import { Drawer, DrawerContent, DrawerPortal } from "@/components/ui/drawer"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"

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

	if (!open) {
		return (
			<Button
				variant="secondary"
				onClick={() => setOpen(true)}
				className={cn(
					"absolute z-10 dark:bg-transparent",
					isMobile ? "bottom-1 mx-auto self-center" : "left-1 top-1"
				)}>
				Open sidebar
			</Button>
		)
	}

	return (
		<Drawer
			noBodyStyles={true}
			modal={false}
			setBackgroundColorOnScale={false}
			shouldScaleBackground={false}
			open={open}
			snapPoints={isMobile ? ["100px", 0.8] : undefined}
			onOpenChange={setOpen}
			direction={isMobile ? "bottom" : "left"}>
			<DrawerContent
				ref={drawerRef}
				withHandle={isMobile}
				className={cn(
					"z-10 focus-visible:outline-none",
					isMobile
						? "h-full w-full"
						: "top-16 h-full w-[40%] max-w-[600px] rounded-none rounded-e-[10px] pb-16 pr-2"
				)}>
				<ScrollArea className="h-full">
					{children}
					<ScrollBar></ScrollBar>
				</ScrollArea>
			</DrawerContent>
		</Drawer>
	)
}
