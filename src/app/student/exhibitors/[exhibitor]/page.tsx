import { Page } from "@/components/shared/Page"
import {
	fetchAllYearExhibitors,
	fetchExhibitors
} from "@/components/shared/hooks/api/useExhibitors"
import { Badge } from "@/components/ui/badge"
import { DateTime } from "luxon"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

interface RouteProps {
	params: { exhibitor: string }
	searchParams: unknown
}

// This tells Next about all the companies that it should
// prerender, these will be compiled at build time
export async function generateStaticParams() {
	const years = await fetchAllYearExhibitors()
	const exhibitors = years.flatMap(x => x.exhibitors)

	return exhibitors.map(exhibitor => ({
		slug: `/exhibitors/${exhibitor.id}`
	}))
}

function getYearOrDefault(searchParams: unknown) {
	return searchParams != null &&
		typeof searchParams == "object" &&
		"year" in searchParams &&
		typeof searchParams.year == "string" &&
		!isNaN(searchParams.year as unknown as number)
		? parseInt(searchParams.year)
		: DateTime.now().minus({ months: 6 }).year // Always default to current year, but 6 months back
}

export async function generateMetadata({
	params,
	searchParams
}: RouteProps): Promise<Metadata> {
	const year = getYearOrDefault(searchParams)
	const exhibitors = await fetchExhibitors({ year })
	const exhibitor = exhibitors.find(x => x.id.toString() === params.exhibitor)

	if (exhibitor == null) return notFound()

	return {
		title: `${exhibitor?.name} at Armada`,
		abstract: exhibitor?.about,
		openGraph: {
			images: [exhibitor.logo_squared ?? exhibitor.logo_freesize ?? ""]
		}
	}
}

export default async function ExhibitorPage({
	params,
	searchParams
}: RouteProps) {
	// Type narrow the searchParams to a number
	const year = getYearOrDefault(searchParams)

	const exhibitors = await fetchExhibitors({ year })
	const exhibitor = exhibitors.find(x => x.id.toString() === params.exhibitor)

	if (exhibitor == null) {
		return notFound()
	}

	return (
		<Page.Background withIndents>
			<Page.Boundary>
				<Page.Header>{exhibitor.name}</Page.Header>
				<div className="flex flex-col-reverse items-center gap-4 md:flex-row">
					<p className="flex-1 text-stone-300">{exhibitor.about}</p>
					{(exhibitor.logo_squared != null ||
						exhibitor.logo_freesize != null) && (
						<Image
							className="h-32 w-52"
							src={
								(exhibitor.logo_squared ?? exhibitor.logo_freesize) as string
							}
							style={{
								objectFit: "contain"
							}}
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
							<Badge key={industry.id} className="m-1">
								{industry.name}
							</Badge>
						))}
					</div>
					<div>
						<Page.Header tier="secondary" className="mt-2">
							Employments
						</Page.Header>
						{exhibitor.employments.map(employments => (
							<Badge key={employments.id} className="m-1">
								{employments.name}
							</Badge>
						))}
					</div>
				</div>
			</Page.Boundary>
		</Page.Background>
	)
}
