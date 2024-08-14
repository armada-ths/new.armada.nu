"use client"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Booth, BoothID } from "../lib/booths"

export function BoothListItem({
	booth,
	onBoothClick
}: {
	booth: Booth
	onBoothClick: (boothId: BoothID) => void
}) {
	const logoSrc = booth.exhibitor.logo_squared ?? booth.exhibitor.logo_freesize
	return (
		<Card className="cursor-pointer" onClick={() => onBoothClick(booth.id)}>
			<div className="h-12 transition hover:bg-lime-950">
				{logoSrc ? (
					<div className="ml-4 flex h-full items-center">
						<Image
							className="mr-2 size-16 object-contain"
							src={logoSrc}
							alt={booth.exhibitor.name}
							width={300}
							height={300}></Image>
						<div>{booth.exhibitor.name}</div>
					</div>
				) : (
					<div className="ml-4 flex h-full items-center">
						{booth.exhibitor.name}
					</div>
				)}
			</div>
		</Card>
	)
}
