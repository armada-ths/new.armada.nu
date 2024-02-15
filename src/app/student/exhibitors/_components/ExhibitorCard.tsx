import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import Image from "next/image"
import Link from "next/link"

export function ExhibitorCard({
	exhibitor,
	year
}: {
	exhibitor: Exhibitor
	year: string
}) {
	return (
		<Link href={`/exhibitors/${exhibitor.id}?year=${year}`}>
			<div className="group relative flex aspect-square w-32 cursor-pointer flex-col rounded-lg border-2 border-solid border-emerald-900 bg-gradient-to-br from-emerald-950 to-liqorice-700 filter hover:brightness-95 lg:w-72">
				{exhibitor.logo_freesize != null ||
					(exhibitor.logo_squared != null && (
						<div className="p-4">
							<Image
								className="max-h-[80px] w-auto max-w-[50%] rounded-lg"
								src={exhibitor.logo_squared ?? exhibitor.logo_freesize}
								alt={exhibitor.name}
								width={100}
								height={100}
								style={{
									objectFit: "contain"
								}}
							/>
						</div>
					))}
				<div className="flex-1" />
				<h3 className="py-2 text-center font-bebas-neue text-sm group-hover:text-melon-700 lg:text-2xl">
					{exhibitor.name}
				</h3>
			</div>
		</Link>
	)
}
