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
		<Link href={`/student/exhibitors/${exhibitor.id}?year=${year}`}>
			<div className="group relative flex h-full flex-col rounded-lg border-2 border-solid border-emerald-900 bg-gradient-to-b from-emerald-900 via-emerald-950 to-liqorice-950 filter transition hover:scale-[1.05] hover:brightness-95">
				{exhibitor.logo_freesize != null ||
					(exhibitor.logo_squared != null && (
						<div className="p-4 flex justify-center">
							<Image
								className="max-h-[100px] w-auto object-contain"
								src={exhibitor.logo_squared ?? exhibitor.logo_freesize}
								alt={exhibitor.name}
								width={100}
								height={100}
							/>
						</div>
					))}
				<div className="flex-1" />
				<h3 className="my-2 text-center text-xl font-bebas-neue antialiased transition group-hover:text-melon-700 text-emerald-100">
					{exhibitor.name}
				</h3>
			</div>
		</Link>
	)
}
