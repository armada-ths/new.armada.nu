import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import Image from "next/image"

export function ExhibitorCard({ exhibitor }: { exhibitor: Exhibitor }) {
	return (
		<div className="group relative flex aspect-square w-52 flex-col rounded-lg bg-liqorice-700 p-4">
			{exhibitor.logo_freesize != null ||
				(exhibitor.logo_squared != null && (
					<Image
						className="brightness-20 p-4 grayscale-[100] filter group-hover:brightness-100 group-hover:grayscale-0"
						src={exhibitor.logo_squared ?? exhibitor.logo_freesize}
						alt={exhibitor.name}
						width={0}
						height={0}
						objectFit="contain"
						layout="fill"
					/>
				))}
			<div className="flex-1" />
			<h3 className="text-center transition-all duration-200 group-hover:text-melon-700">
				{exhibitor.name}
			</h3>
		</div>
	)
}
