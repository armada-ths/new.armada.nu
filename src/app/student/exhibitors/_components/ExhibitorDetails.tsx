import { Page } from "@/components/shared/Page"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import { Badge } from "@/components/ui/badge"

import Image from "next/image"

export default function ExhibitorDetails({
	exhibitor
}: {
	exhibitor: Exhibitor
}) {
	console.log("details for", exhibitor)
	return (
		<div>
			<Page.Header>{exhibitor.name}</Page.Header>
			<div className="flex flex-col-reverse items-center gap-4 md:flex-row">
				<p className="flex-1 text-stone-300">{exhibitor.about}</p>
				{(exhibitor.logo_squared || exhibitor.logo_freesize) && (
					<Image
						className="h-32 w-52 object-contain"
						src={exhibitor.logo_squared ?? exhibitor.logo_freesize ?? ""}
						alt={exhibitor.name}
						width={300}
						height={300}
					/>
				)}
			</div>
			<div className="mt-10 grid grid-cols-1 gap-y-5 sm:grid-cols-2">
				<div>
					<Page.Header tier="secondary" className="mt-2">
						Industries
					</Page.Header>
					{exhibitor.industries.map(industry => (
						<Badge key={industry.id} className="m-1" variant="square">
							{industry.name}
						</Badge>
					))}
				</div>
				<div>
					<Page.Header tier="secondary" className="mt-2">
						Employments
					</Page.Header>
					{exhibitor.employments.map(employments => (
						<Badge key={employments.id} className="m-1" variant="square">
							{employments.name}
						</Badge>
					))}
				</div>
			</div>
		</div>
	)
}
